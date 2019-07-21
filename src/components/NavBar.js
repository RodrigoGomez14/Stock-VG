import React, { Component } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import "./styles/Navbar.css"
class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
                <img className="navbar-brand p-2" src={logo} alt="logo" className="logo" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Stock</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Pedidos">Pedidos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Mecanizados">Mecanizados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/No-Mecanizados">No Mecanizados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Surtidores">Surtidores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Clientes">Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Proovedores">Proovedores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Expresos">Expresos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Deudas">Deudas</Link>
                        </li>
                    </ul>
                </div>
                <Link className="navbar-brand p-2 btn btn-success" to="/NuevoPedido" id="buttonNuevoPedido">Nuevo Pedido</Link>
            </nav>
        )
    }
}
export default NavBar