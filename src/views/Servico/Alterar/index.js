import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/servico/" + id,
            { id, nome, descricao }, { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Alteração foi realizada com sucesso.'
                })
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não foi possível alterar.'
                })
            })
    };

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/servico/" + id)
                .then((response) => {
                    setId(response.data.serv.id)
                    setNome(response.data.serv.nome)
                    setDescricao(response.data.serv.descricao);
                })
                .catch(() => {
                    console.log('Erro: não foi possivel conectar-se a API.')
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
                            className=" m-auto btn btn-outline-primary btn-sm">Serviços</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                    {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtServico}>
                    <FormGroup className='p-2'>
                        <Label>Id do serviço</Label>
                        <Input type="text" name="id" placeholder="Id do serviço" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>


                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="warning">Salvar</Button>
                        <Button type="reset" outline color="primary">Limpar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};