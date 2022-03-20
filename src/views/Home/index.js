import { Link } from "react-router-dom";
import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Página Inicial</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className=" m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                        <Link to="/listar-servico"
                             className=" m-auto btn btn-outline-primary btn-sm">Serviços</Link>
                        <Link to="/listar-pedido"
                           className=" m-auto btn btn-outline-primary btn-sm">Pedidos</Link>
                        <Link to="/listar-produto"  
                            className=" m-auto btn btn-outline-primary btn-sm">Produtos</Link>
                        <Link to="/listar-compra"
                            className=" m-auto btn btn-outline-primary btn-sm">Compras</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};