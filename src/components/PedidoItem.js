import React, { Component, Fragment } from "react"

class PedidoItem extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 text-left">
                        <h5>{this.props.nombre}</h5>
                    </div>
                    <div className="col-2">
                        <h5>{this.props.cantidad}</h5>
                    </div>
                </div>
            </div>
        )
    }
}
export default PedidoItem