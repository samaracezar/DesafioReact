import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, FormGroup, Label, Input, Alert } from 'reactstrap';
import { api } from "../../../config";

export const InserirItemCompra = () => {
    const [status] = useState({
        type: '',
        message: ''
    })
    const [itemcompra, setItemCompra] = useState({
        compraId: '',
        produtoId: '',
        quantidade: '',
        valor: ''
    })
    const valorInput = e => setItemCompra({ ...itemcompra, [e.target.name]: e.target.value })

    const cadItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/itemcompra", itemcompra, { headers })
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
                    <h1>Cadastrar item da compra</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
            </div>
            <Form className="p-2" onSubmit={cadItemCompra}>
                <FormGroup className="p-2">
                    <Label>Id da compra</Label>
                    <Input type="text" name="compraId" placeholder="Informe o Id da compra" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Id do Produto</Label>
                    <Input type="text" name="produtoId" placeholder="Informe o Id do produto" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="number" name="quantidade" placeholder="Quantidade" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="number" name="valor" placeholder="Valor" onChange={valorInput} />
                </FormGroup>


                <FormGroup className="d-flex">
                    <Button type="submit" outline color="warning">Inserir</Button>
                    <Button type="reset" outline color="primary">Limpar</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}