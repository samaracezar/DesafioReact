import axios from "axios";
import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from 'reactstrap';

export const PedidosCliente = (props) => {
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id)
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    }
    const delPedido = async (idPedido) => {
        // console.log(idPedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirpedido/" + idPedido, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Pedido excluído com sucesso.'
                });
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir o pedido.'
                });
            });
    }



    useEffect(() => {
        const getPedidos = async () => {
            await axios.get(api + "/cliente/" + id + "/pedidos")
                .then((response) => {
                    console.log(response.data.pedidos)
                    setData(response.data.pedidos)
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getPedidos();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                    <div className="p2">
                        <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Id do Cliente</th>
                            <th>Data</th>
                            <th className="text-center m-2 p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <th scope="row">{pedidos.id}</th>
                                <td>{pedidos.ClienteId}</td>
                                <td>{pedidos.data}</td>
                                <td className="text-center m-2 p-2"> <Link to={"/editar-pedido/" + pedidos.id}
                                    className="btn btn-outline-primary btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delPedido(pedidos.id)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}