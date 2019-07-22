import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import * as firebase from "firebase"
import FichaProovedor from "../components/FichaProovedor"
import "./Styles/ProovedoresList.css"

class ClientesList extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        cliente: undefined,
        clientes: [],
    }
    constructor(props) {
        const firebaseConfig = {
            apiKey: "AIzaSyDPmTjxjMxN2abofP8ZczgFGeYQYSvbXHE",
            authDomain: "stock-119e8.firebaseapp.com",
            databaseURL: "https://stock-119e8.firebaseio.com",
            projectId: "stock-119e8",
            storageBucket: "stock-119e8.appspot.com",
            messagingSenderId: "1007277754269",
            appId: "1:1007277754269:web:d1db0def0da907b2"
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        super(props)
    }
    async fetchData() {
        const productosRef = await firebase.database().ref().child('clientes2')
        productosRef.on("value", snapshot => {
            console.log(snapshot.val())
            this.setState({
                clientes: snapshot.val(),
                loading: false
            })
        })
    }
    componentDidMount() {
        this.authListener()
        this.fetchData()
    }
    handleClick(cliente) {
        this.setState({
            cliente: cliente
        })
    }
    logOut() {
        firebase.auth().signOut()
    }
    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                this.setState({ user })
                console.log("user added")
            }
            else {
                this.setState({
                    user: null
                })
                console.log("user quit")
            }
        })
    }
    render() {
        try {
            const user = this.state.user.email
            if (user) {
                if (this.state.loading) {
                    return (
                        <div>
                            <NavBar handleClick={this.logOut} />
                            <SpinnerLoading />
                        </div>
                    )
                }
                else {
                    if (this.state.cliente) {
                        const cliente = this.state.clientes[this.state.cliente]
                        return (
                            <div>
                                <FichaProovedor proovedor={cliente} />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <NavBar handleClick={this.logOut} />
                                <div className="productList">
                                    <div className="container-fluid">
                                        <div className="row">
                                            {Object.values(this.state.clientes).map(cliente => (
                                                <div className="col-12 text-center form-group">
                                                    <button type="button" className="btn btn-primary btn-cliente" onClick={() => {
                                                        this.handleClick(cliente.datos.nombre)
                                                    }}>
                                                        {cliente.datos.nombre}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            }
        }
        catch{
            return (
                <Login redirect="Clientes" />
            )
        }
    }
}
export default ClientesList