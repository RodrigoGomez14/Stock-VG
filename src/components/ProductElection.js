import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./styles/Product.css"
import * as firebase from "firebase"

class Product extends Component {
    render() {
        return (
            <div className="product bg-dark" onClick={this.props.handleClick}>
                <img src={this.props.imagen} className="productImg" alt="" />
                <div className="product-Info">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h5 className="product-name">{this.props.nombre}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product