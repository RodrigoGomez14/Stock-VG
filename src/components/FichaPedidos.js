import React, { Component } from "react"
import PedidoCliente from "./PedidoCliente"


class Fichapedido extends Component {
    render() {
        if (this.props.data !== undefined) {
            return (
                <div className="container">
                    <div className="row">
                        {Object.keys(this.props.data).map(pedido => (
                            <div className="col-4 form-group">
                                <PedidoCliente data={this.props.data[pedido]} />
                            </div>
                        ))}
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
export default Fichapedido