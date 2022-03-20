import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarPedido = () => {
    const [data, setData] = useState([]);
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
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar pedidos</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-pedido" className="btn btn-outline-primary btn-sm">Inserir</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Cliente ID</th>
                            <th className="text-center m-2 p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <th scope="row">{ped.id}</th>
                                <td>{ped.data}</td>
                                <td>{ped.ClienteId}</td>
                                <td className="text-center m-2 p-2"> 
                                    <Link to={"/alterar-pedido/" + ped.id}
                                        className="btn btn-outline-primary btn-sm">Editar pedido</Link>
                                    <Link to={"/item-pedido/" + ped.id}
                                        className="btn btn-outline-success btn-sm">Ver itens</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delPedido(ped.id)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};