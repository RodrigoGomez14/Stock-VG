import React, { Component } from "react"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import * as firebase from "firebase"
import FichaProovedor from "../components/FichaProovedor"
import "./Styles/ProovedoresList.css"

class ProovedoresList extends Component {
    state = {
        user: undefined,
        loading: true,
        error: null,
        proovedor: undefined,
        proovedores: [],
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
        const productosRef = await firebase.database().ref().child('proovedores2')
        productosRef.on("value", snapshot => {
            console.log(snapshot.val())
            this.setState({
                proovedores: snapshot.val(),
                loading: false
            })
        })
    }
    componentDidMount() {
        this.authListener()
        this.fetchData()
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
    handleClick(proovedor) {
        this.setState({
            proovedor: proovedor
        })
    }
    returnBack() {
        this.setState({
            proovedor: undefined
        })
    }
    logOut() {
        firebase.auth().signOut()
    }
    render() {
        try {
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
                    if (this.state.proovedor) {
                        const proovedor = this.state.proovedores[this.state.proovedor]
                        return (
                            <div>
                                <FichaProovedor proovedor={proovedor} />
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
                                            {Object.values(this.state.proovedores).map(proovedor => (
                                                <div className="col-12 text-center form-group">
                                                    <button type="button" className="btn btn-primary btn-cliente" onClick={() => {
                                                        this.handleClick(proovedor.datos.nombre)
                                                    }}>
                                                        {proovedor.datos.nombre}
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
                <Login redirect="Proovedores" />
            )
        }
    }
}
export default ProovedoresList