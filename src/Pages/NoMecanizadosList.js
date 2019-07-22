import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Product from "../components/Product"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import * as firebase from "firebase"
import Buje3Pulg from "../images/Buje3Pulg.png"
import Buje4Pulg from "../images/Buje4Pulg.png"
import ValvulaBajoSurtidor from "../images/ValvulaBajoSurtidor.png"
import ValvulaDePie from "../images/ValvulaPieUnaYMedia.png"

class NoMecanizadosList extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        products: [],
        images: {
            "Buje 3 Pulg": Buje3Pulg,
            "Buje 4 Pulg": Buje4Pulg,
            "Valvula Bajo Surtidor": ValvulaBajoSurtidor,
            "Valvula Bajo Surtidor 2 Pulg": ValvulaBajoSurtidor,
            "Valvula De Pie": ValvulaDePie,
        }
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
        const productosRef = await firebase.database().ref().child('no-mecanizados2')
        productosRef.on("value", snapshot => {
            this.setState({
                products: snapshot.val(),
                loading: false
            })
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
    logOut() {
        firebase.auth().signOut()
    }
    componentDidMount() {
        this.authListener()
        this.fetchData()
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
                    return (
                        <div>
                            <NavBar handleClick={this.logOut} />
                            <div className="productList">
                                <div className="container-fluid">
                                    <div className="row">
                                        {Object.values(this.state.products).map(producto => (
                                            <div className="col-3 form-group text-center">
                                                <Product nombre={producto.nombre} cantidad={producto.cantidad} imagen={this.state.images[producto.nombre]} seccion="no-mecanizados" />
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
        catch{
            return (
                <Login redirect="no-mecanizados" />
            )
        }
    }
}
export default NoMecanizadosList