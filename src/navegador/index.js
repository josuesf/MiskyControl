var yo = require('yo-yo')
var empty = require('empty-element');
import { productos } from '../productos'
import { inicio } from '../inicio'
import { sub_navegador } from '../sub_navegador'
import { login } from '../login'
function Ver(login) {
    var el = login ? yo`
        <nav>
            <div class="nav-wrapper" style="background-color:#2c2c54">
                <ul class="right hide-on-med-and-down">
                    <li>
                        <a onclick="${() => inicio()}">Incio</a>
                    </li>
                    <li>
                        <a class="dropdown-button" href="#!" data-activates="Opciones">Configuracion
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <ul id="Opciones" class="dropdown-content">
                            <li>
                                <a onclick="${() => productos()}">Productos</a>
                            </li>
                            <li>
                                <a href="#!">Mesas</a>
                            </li>
                            <li>
                                <a href="#!">Clientes</a>
                            </li>
                        </ul>
                    </li>
                    <!-- Dropdown Trigger -->
                    <li>
                        <a class="dropdown-button" href="#!" data-activates="sesion">${login}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <ul id="sesion" class="dropdown-content">
                            <li>
                                <a onclick="${() => CerrarSesion()}">Salir</a>
                            </li>
                            <li>
                                <a href="#!">Ver Perfil</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>` : yo`<div></div>`;
    var container = document.getElementById('navegador_content')
    empty(container).appendChild(el);
    $(".dropdown-button").dropdown();
}

function CerrarSesion() {
    Ver()
    sub_navegador()
    login()
}

function navegador(login) {
    Ver(login)
}

export { navegador }