import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCliente = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });


    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                // console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                // console.log("Erro: sem conexão com a API.")
            });
    };

    const delCliente = async (idCliente) => {
        // console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluircliente/" + idCliente, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cliente excluído com sucesso.'
                });
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir o cliente.'
                });
            });
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do cliente</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-cliente" className="btn btn-outline-primary btn-sm">Inserir</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Uf</th>
                            <th>Cliente Desde</th>
                            <th className="text-center m-2 p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <th scope="row">{cli.id}</th>
                                <td>{cli.nome}</td>
                                <td>{cli.cidade}</td>
                                <td>{cli.uf}</td>
                                <td>{cli.clienteDesde}</td>
                                <td className="text-center m-2 p-2">
                                    <Link to={"/alterar-cliente/" + cli.id}
                                        className="btn btn-outline-primary btn-sm">Editar cliente</Link>
                                    <Link to={"/pedidos-cliente/" + cli.id}
                                        className="btn btn-outline-success btn-sm">Ver pedidos</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delCliente(cli.id)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};