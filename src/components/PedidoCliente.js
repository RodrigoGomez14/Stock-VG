import React, { Component, Fragment } from "react"
import "./styles/PedidoCliente.css"

class PedidoCliente extends Component {
    render() {
        console.log(this.props.data)
        return (
            <div className="container pedido bg-dark">
                <div className="row">
                    <div className="col-12">
                        <h3>{this.props.data.fecha}</h3>
                    </div>
                </div>
                <div className="row">
                    {this.props.data.articulos.map(articulo => (
                        <Fragment>
                            <div className="col-10 text-left">
                                <h5>{articulo.nombre}</h5>
                            </div>
                            <div className="col-2">
                                <h5>{articulo.cantidad}</h5>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        )
    }
}
export default PedidoCliente