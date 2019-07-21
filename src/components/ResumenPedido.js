import React, { Component, Fragment } from "react"
import BotoneraPedido from "../components/BotoneraPedido"

class ResumenPedido extends Component {
    render() {
        console.log(this.props.pedido)
        if (this.props.pedido.length) {
            return (<div className="col-8 offset-2 bg-dark text-center nuevoPedido p-4">
                <div className="container">
                    <div className="row mb-2">
                        {Object.keys(this.props.pedido).map(key => (
                            <Fragment>
                                <div className="col-10 text-left">
                                    <h3>{this.props.pedido[key].nombre}</h3>
                                </div>
                                <div className="col-2">
                                    <h3>{this.props.pedido[key].cantidad}</h3>
                                </div>
                            </Fragment>
                        )
                        )}
                    </div>
                    <BotoneraPedido enviarPedido={this.props.enviarPedido} eliminarPedido={this.props.eliminarPedido} />

                </div>
            </div>
            )
        }
        else {
            return (
                null
            )
        }
    }
}
export default ResumenPedido