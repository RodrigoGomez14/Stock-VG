import React, { Component } from "react"
import PedidoItem from "./PedidoItem"
import BotoneraPedido from "./BotoneraPedido"
import "./styles/Pedido.css"
import * as firebase from "firebase"
import { parse } from "@babel/core";

class Pedido extends Component {
    state = {
        pedido: []
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
    componentDidMount() {
        this.consultarStockActual(this.props.pedido.articulos)
    }
    async restarProducto(producto, nuevaCantidad) {
        const productoRef = await firebase.database().ref().child('productos2').child(producto.nombre)
        productoRef.update(
            {
                cantidad: nuevaCantidad
            }
        )

    }
    async consultarStockActual(pedido) {
        const arr = this.state.pedido
        Object.keys(pedido).map(async articulo => {
            await firebase.database().ref().child('productos2').child(pedido[articulo].nombre).child("cantidad").on("value", snapshot => {
                arr.push({
                    nombre: pedido[articulo].nombre,
                    cantidad: snapshot.val()
                })
            })
            this.setState({
                pedido: arr
            })
        })
    }
    async descontarPedido(pedido) {
        Object.keys(pedido).map(async articulo => {
            this.restarProducto(this.state.pedido[articulo], this.state.pedido[articulo].cantidad - parseInt(pedido[articulo].cantidad))
        })
    }
    render() {
        return (
            <div className="pedido bg-dark p-4">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12 mb-2">
                            <h4><span className="badge-pill badge-dark p-2">{this.props.cliente}</span></h4>
                        </div>
                        <div className="col-12">
                            {Object.keys(this.props.pedido.articulos).map(articulo => (
                                <PedidoItem nombre={this.props.pedido.articulos[articulo].nombre} cantidad={this.props.pedido.articulos[articulo].cantidad} />
                            ))}
                        </div>
                    </div>
                    <BotoneraPedido enviarPedido={async e => {
                        await this.descontarPedido(this.props.pedido.articulos)
                        this.props.enviarPedido(this.props.id, this.props.pedido)
                    }}
                        eliminarPedido={e => {
                            this.props.eliminarPedido(this.props.id)
                        }} />
                </div>
            </div>
        )
    }
}
export default Pedido