import axios from "axios";
import { api } from "../../../config";
import { useState } from "react";
import { Button, Form, Container, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Link } from "react-router-dom";

export const InserirCliente = () => {
    const [status] = useState({
        type: '',
        message: ''
    })
    const [cliente, setCliente] = useState({
        nome: '',
        nascimento: ''
    })
    const valorInput = e => setCliente({ ...cliente, [e.target.name]: e.target.value })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/clientes", cliente, { headers })
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
                    <h1>Cadastrar cliente</h1>
                </div>
                <div className="p-2 m-auto">
                        <Link to="/listar-cliente" className="btn btn-outline-primary btn-sm">Clientes</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}

            </div>
            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className='p-2'>
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Digite o nome do cliente" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Data de nascimento</Label>
                    <Input type="text" name="nascimento" placeholder="Informe a data de nascimento" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Informe o endereço" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Informe a cidade" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="Informe o Estado" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cliente desde</Label>
                    <Input type="text" name="clienteDesde" placeholder="Data" onChange={valorInput} />
                </FormGroup>


                <FormGroup className="d-flex">
                    <Button type="submit" outline color="warning">Inserir</Button>
                    <Button type="reset" outline color="primary">Limpar</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}