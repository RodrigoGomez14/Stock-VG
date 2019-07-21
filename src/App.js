import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Pedido from "./components/Pedido"
import ProductList from "./Pages/ProductList"
import PedidosList from "./Pages/PedidosList"
import MecanizadosList from "./Pages/MecanizadosList"
import NoMecanizadosList from "./Pages/NoMecanizadosList"
import SurtidoresList from "./Pages/SurtidoresList"
import ProovedoresList from "./Pages/ProovedoresList"
import ClientesList from "./Pages/ClientesList"
import ExpresosList from "./Pages/ExpresosList"
import Deudas from "./Pages/Deudas"
import NuevoPedido from "./Pages/NuevoPedido"
import "bootstrap/dist/css/bootstrap.css"
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/productos" component={ProductList} />
        <Route exact path="/Pedidos" component={PedidosList} />
        <Route exact path="/Mecanizados" component={MecanizadosList} />
        <Route exact path="/No-Mecanizados" component={NoMecanizadosList} />
        <Route exact path="/Surtidores" component={SurtidoresList} />
        <Route exact path="/Clientes" component={ClientesList} />
        <Route exact path="/Proovedores" component={ProovedoresList} />
        <Route exact path="/Expresos" component={ExpresosList} />
        <Route exact path="/Deudas" component={Deudas} />
        <Route exact path="/NuevoPedido" component={NuevoPedido} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
