var yo = require('yo-yo')
var empty = require('empty-element');
import { navegador } from '../navegador'
import { inicio } from '../Inicio'
function Ver() {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Inicio de Sesion</span>
                <form class="col s12">
                    <div class="row" id="box_error" style="display:none;">
                        <div class="col s12">
                        <div class="card-panel  red lighten-2">
                            <span class="white-text" id = "text_error"></span>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="username" type="text" class="validate">
                            <label for="text" data-error="wrong" >Username</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate">
                            <label for="password">Password</label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-action">
                <a href="#" onclick="${() => Ingresar()}" class="btn">Ingresar</a>
            </div>
        </div>
    </div>
        `;
    return el
}
function Ingresar() {
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    }
    fetch('http://localhost:5000/login_', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                navegador(res.account.username)
                inicio()
            }
        })

}
function login() {
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(Ver());
}

export { login }