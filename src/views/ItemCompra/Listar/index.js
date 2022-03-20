import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemCompra = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });


    const getItemCompra = async () => {
        await axios.get(api + "/listaitemcompra")
            .then((response) => {
                // console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                // console.log("Erro: sem conexão com a API.")
            });
    };

    const delItemCompra = async (CompraId) => {
        // console.log(CompraId);

        const headers = {
            'Content-type': 'application/json'
        }
        
        await axios.get(api + "/compras/" + CompraId + "/excluiritem", { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Item excluído com sucesso.'
                });
            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir o item.'
                });
            });
    }

    useEffect(() => {
        getItemCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar itens da Compra</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-itemcompra" className="btn btn-outline-primary btn-sm">Inserir</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID da Compra</th>
                            <th>ID do Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className="text-center m-2 p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key ={item.CompraId}>
                                <th scope="row">{item.CompraId}</th>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center m-2 p-2">
                                    <Link to={"/alterar-itempedido/" + item.CompraId}
                                        className="btn btn-outline-primary btn-sm">Editar item</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delItemCompra(item.CompraId)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};