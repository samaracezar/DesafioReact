import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCompra = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                console.log(response.data.compras);
                setData(response.data.compras);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    }
    const delCompra = async (idCompra) => {
        // console.log(idCompra);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluircompra/" + idCompra, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Compra excluída com sucesso.'
                });
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir a compra.'
                });
            });
    }


    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar compras</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/nova-compra" className="btn btn-outline-primary btn-sm">Inserir</Link>
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
                        {data.map(comp => (
                            <tr key={comp.id}>
                                <th scope="row">{comp.id}</th>
                                <td>{comp.data}</td>
                                <td>{comp.ClienteId}</td>
                                <td className="text-center m-2 p-2"> 
                                    <Link to={"/alterar-compra/" + comp.id}
                                        className="btn btn-outline-primary btn-sm">Editar compra</Link>
                                    <Link to={"/item-compra/" + comp.id}
                                        className="btn btn-outline-success btn-sm">Ver itens</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delCompra(comp.id)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};