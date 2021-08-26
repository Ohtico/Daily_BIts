

let perfil = document.getElementById('perfil');

function volver(){
    window.location = "./index.html"
}

function cerrar() {
    swal.fire({
        title: 'Estas seguro que quieres cerrar sesion',
        icon: 'warning',
        background: `rgba(33, 33, 32)`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Salir`
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('usuario', null)
            window.location = "./usuario.html"
        }
    })
}

function html() {
    let body = document.getElementById('body') //linea 32 boton X
    body.innerHTML = `  <div class="container-fluid mt-4 align-center">
                        <div class="row">
                        <div class="col col-lg-2">
                        <button type="button" onclick="volver()" class="btn-close bg-dark" aria-label="Close"></button></div>
                        <div class="col">
                        <div class="progress" style="width: 60vw;">
                        <div class="progress-bar " role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>
                        </div>
                        <div class="col col-lg-2">
                        <h6 class="text-white"><i class="material-icons text-danger justify-content-center">favorite</i>4</h6></div></div></div>
                        <div class="container m-3">
                        <img src="../image/Property 1=1.png" class="float-start mt-3" style="width: 5rem;" alt="HTML5">
                        <h7 class="text-white texto m-2 float-end"> ¿Qué etiqueta es semánticamente correcta para el contenido principal?</h7>
                        <button class="mt-5 btn btn-dark text-start " value="correcta" id="selec">Si <input type="radio"></button>
                        <button class="mt-3 btn btn-dark text-start " value="mala" id="posible">No <input type="radio"></button>
                        <button class="mt-3 btn btn-dark text-start" value="fail" id="correctas">No, algunas etiquetas HTML simples <input type="radio"></button></div>
                        <div class="container m-3 container-fluid position-absolute bottom-0">
                        <button class="mt-3 comprobar btn-secondary text-center position-relativa bottom-0" onclick="comprobar()">COMPROBAR</button></div>`
}
function pintarPerfil(){
    let perfilLocal = JSON.parse(localStorage.getItem("usuario"));
    perfil.innerHTML = `<h1 class="text-white">Perfil</h1>
                        <div class="container d-flex justify-content-center p-4">
                        <img src="${perfilLocal.url}" class="rounded-circle mt-5" style="width: 6rem;" alt="HTML5">
                        </div>
                        <div class="container d-flex justify-content-center text-white">
                        <h6>${perfilLocal.nombre}</h6>
                        </div>
                        <div class="container d-flex justify-content-center p-2 text-white">
                        <h6>${perfilLocal.email}</h6>
                        </div>
                        <div class="container d-flex justify-content-center text-white p-3">
                        <h6><a onclick="cerrar()" class="text-danger">Cerrar Sesion</a></h6>
                        </div>`
}
    

