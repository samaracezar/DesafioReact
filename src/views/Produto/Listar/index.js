import axios from "axios";
import { Container, Table, Alert } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }

    const delProduto = async (idProduto) => {
        // console.log(idProduto);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirproduto/" + idProduto, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Produto excluído com sucesso.'
                });
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir o produto.'
                });
            });
    }


    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do produto</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/novo-produto" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.nome}</td>
                                <td>{prod.descricao}</td>
                                <td className="text-center">
                                <Link to={"/alterar-produto/" + prod.id}
                                        className="btn btn-outline-primary btn-sm">Editar produto</Link>
                                <Link to={"/listar-produtos/" + prod.id}
                                        className="btn btn-outline-success btn-sm" >Consultar</Link>
                                <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delProduto(prod.id)}>Excluir</span>
                                
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    );
};