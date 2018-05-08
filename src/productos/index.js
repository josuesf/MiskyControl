var yo = require('yo-yo')
var empty = require('empty-element');
function Ver() {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Productos</span>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>$0.87</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>Jellybean</td>
                            <td>$3.76</td>
                        </tr>
                        <tr>
                            <td>Jonathan</td>
                            <td>Lollipop</td>
                            <td>$7.00</td>
                        </tr>
                        <tr>
                            <td>Shannon</td>
                            <td>KitKat</td>
                            <td>$9.99</td>
                        </tr>
                    </tbody>
                </table>
                <ul class="pagination">
                    <li class="disabled">
                        <a href="#!">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li class="active">
                        <a href="#!">1</a>
                    </li>
                    <li class="waves-effect">
                        <a href="#!">2</a>
                    </li>
                    <li class="waves-effect">
                        <a href="#!">3</a>
                    </li>
                    <li class="waves-effect">
                        <a href="#!">4</a>
                    </li>
                    <li class="waves-effect">
                        <a href="#!">5</a>
                    </li>
                    <li class="waves-effect">
                        <a href="#!">
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <a href="#">Guardar</a>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los productos</a>
        <a href="#!" class="collection-item">Nuevo Producto</a>
        <a href="#!" class="collection-item">Carta de Productos</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function productos() {
    //Cargar productos
    Ver()
}

export { productos }