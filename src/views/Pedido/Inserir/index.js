import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, FormGroup, Label, Input, Alert } from 'reactstrap';
import { api } from "../../../config";

export const InserirPedido = () => {
    const [status] = useState({
        type: '',
        message: ''
    })
    const [pedido, setPedido] = useState({
        data: '',
        clienteId: ''
    })
    const valorInput = e => setPedido({ ...pedido, [e.target.name]: e.target.value })

    const cadPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/pedidos", pedido, { headers })
            .then((response) => {
                console.log(response.data.message)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="p-2 m-auto">
                    <h1>Cadastrar pedido</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
            </div>
            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>Data do pedido</Label>
                    <Input type="text" name="data" placeholder="Informe a data do pedido" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Id do Cliente</Label>
                    <Input type="text" name="clienteId" placeholder="Informe o Id do cliente" onChange={valorInput} />
                </FormGroup>


                <FormGroup className="d-flex">
                    <Button type="submit" outline color="warning">Inserir</Button>
                    <Button type="reset" outline color="primary">Limpar</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}