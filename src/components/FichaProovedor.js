import React, { Component } from "react"
import NavBar from "./NavBar"
import Ficha from "./Ficha"
import FichaPedidos from "./FichaPedidos"
class FichaProovedor extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="productList">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-center form-group">
                                <Ficha data={this.props.proovedor.datos} />
                            </div>
                            <div className="col-12 text-center form-group">
                                <FichaPedidos data={this.props.proovedor.pedidos} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FichaProovedor