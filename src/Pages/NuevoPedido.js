import React, { Component, Fragment } from "react"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import SpinnerLoading from "../components/SpinnerLoading"
import ProductElection from "../components/ProductElection"
import * as firebase from "firebase"
import ValvulaBajoSurtidor from "../images/ValvulaBajoSurtidor.png"
import ValvulaPieUnaYMedia from "../images/ValvulaPieUnaYMedia.png"
import Buje3 from "../images/Buje3.png"
import FundaAmarilla from "../images/FundaAmarilla.png"
import FundaAzul from "../images/FundaAzul.png"
import FundaGris from "../images/FundaGris.png"
import FundaNegra from "../images/FundaNegra.png"
import FundaRoja from "../images/FundaRoja.png"
import FundaVerde from "../images/FundaVerde.png"
import Arandela from "../images/Arandela.png"
import Abrazadera from "../images/Abrazadera.png"
import AntiSalpicaduraAmarilo from "../images/AntiSalpicaduraAmarillo.png"
import AntiSalpicaduraAzul from "../images/AntiSalpicaduraAzul.png"
import AntiSalpicaduraNegro from "../images/AntiSalpicaduraNegro.png"
import AntiSalpicaduraRojo from "../images/AntiSalpicaduraRojo.png"
import AntiSalpicaduraVerde from "../images/AntiSalpicaduraVerde.png"
import BaldeAntiDerrame from "../images/balde.png"
import BreakAway from "../images/BreakAway.png"
import Buje3Pulg from "../images/Buje3Pulg.png"
import Buje4Pulg from "../images/Buje4Pulg.png"
import Giratorio1Pulg from "../images/Giratorio1Pulg.png"
import Giratorio3_4Pulg from "../images/Giratorio3-4Pulg.png"
import Fuelle from "../images/Fuelle.png"
import GomaDeFuelle from "../images/GomaDeFuelle.png"
import Junta from "../images/Junta.png"
import Manguera1Pulg from "../images/Manguera1Pulg.png"
import MangueraRoja from "../images/MangueraRoja.png"
import MangueraVerde from "../images/MangueraVerde.png"
import MangueraNegra from "../images/MangueraNegra.png"
import PastaDeAgua from "../images/PastaDeAgua.png"
import Pico11_A from "../images/Pico11-A.png"
import Pico120_L from "../images/Pico120-L.png"
import RepuestoDeTapa from "../images/RepuestoDeTapa.png"
import Sombrerete2Pulg from "../images/Sombrerete2Pulg.png"
import Tapa3Pulg from "../images/Tapa3Pulg.png"
import Tapa4Pulg from "../images/Tapa4Pulg.png"
import TapaExpansora from "../images/TapaExpansora.png"
import ResumenPedido from "../components/ResumenPedido"
import "./Styles/NuevoPedido.css"
class NuevoPedido extends Component {
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
        const productosRef = await firebase.database().ref().child('productos2')
        productosRef.on("value", snapshot => {
            this.setState({
                products: snapshot.val(),
                loading: false
            })
        })
    }
    sleccionarDestinatario() {
        return (
            prompt("Ingresar Destinatario")
        )
    }
    async enviarPedido() {
        const pedidosRef = await firebase.database().ref().child('pedidos2')
        const arr = []

        Object.keys(this.state.pedido).map(key => {
            arr.push(
                {
                    nombre: this.state.pedido[key].nombre,
                    cantidad: this.state.pedido[key].cantidad
                }
            )
        })
        const cliente = this.sleccionarDestinatario()
        pedidosRef.push({
            cliente: cliente,
            articulos: arr
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
    componentDidMount() {
        this.authListener()
        this.fetchData()
    }
    state = {
        user: undefined,
        loading: true,
        error: null,
        pedido: [],
        products: [
        ],
        images: {
            "Valvula Bajo Surtidor": ValvulaBajoSurtidor,
            "Valvula Bajo Surtidor 2 Pulg": ValvulaBajoSurtidor,
            "Valvula De Pie": ValvulaPieUnaYMedia,
            "Valvula De Pie 2 Pulg": ValvulaPieUnaYMedia,
            "Valvula De Pie 2 Pulg 1-2": ValvulaPieUnaYMedia,
            "Valvula De Pie 3 Pulg": ValvulaPieUnaYMedia,
            "Valvula De Pie 4 Pulg": ValvulaPieUnaYMedia,
            "buje 3 pulg": Buje3,
            "Funda Amarilla": FundaAmarilla,
            "Funda Amarilla 1 Pulg": FundaAmarilla,
            "Funda Azul": FundaAzul,
            "Funda Gris": FundaGris,
            "Funda Negra": FundaNegra,
            "Funda Negra 1 Pulg": FundaNegra,
            "Funda Verde 1 Pulg": FundaVerde,
            "Funda Roja": FundaRoja,
            "Funda Verde": FundaVerde,
            "AntiSalpicadura Amarillo": AntiSalpicaduraAmarilo,
            "AntiSalpicadura Azul": AntiSalpicaduraAzul,
            "AntiSalpicadura Negro": AntiSalpicaduraNegro,
            "AntiSalpicadura Rojo": AntiSalpicaduraRojo,
            "AntiSalpicadura Verde": AntiSalpicaduraVerde,
            "Arandela": Arandela,
            "Abrazaderas": Abrazadera,
            "Balde AntiDerrame": BaldeAntiDerrame,
            "Break Away 1 Pulg": BreakAway,
            "Break Away 3-4 Pulg": BreakAway,
            "Buje 3 Pulg": Buje3Pulg,
            "Buje 4 Pulg": Buje4Pulg,
            "Fuelles": Fuelle,
            "Giratorio 3-4 Pulg": Giratorio3_4Pulg,
            "Giratorio 1 Pulg": Giratorio1Pulg,
            "Goma De Fuelles": GomaDeFuelle,
            "Junta 3 Fina": Junta,
            "Junta 3 Gruesa": Junta,
            "Junta 4 Fina": Junta,
            "Junta 4 Gruesa": Junta,
            "Manguera 1 Pulg": Manguera1Pulg,
            "Manguera 3-4 Pulg Negra": MangueraNegra,
            "Manguera 3-4 Pulg Roja": MangueraRoja,
            "Manguera 3-4 Pulg Verde": MangueraVerde,
            "Pasta De Agua": PastaDeAgua,
            "Pico 11-A": Pico11_A,
            "Pico 120-L": Pico120_L,
            "Repuesto De Tapa": RepuestoDeTapa,
            "Sombrerete 2 Pulg": Sombrerete2Pulg,
            "Tapa 3 Pulg": Tapa3Pulg,
            "Tapa 4 Pulg": Tapa4Pulg,
            "Tapa Expansora": TapaExpansora,
        }
    }
    agregarArticulo(nombre, cantidad) {
        const arr = this.state.pedido
        arr.push({
            nombre: nombre,
            cantidad: cantidad
        })
        super.setState({
            ...this.state,
            pedido: arr
        })
    }
    render() {
        try {
            let user = undefined
            user = this.state.user.email
            if (user) {
                if (this.state.loading) {
                    return (
                        <Fragment>
                            <NavBar />
                            <SpinnerLoading />
                        </Fragment>
                    )
                }
                else {
                    return (
                        <div>
                            <NavBar handleClick={this.logOut} />
                            <div className="productList">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h1>Elegir Productos</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {Object.values(this.state.products).map(producto => (
                                            <div className="col-2 form-group text-center">
                                                <ProductElection handleClick={e => {
                                                    this.agregarArticulo(producto.nombre, prompt(producto.nombre))
                                                }} nombre={producto.nombre} imagen={this.state.images[producto.nombre]} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row">
                                        <ResumenPedido pedido={this.state.pedido}
                                            enviarPedido={e => (
                                                this.enviarPedido()
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        }
        catch (error) {
            return (
                <Login redirect="NuevoPedido" />
            )
        }

    }
}
export default NuevoPedido