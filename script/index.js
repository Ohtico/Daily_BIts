
let estadisticas = document.getElementById('profile-tab'); //llamar estadisticas
let profile = document.getElementById('profile') // pintar estadisticas
let perfil = document.getElementById('perfil'); //pintar perfil
let preguntas = ' http://localhost:4001/pregunta1' //bd preguntas html
let urlUsuario = 'http://localhost:4000/usuarios' //bd usuario


let tenerLocal = JSON.parse(localStorage.getItem("usuario"));
let posicion = 0;
let totalPreguntas = 0;
let buenaAnswer = 0;
let malaAnswer = 0;
let vida = 4;
let progreso = 0;



async function html(i) {


    let resp = await fetch(preguntas)
    let data = await resp.json();
    if (i == 6 && progreso > 100) {
        swal.fire({
            title: 'Felicidades culminaste con exito',
            showConfirmButton: true,
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "./index.html";
                
            }
        })
        await fetch(`http://localhost:4000/usuarios/${tenerLocal.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            nombre: tenerLocal.nombre,
            email: tenerLocal.email,
            url: tenerLocal.url,
            progeso: progreso,
            vida: vida
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    }

    let q = data[i];
    let a = q.respuesta;
    rightAnswer = a[0]
    console.log(data[i])
    a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1);
    let htmlQuestionCode = `<h7 class="text-white texto m-2 float-end"> ${q.pregunta}</h7>`
    const htmlAnswers = a.map(currentA => `<button onClick="evaluateAnswer('${currentA}')" class="mt-3 btn btn-dark text-start "> <span> ${currentA} </span> <input type="radio"></button> `)
    posicion++;

    let body = document.getElementById('body') //linea 32 boton X
    body.innerHTML = `  <div class="container-fluid mt-4 align-center">
                        <div class="row">
                        <div class="col col-lg-2">
                        <button type="button" onclick="volver()" class="btn-close bg-dark" aria-label="Close"></button></div>
                        <div class="col">
                        <div class="progress" style="width: 60vw;">
                        <div class="progress-bar " role="progressbar" style="width:${progreso}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="2"></div></div>
                        </div>
                        <div class="col col-lg-2">
                        <h6 class="text-white"><i class="material-icons text-danger justify-content-center">favorite</i>${vida}</h6></div></div></div>
                        <div class="container mt-3">
                        <img src="../image/Property 1=1.png" class="float-start mt-5" style="width: 5rem;" alt="HTML5">
                        ${htmlQuestionCode}
                        ${htmlAnswers}
                        <button onClick="html(posicion)" id="subir" class="btn mt-4 btn-secondary answer disabled text-center position-relativa bottom-0">COMPROBAR</button></div>`
                        
}

const evaluateAnswer = (answer) => {
    document.querySelector('.answer').classList.remove('disabled');
    let parentP = document.querySelector('.answer')
    if (answer == rightAnswer) {
        progreso = progreso + 17;
        parentP.classList.add('rightCurr');
        buenaAnswer++
    } else {
        parentP.classList.add('wrongCurr');
        malaAnswer++
        vida--
    }
}


function pintarPerfil() {
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

estadisticas.addEventListener('click', () => {

    profile.innerHTML = `<div class="container">
                        <h1 class="text-white">Estadisticas</h1>
                        <p class="text-white">Los ultimos 7 Dias<br> <i class="material-icons text-white">
                        keyboard_arrow_down</i> </p>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        watch_later</i> Respuestas contestadas <span class="text-end"> variable </span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas contestadas <span class="text-end"> variable </span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas correctas <span class="text-end"> variable </span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas correctas <span class="text-end"> variable </span></button></div>`

})

function volver() {
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