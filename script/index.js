

let perfil = document.getElementById('perfil')

function cerrar() {
    swal.fire({
        title: 'Estas seguro que quieres cerrar sesion',
        icon: 'warning',
        background: `rgba(33, 33, 32)`,
        confirmButtonText: `Cerrar`
    })
}
// function comprobar() {
//     let seleccion = document.querySelectorAll('.pro').value;
//     // location.reload('./index.html'); //para volver a la pagina inicial
// }
function llamar() {
    let body = document.getElementById('body')
    body.innerHTML = `<div class="container-fluid">
                        <label for="customRange2" class="form-label float-end texto text-white"><i
                        class="material-icons text-danger float-start">
                        favorite</i>4</label>
                        <input type="range" class="form-range" min="0" max="30" id="customRange2">
                        </div>
                        <div class="container">
                        <img src="../image/Property 1=1.png" class="float-start mt-3" style="width: 5rem;" alt="HTML5">
                        <h7 class="text-white texto float-end"> ¿Todas las etiquetas HTML vienen en pares?</h7>
                        </div>
                        <div class="container">
                        <button class="mt-5 btn btn-dark text-start" value="correcta" id="selec">Si <input type="radio" class="text-end"></button>
                        <button class="mt-3 btn btn-dark text-start" value="mala" id="posible">No <input type="radio"></button>
                        <button class="mt-3 btn btn-dark text-start" value="fail" id="correctas">No, algunas etiquetas HTML simples <input type="radio"></button>
                        </div>
                        <div class="container container-fluid position-absolute bottom-0">
                        <button class="mt-3 comprobar btn-secondary text-center position-relativa bottom-0" onclick="comprobar()">COMPROBAR</button>
                        </div>`
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
    

