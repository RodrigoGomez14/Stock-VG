import React, { Component, Fragment } from "react"
import FichaItem from "./FichaItem"
import "./styles/ficha.css"
class Ficha extends Component {
    render() {
        const info = Object.keys(this.props.data)
        return (
            <div className="container ficha bg-dark p-3">
                <div className="row">
                    <div className="col-12">
                        <h1>{this.props.data.nombre}</h1>
                    </div>
                    {info.map(item => (
                        <FichaItem item={item} data={this.props.data} />
                    ))}
                </div>
            </div>
        )
    }
}
export default Ficha

