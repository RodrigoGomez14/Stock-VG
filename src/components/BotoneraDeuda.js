import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
class BotoneraDeuda extends Component {
    pedirCantidad() {
        return prompt("Ingresar Cantidad")
    }
    sumarDeuda(deudaVieja, adicion) {
        return deudaVieja + parseInt(adicion)
    }
    restarDeuda(deudaVieja, quita) {
        return deudaVieja - parseInt(quita)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 text-center">
                        <button type="button" className="btn btn-success" onClick={(e) => {
                            this.props.handleClick(this.props.cliente, this.sumarDeuda(this.props.deuda, this.pedirCantidad()))
                        }}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-danger" onClick={e => {
                            this.props.handleClick(this.props.cliente, this.restarDeuda(this.props.deuda, this.pedirCantidad()))
                        }}><FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default BotoneraDeuda