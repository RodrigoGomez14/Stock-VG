import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import withFirebaseAuth from "react-with-firebase-auth"
import * as firebase from "firebase/app"
import firebaseConfig from "../firebase"
import "./styles/Login.css"

const firebaseApp = firebase.initializeApp(firebaseConfig)
class Login extends Component {
    state = {
        loading: false,
        redirect: this.props.redirect,
        user: null,
        mail: undefined,
        password: undefined
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
    redirect() {
        if (!this.state.redirect) {
            this.setState({
                redirect: "productos"
            })
        }
    }
    componentDidMount() {
        this.authListener()
        this.redirect()
    }
    async logIn() {
        this.setState({
            loading: true
        })
        await firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).then(success => {
            alert("Bienvenido")
            this.setState({
                loading: false
            })
        })
            .catch(error => {
                alert("El usuario o la contraseña son incorrectas")
                this.setState({
                    loading: false
                })
            })

    }
    logOut() {
        firebase.auth().signOut()
    }
    updateMail(data) {
        this.setState(
            {
                mail: data
            }
        )
    }
    updatePass(data) {
        this.setState(
            {
                password: data
            }
        )
    }
    render() {
        return (
            <div>
                {this.state.user ?
                    //<button type="button" onClick={this.logOut} className="btn btn-primary">Sign Out</button>
                    <Redirect to={"/" + this.state.redirect} />
                    :
                    <div className="container-fluid login">
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form>
                                    <div className="formRow">
                                        <div className="form-group col-12">
                                            <label >Email</label>
                                            <input value={this.state.mail} type="email" onChange={e => {
                                                this.updateMail(e.target.value)
                                            }} className="form-control" id="inputEmail" placeholder="Email" />
                                        </div>
                                        <div className="form-group col-12">
                                            <label>Password</label>
                                            <input value={this.state.password} type="password" onChange={e => {
                                                this.updatePass(e.target.value)
                                            }} className="form-control" id="inputPassword4" placeholder="Password" />
                                        </div>
                                        <div className="form-group col-12 text-center">
                                            <Link to="/Productos">
                                                <button type="submit" onClick={e => {
                                                    e.preventDefault()
                                                    this.logIn()
                                                }} className="btn btn-primary">Ingresar</button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.loading ? <h1>Loading..</h1> : null}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
const firebaseAppAuth = firebaseApp.auth()
const providers = {
    googleProvider: new firebase.auth.EmailAuthProvider()
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);