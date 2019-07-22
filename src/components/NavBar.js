import React, { Component } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import "./styles/Navbar.css"
class NavBar extends Component {
    /*render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
                <img className="navbar-brand p-2" src={logo} alt="logo" className="logo" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ml-auto">
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                            
                        </li>
                    </ul>
                </div>


            </nav>
        )
    }*/

    render() {
        return (
            <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" sticky="top">
                <Navbar.Brand><img className="navbar-brand p-2" src={logo} alt="logo" className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-auto">
                        <Nav.Link>
                            <Link className="nav-link" to="/productos">Stock</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Pedidos">Pedidos</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Mecanizados">Mec.</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/No-Mecanizados">No Mec.</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Surtidores">Surtidores</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Clientes">Clientes</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Proovedores">Proovedores</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Expresos">Expresos</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/Deudas">Deudas</Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <Nav.Link>
                    <button type="button" className="btn btn-outline-danger" onClick={e => {
                        this.props.handleClick()
                    }}>Log Out</button>
                </Nav.Link>
                <Link className="navbar-brand p-2 btn btn-success" to="/NuevoPedido" id="buttonNuevoPedido">Nuevo Pedido</Link>
            </Navbar>
        )
    }
}
export default NavBar