import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, FormGroup, Label, Input, Alert } from 'reactstrap';
import { api } from "../../../config";

export const InserirCompra = () => {
    const [status] = useState({
        type: '',
        message: ''
    })
    const [compra, setCompra] = useState({
        data: '',
        clienteId: ''
    })
    const valorInput = e => setCompra({ ...compra, [e.target.name]: e.target.value })

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/compras", compra, { headers })
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
                    <h1>Cadastrar compra</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}

            </div>
            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>Data da compra</Label>
                    <Input type="text" name="data" placeholder="Informe a data da compra" onChange={valorInput} />
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