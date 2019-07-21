import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./styles/Product.css"
import * as firebase from "firebase"

class Product extends Component {
    sumar(nombre, cantidad) {
        const productosRef = firebase.database().ref().child(this.props.seccion + "2").child(nombre)
        productosRef.update({
            cantidad: (cantidad + parseInt(prompt("Ingresar cantidad a sumar")))
        })
    }
    render() {
        return (
            <div className="product bg-dark">
                <img src={this.props.imagen} className="productImg" alt="" />
                <div className="product-Info">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h5 className="product-name">{this.props.nombre}</h5>
                            </div>
                            <div className="col-6 text-center">
                                <h4><span className="badge badge-primary">{this.props.cantidad}</span></h4>
                            </div>
                            <div className="col-6 text-center">
                                <h4>
                                    <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => {
                                        this.sumar(this.props.nombre, this.props.cantidad)
                                    }} />
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product