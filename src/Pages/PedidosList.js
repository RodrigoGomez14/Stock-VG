import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Pedido from "../components/Pedido"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import * as firebase from "firebase"

class PedidosList extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        pedidos: []
    }
    constructor(props) {
        const firebaseConfig = {
            apiKey: "AIzaSyDPmTjxjMxN2abofP8ZczgFGeYQYSvbXHE",
            authDomain: "stock-119e8.firebaseapp.com",
            databaseURL: "https://stock-119e8.firebaseio.com",
            projectId: "stock-119e8",
            storageBucket: "stock-119e8.appspot.com",
            messagingSenderId: "1007277754269",
            appId: "1:1007277754269:web:d1db0def0da907b2"
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        super(props)
    }
    async fetchData() {
        const productosRef = await firebase.database().ref().child('pedidos2')
        productosRef.on("value", snapshot => (
            this.setState(
                {
                    loading: false,
                    pedidos: snapshot.val()
                }
            )
        ))
    }
    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                this.setState({ user })
                console.log("user added")
            }
            else {
                this.setState({
                    user: null
                })
                console.log("user quit")
            }
        })
    }
    componentDidMount() {
        this.authListener()
        this.fetchData()
    }
    async enviarPedido(key, pedido) {
        const productosRef = await firebase.database().ref().child('clientes2').child(pedido.cliente)
        if (productosRef.child("pedidos")) {
            let id = 0;
            const date = new Date()
            productosRef.child("pedidos").push({
                fecha: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
                articulos: pedido.articulos
            })
            this.eliminarPedido(key)
        }
    }
    async eliminarPedido(key) {
        await firebase.database().ref().child('pedidos2').child(key).remove()
    }
    render() {
        if (!this.state.user) {
            return (
                <Login redirect="pedidos" />
            )
        }
        else {
            if (this.state.loading) {
                return (
                    <div>
                        <NavBar />
                        <SpinnerLoading />
                    </div>
                )
            }
            else {
                if (this.state.pedidos) {
                    return (
                        <div>
                            <NavBar />
                            <div className="productList">
                                <div className="container-fluid">
                                    <div className="row">
                                        {Object.keys(this.state.pedidos).map(key => (
                                            <div className="col-4 form-group">
                                                <Pedido id={key} pedido={this.state.pedidos[key]} cliente={this.state.pedidos[key].cliente} enviarPedido={this.enviarPedido} eliminarPedido={this.eliminarPedido} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h1>{this.state.nombre}</h1>
                        </div>

                    )
                }
                else {
                    return (
                        <div>
                            <NavBar />
                            <div className="productList">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h1>Aun No Hay Ningun Pedido!</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        }
    }
}
export default PedidosList
