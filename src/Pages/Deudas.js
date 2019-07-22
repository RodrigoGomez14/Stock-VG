import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import Deuda from "../components/Deuda"
import * as firebase from "firebase"

class Deudas extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        deudas: []
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
            const arr = []
            Object.keys(snapshot.val()).map(cliente => {
                arr.push([
                    cliente,
                    snapshot.val()[cliente].datos.deuda
                ]
                )
            })
            this.setState(
                {
                    deudas: arr,
                    loading: false
                }
            )
        })
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
    componentDidMount() {
        this.authListener()
        this.fetchData()
    }
    async updateDeuda(cliente, nuevaDeuda) {
        const datosRef = await firebase.database().ref().child('clientes2').child(cliente).child("datos")
        datosRef.update({
            deuda: nuevaDeuda
        })

    }
    logOut() {
        firebase.auth().signOut()
    }
    render() {
        try{
            const user = this.state.user.email
            if(user){
                    if (this.state.loading) {
                        return (
                            <div>
                                <NavBar handleClick={this.logOut} />
                                <SpinnerLoading />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <NavBar handleClick={this.logOut} />
                                <div className="productList">
                                    <div className="container">
                                        <div className="row">
                                            {this.state.deudas.map(cliente => (
                                                <Deuda cliente={cliente[0]} deuda={cliente[1]} handleClick={this.updateDeuda} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
            }
        }
        catch{
            return (
                <Login redirect="Deudas" />
            )
        }
    }
}
export default Deudas
