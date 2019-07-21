import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
class BotoneraPedido extends Component {
    render() {
        return (
            <div className="row">
                <div className="col text-center">
                    <Link to="/pedidos">
                        <button type="button" className="btn btn-outline-light"><FontAwesomeIcon icon={faCheck} onClick={this.props.enviarPedido} /></button>
                    </Link>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-outline-light"><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <div className="col text-center">
                    <Link to="/pedidos">
                        <button type="button" className="btn btn-outline-light"><FontAwesomeIcon icon={faTimes} /></button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default BotoneraPedido