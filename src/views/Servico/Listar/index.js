import axios from "axios";
import { Container, Table, Alert } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }

    const delServico = async (idServico) => {
        // console.log(idServico);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirservico/" + idServico, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Serviço excluído com sucesso.'
                });
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível excluir o serviço.'
                });
            });
    }

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do serviço</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/novo-servico" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

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
                        {data.map(serv => (
                            <tr key={serv.id}>
                                <td>{serv.id}</td>
                                <td>{serv.nome}</td>
                                <td>{serv.descricao}</td>
                                <td className="text-center">
                                <Link to={"/alterar-servico/" + serv.id}
                                        className="btn btn-outline-primary btn-sm">Editar serviço</Link>
                                <Link to={"/listar-pedidos/" + serv.id}
                                        className="btn btn-outline-success btn-sm" >Consultar</Link>
                                <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delServico(serv.id)}>Excluir</span>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    );
};