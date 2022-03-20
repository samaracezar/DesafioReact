import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemCompra = (props) => {
    const [id] = useState(props.match.params.id);
    const [CompraId] = useState('');
    const [ProdutoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const edtItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editar-itemcompra/" + id, { CompraId, ProdutoId, quantidade, valor }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso.'
                });
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: o item não foi alterado.'
                });
            });
    };

    useEffect(() => {
        const getItemCompra = async () => {
            await axios(api + "/itemcompra")
                .then((response) => {
                    setProdutoId(response.data.itens.ProdutoId);
                    setQuantidade(response.data.itens.quantidade);
                    setValor(response.data.itens.valor);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'response.data.message'
                    });
                });
        };
        getItemCompra();
    },[id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item da Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-itemcompra"
                            className=" m-auto btn btn-outline-primary btn-sm">Itens da Compra</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                    {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtItemCompra}>
                    <FormGroup className='p-2'>
                        <Label>Id da compra</Label>
                        <Input type="text" name="CompraId" placeholder="Id da compra" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className='p-2'>
                        <Label>Id do produto</Label>
                        <Input type="text" name="ProdutoId" placeholder="Id do produto" defaultValue={ProdutoId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
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