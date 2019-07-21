import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import withFirebaseAuth from "react-with-firebase-auth"
import * as firebase from "firebase/app"
import firebaseConfig from "../firebase"

const firebaseApp = firebase.initializeApp(firebaseConfig)
class Login extends Component {
    state = {
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
    componentDidMount() {
        this.authListener()
    }
    async logIn() {
        await firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).then(success => {
            alert("Bienvenido")
        })
            .catch(error => {
                alert("El usuario o la contraseña son incorrectas")
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
                    <Redirect to={"/"+this.props.redirect} />
                    :
                    <form>
                        <div className="formRow">
                            <div className="form-group col-md-6">
                                <label >Email</label>
                                <input value={this.state.mail} type="email" onChange={e => {
                                    this.updateMail(e.target.value)
                                }} className="form-control" id="inputEmail" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input value={this.state.password} type="password" onChange={e => {
                                    this.updatePass(e.target.value)
                                }} className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                            <Link to="/Productos">
                                <button type="submit" onClick={e => {
                                    e.preventDefault()
                                    this.logIn()
                                }} className="btn btn-primary">Sign in</button>
                            </Link>
                        </div>
                    </form>
                }
            </div>
        )
    }
}
const firebaseAppAuth = firebaseApp.auth()
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);