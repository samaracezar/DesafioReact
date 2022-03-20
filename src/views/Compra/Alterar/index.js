import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/compra/" + id,
            { id, data, ClienteId }, { headers })
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
        const getCompra = async () => {
            await axios.get(api + "/compra/" + id)
                .then((response) => {
                    setId(response.data.comp.id)
                    setData(response.data.comp.data)
                    setClienteId(response.data.comp.ClienteId);
                })
                .catch(() => {
                    console.log('Erro: não foi possivel conectar-se a API.')
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compra"
                            className=" m-auto btn btn-outline-primary btn-sm">Compras</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                    {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className='p-2'>
                        <Label>Id da compra</Label>
                        <Input type="text" name="id" placeholder="Id da compra" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data da compra</Label>
                        <Input type="text" name="data" placeholder="Data da compra" value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Id do cliente</Label>
                        <Input type="text" name="ClienteId" placeholder="Id do cliente" defaultValue={ClienteId} />
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