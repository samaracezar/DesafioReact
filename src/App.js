import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './views/Home';
import {Menu} from './components/Menu';
import {ListarCliente} from './views/Cliente/Listar';
import {ListarPedido} from './views/Pedido/Listar';
import {ListarServico} from './views/Servico/Listar';
import {ListarCompra} from './views/Compra/Listar';
import {ListarProduto} from './views/Produto/Listar'
import {ListarItemCompra} from './views/ItemCompra/Listar';
import {ListarItemPedido} from './views/ItemPedido/Listar';
import {Item} from './views/Servico/Item';
import {InserirCliente} from './views/Cliente/Inserir';
import {InserirPedido} from './views/Pedido/Inserir';
import {InserirServico} from './views/Servico/Inserir';
import {InserirCompra} from './views/Compra/Inserir';
import {InserirProduto} from './views/Produto/Inserir';
import {InserirItemCompra} from './views/ItemCompra/Inserir';
import {InserirItemPedido} from './views/ItemPedido/Inserir';
import {EditarCliente} from './views/Cliente/Alterar';
import {EditarPedido} from './views/Pedido/Alterar';
import {EditarServico} from './views/Servico/Alterar';
import {EditarCompra} from './views/Compra/Alterar';
import {EditarProduto} from './views/Produto/Alterar';
import {EditarItemCompra} from './views/ItemCompra/Alterar';
import {EditarItemPedido} from './views/ItemPedido/Alterar';
import {PedidosCliente} from './views/Cliente/PedidosCliente';
import {EditarPedCli} from './views/Cliente/EditarPedido';

function App() {
  return (
    <div>
      <Router> 
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path="/novo-cliente" component={InserirCliente}/>
          <Route path="/alterar-cliente/:id" component={EditarCliente}/>
          <Route path="/pedidos-cliente/:id" component={PedidosCliente}/>
          <Route path="/editar-pedido/:id" component={EditarPedCli}/>
          <Route path="/listar-pedido" component={ListarPedido}/>
          <Route path="/novo-pedido" component={InserirPedido}/>
          <Route path="/alterar-pedido/:id" component={EditarPedido}/>
          <Route path="/listar-servico" component={ListarServico}/>
          <Route path="/novo-servico" component={InserirServico}/>
          <Route path="/alterar-servico/:id" component={EditarServico}/>
          <Route path="/listar-pedido/:id" component={Item}/>
          <Route path="/listar-compra" component={ListarCompra}/>
          <Route path="/nova-compra" component={InserirCompra}/>
          <Route path="/alterar-compra/:id" component={EditarCompra}/>
          <Route path="/listar-produto" component={ListarProduto}/>
          <Route path="/novo-produto" component={InserirProduto}/>
          <Route path="/alterar-produto/:id" component={EditarProduto}/>
          <Route path="/listar-itempedido" component={ListarItemPedido}/>
          <Route path="/novo-itempedido" component={InserirItemPedido}/>
          <Route path="/alterar-itempedido/:id" component={EditarItemPedido}/>
          <Route path="/listar-itemcompra" component={ListarItemCompra}/>
          <Route path="/novo-itemcompra" component={InserirItemCompra}/>
          <Route path="/alterar-itemcompra/:id" component={EditarItemCompra}/>
          
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
