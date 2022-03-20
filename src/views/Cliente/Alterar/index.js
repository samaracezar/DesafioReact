import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/cliente/" + id,
            { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração foi realizada com sucesso.'
                })
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não foi possível alterar.'
                });
            });
    };

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className=" m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                    {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className='p-2'>
                        <Label>Id do cliente</Label>
                        <Input type="text" name="id" placeholder="Id do cliente" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome do cliente</Label>
                        <Input type="text" name="nome" placeholder="Nome do cliente" value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input type="text" name="endereco" placeholder="Endereço do cliente" value={endereco} onChange={e => setEndereco(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="cidade" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Estado</Label>
                        <Input type="text" name="uf" placeholder="Estado" value={uf} onChange={e => setUf(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nascimento</Label>
                        <Input type="text" name="nascimento" placeholder="Data de nascimento" value={nascimento} onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente Desde</Label>
                        <Input type="text" name="clienteDesde" placeholder="Cliente desde" value={clienteDesde} onChange={e => setClienteDesde(e.target.value)} />
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