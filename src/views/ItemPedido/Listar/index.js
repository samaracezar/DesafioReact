import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemPedido = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });


    const getItemPedido = async () => {
        await axios.get(api + "/listaitempedido")
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

    const delItemPedido = async (PedidoId) => {
        // console.log(PedidoId);

        const headers = {
            'Content-type': 'application/json'
        }
        
        await axios.get(api + "/pedidos/" + PedidoId + "/excluiritem", { headers })
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
        getItemPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar itens do Pedido</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-itempedido" className="btn btn-outline-primary btn-sm">Inserir</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>ID do Serviço</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className="text-center m-2 p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key ={item.PedidoId}>
                                <th scope="row">{item.PedidoId}</th>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center m-2 p-2">
                                    <Link to={"/alterar-itempedido/" + item.PedidoId}
                                        className="btn btn-outline-primary btn-sm">Editar item</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delItemPedido(item.PedidoId)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};