import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, FormGroup, Label, Input, Alert } from 'reactstrap';
import { api } from "../../../config";

export const InserirItemPedido = () => {
    const [status] = useState({
        type: '',
        message: ''
    })
    const [itempedido, setItemPedido] = useState({
        pedidoId: '',
        servicoId: '',
        quantidade: '',
        valor: ''
    })
    const valorInput = e => setItemPedido({ ...itempedido, [e.target.name]: e.target.value })

    const cadItemPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/itempedido", itempedido, { headers })
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
                    <h1>Cadastrar item do pedido</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
            </div>
            <Form className="p-2" onSubmit={cadItemPedido}>
                <FormGroup className="p-2">
                    <Label>Id do Pedido</Label>
                    <Input type="text" name="pedidoId" placeholder="Informe o Id do pedido" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Id do Serviço</Label>
                    <Input type="text" name="servicoId" placeholder="Informe o Id do serviço" onChange={valorInput} />
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