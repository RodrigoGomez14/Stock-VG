import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import Product from "../components/Product"
import SpinnerLoading from "../components/SpinnerLoading"
import * as firebase from "firebase"
import GilbarcoDoble from "../images/GilbarcoDoble.png"
import GilbarcoDobleLegacy from "../images/GilbarcoDobleLegacy.png"
import GilbarcoSimple from "../images/GilbarcoSimple.png"
import GilbarcoSimpleLegacy from "../images/GilbarcoSimpleLegacy.png"
import WayneDobleCentury from "../images/WayneDobleCentury.png"
import WayneDobleDL1 from "../images/WayneDobleDL1.png"
import WayneSimpleCentury from "../images/WayneSimpleCentury.png"
import WayneSimpleDL1 from "../images/WayneSimpleDL1.png"

class SurtidoresList extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        products: [],
        images: {
            "Gilbarco Doble": GilbarcoDoble,
            "Gilbarco Doble Legacy": GilbarcoDobleLegacy,
            "Gilbarco Simple": GilbarcoSimple,
            "Gilbarco Simple Legacy": GilbarcoSimpleLegacy,
            "Wayne Doble Century": WayneDobleCentury,
            "Wayne Doble DL1": WayneDobleDL1,
            "Wayne Simple Century": WayneSimpleCentury,
            "Wayne Simple DL1": WayneSimpleDL1,
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
        const productosRef = await firebase.database().ref().child('Surtidores2')
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
    componentDidMount() {
        this.authListener()
        this.fetchData()
    }
    logOut() {
        firebase.auth().signOut()
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
                                                <Product nombre={producto.nombre} cantidad={producto.cantidad} imagen={this.state.images[producto.nombre]} seccion="Surtidores" />
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
                <Login redirect="surtidores" />
            )
        }
    }
}
export default SurtidoresList