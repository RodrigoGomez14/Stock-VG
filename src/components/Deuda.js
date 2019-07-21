import React, { Component } from "react"
import BotoneraDeuda from "./BotoneraDeuda"
import "./styles/Deuda.css"

class Deuda extends Component {
    render() {
        if (this.props.deuda === 0) {
            return (
                null
            )
        }
        else {
            return (
                <div className="col-4 text-center">
                    <div className="container-fluid pt-2 pb-2 deuda bg-dark">
                        <div className="row">
                            <div className="col-12">
                                <h3>{this.props.cliente}</h3>
                            </div>
                            <div className="col-12">
                                <h3>{this.props.deuda}</h3>
                            </div>
                            <div className="col-12">
                                <BotoneraDeuda cliente={this.props.cliente} deuda={this.props.deuda} handleClick={this.props.handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Deuda