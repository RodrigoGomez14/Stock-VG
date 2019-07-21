import React, { Component } from "react"
import "./styles/SpinnerLoading.css"

class SpinnerLoading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="spinner-border" role="status">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SpinnerLoading