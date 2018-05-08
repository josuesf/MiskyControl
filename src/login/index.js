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
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate">
                            <label for="email" data-error="wrong" data-success="right">Email</label>
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
                <a href="#" onclick="${()=>Ingresar()}" class="btn">Ingresar</a>
            </div>
        </div>
    </div>
        `;
    return el
}
function Ingresar(){
    navegador('JOSUESF')
    inicio()
}
function login() {
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(Ver());
}

export { login }