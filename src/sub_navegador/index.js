var yo = require('yo-yo')
var empty = require('empty-element');
function Ver() {
    var el = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Inicio de Sesion</a>
        <a href="#!" class="collection-item">Contáctanos</a>
    </div>
        `;
    return el
}

var no_login = yo``;
function sub_navegador() {
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(Ver());
}

export { sub_navegador }