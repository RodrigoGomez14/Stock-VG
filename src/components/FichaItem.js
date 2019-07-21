import React, { Component, Fragment } from "react"
import "./styles/fichaitem.css"
class FichaItem extends Component {
    render() {
        if (this.props.item === "telefono" || this.props.item === "direccion" || this.props.item === "info-extra") {
            return (
                <Fragment>
                    <span className="separador"></span>
                    <div className="col-12">
                        <h3>{this.props.item}</h3>
                    </div>
                    {Object.keys(this.props.data[this.props.item]).map(item => (
                        <Fragment>
                            <div className="col-6">
                                <h3>{(this.props.data[this.props.item])[item]}</h3>
                            </div>
                        </Fragment>
                    ))}
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <span className="separador"></span>
                    <div className="col-6">
                        <h3>{this.props.item}</h3>
                    </div>
                    <div className="col-6">
                        <h3>{this.props.data[this.props.item]}</h3>
                    </div>
                </Fragment>
            )
        }
    }
}
export default FichaItem