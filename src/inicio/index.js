var yo = require('yo-yo')
var empty = require('empty-element');
function Ver() {
    var el = yo`
    <div class="row">
                <div class="col s12 m3">
                    <div class="card teal accent-4">
                        <div class="card-content white-text">
                            <span class="card-title">Mesa 01</span>
                        </div>
                        <div class="card-action">
                            <a href="#" class="white-text">Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m3">
                    <div class="card teal accent-4">
                        <div class="card-content white-text">
                            <span class="card-title">Mesa 02</span>
                        </div>
                        <div class="card-action">
                            <a href="#" class="white-text">Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m3">
                    <div class="card red lighten-3">
                        <div class="card-content white-text">
                            <span class="card-title">Mesa 03</span>
                        </div>
                        <div class="card-action">
                            <a href="#" class="white-text">Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m3">
                    <div class="card teal accent-4">
                        <div class="card-content white-text">
                            <span class="card-title">Mesa 04</span>
                        </div>
                        <div class="card-action">
                            <a href="#" class="white-text">Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m3">
                    <div class="card teal accent-4">
                        <div class="card-content white-text">
                            <span class="card-title">Mesa 05</span>
                        </div>
                        <div class="card-action">
                            <a href="#" class="white-text">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las mesas</a>
        <a href="#!" class="collection-item">Mesas Ocupadas</a>
        <a href="#!" class="collection-item">Mesas Libres</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function inicio() {
    //Cargar Mesas
    Ver()
}

export { inicio }