
let estadisticas = document.getElementById('profile-tab'); //llamar estadisticas
let profile = document.getElementById('profile') // pintar estadisticas
let perfil = document.getElementById('perfil'); //pintar perfil
let preguntas = ' http://localhost:4001/pregunta1' //bd preguntas html server
let preguntasCss = 'http://localhost:4002/pregunta2' // bd preguntasCss server
let preguntasJs = ' http://localhost:4003/pregunta3' // bd preguntasJs server
let urlUsuario = 'http://localhost:4000/usuarios' //bd usuario server

//todo html
let progresoHtml = 0;

//todo css
let progesoCcs = 0;

// todo javascript
let progesoJavaScript = 0;

//variable generales
let tenerLocal = JSON.parse(localStorage.getItem("usuario"));
let posicion = 0;
let totalPreguntas = 0;
let buenaAnswer = 0;
let malaAnswer = 0;
let vida = 4;

// peticiones y curso de html
async function html(i) {
    // peticion tipo get para imprimir preguntas
    let resp = await fetch(preguntas)
    let data = await resp.json();

    // peticion tipo get para actualizar la bd
    let pedirEstadisticas = JSON.parse(localStorage.getItem("usuario"));
    let peticion = await fetch(urlUsuario)
    let contenido = await peticion.json();
    let verificar = contenido.find(datos => datos.id == pedirEstadisticas.id)
    let todasLasPreguntas = verificar.totalPreguntas + totalPreguntas;
    let buenasPreguntas = verificar.totalCorrectas + buenaAnswer;
    let malasPreguntas = verificar.totalMalas + malaAnswer;

    if (i == 6) {
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
                progesoHtml: progresoHtml,
                progesoCcs: verificar.progesoCcs,
                progesoJavaScript,
                totalPreguntas: todasLasPreguntas,
                totalCorrectas: buenasPreguntas,
                totalMalas: malasPreguntas,
                vida: vida
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

    } else {
        swal.fire({
            title: 'Tuviste un fallo, vuelve a intentarlo',
            showConfirmButton: true,
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "./index.html";

            }
        })
    }

    let q = data[i];
    let a = q.respuesta;
    rightAnswer = a[0]  // en el array la primer arespuesta sera la correcta siempre
    a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1); // preguntas randon
    let htmlQuestionCode = `<h7 class="text-white texto m-2 float-end"> ${q.pregunta}</h7>`
    const htmlAnswers = a.map(currentA => `<button onClick="evaluateAnswer('${currentA}')" class="mt-3 btn btn-dark text-start "> <span> ${currentA} </span> <input type="radio"></button> `)
    posicion++;


    // imprimir los cursos de html
    let body = document.getElementById('body') //linea 32 boton X
    body.innerHTML = `  <div class="container-fluid mt-4 align-center">
                        <div class="row">
                        <div class="col col-lg-2">
                        <button type="button" onclick="volver()" class="btn-close bg-dark" aria-label="Close"></button></div>
                        <div class="col">
                        <div class="progress" style="width: 60vw;">
                        <div class="progress-bar " role="progressbar" style="width:${progresoHtml}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="2"></div></div>
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
    totalPreguntas++

    if (answer == rightAnswer) {
        progresoHtml = progresoHtml + 17;
        parentP.classList.add('rightCurr');
        buenaAnswer++
    } else {
        parentP.classList.add('wrongCurr');
        malaAnswer++
        vida--
    }  
    
    if(vida == 0){
        swal.fire({
        title: '<span class="text-white">Culminaste el proceso y debes empezar desde cero en cualquiera de las categorías',
        background: `rgba(127, 90, 240)`,
        showConfirmButton: true,
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "./index.html";
            }
        })
    }
}
function otros() {
    swal.fire({
        title: '<span class="text-white">En construcción',
        background: `rgba(127, 90, 240)`,
        timer: 2500,
        showConfirmButton: false,
        html: `<div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
    })
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

estadisticas.addEventListener('click', async () => {
    let pedirEstadisticas = JSON.parse(localStorage.getItem("usuario"));
    let peticion = await fetch(urlUsuario)
    let contenido = await peticion.json();
    let verificar = contenido.find(datos => datos.id == pedirEstadisticas.id)

    profile.innerHTML = `<div class="container">
                        <h1 class="text-white">Estadisticas</h1>
                        <p class="text-white">Los ultimos 7 Dias<br> <i class="material-icons text-white">
                        keyboard_arrow_down</i> </p>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        watch_later</i> Tiempo de Estudio (Horas) <span class="text-end">  </span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas contestadas <span class="text-end">${verificar.totalPreguntas}</span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas correctas <span class="text-end text-success"> ${verificar.totalCorrectas} </span></button>
                        <button class="mt-3 btn text-white text-start bordes"><i class="material-icons text-dark float-start">
                        maps_ugc</i> Respuestas incorrectas <span class="text-end text-danger"> ${verificar.totalMalas} </span></button></div>`

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


// pintar css

async function css(i) {
    // peticion tipo get para imprimir preguntas
    let resp = await fetch(preguntasCss)
    let data = await resp.json();


    // peticion tipo get para actualizar la bd
    let pedirEstadisticas = JSON.parse(localStorage.getItem("usuario"));
    let peticion = await fetch(urlUsuario)
    let contenido = await peticion.json();
    let verificar = contenido.find(datos => datos.id == pedirEstadisticas.id)

    let todasLasPreguntas = verificar.totalPreguntas + totalPreguntas;
    let buenasPreguntas = verificar.totalCorrectas + buenaAnswer;
    let malasPreguntas = verificar.totalMalas + malaAnswer;

    if (i == 0) {
        progesoCcs = 0;
    } else {
        progesoCcs = progesoCcs + 17;
    }


    if (i == 6) {
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
                progesoHtml: progresoHtml,
                progesoCcs: progesoCcs,
                progesoJavaScript: verificar.progesoJavaScript,
                totalPreguntas: todasLasPreguntas,
                totalCorrectas: buenasPreguntas,
                totalMalas: malasPreguntas,
                vida: vida
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

    } else {
        swal.fire({
            title: 'Tuviste un fallo, vuelve a intentarlo',
            showConfirmButton: true,
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "./index.html";

            }
        })
    }

    let q = data[i];
    let a = q.respuesta;
    rightAnswer = a[0]  // en el array la primer arespuesta sera la correcta siempre
    a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1); // preguntas randon
    let cssQuestionCode = `<h7 class="text-white texto m-2 float-end"> ${q.pregunta}</h7>`
    const cssAnswers = a.map(currentA => `<button onClick="evaluateAnswer('${currentA}')" class="mt-3 btn btn-dark text-start "> <span> ${currentA} </span> <input type="radio"></button> `)
    posicion++;
    // imprimir los cursos de html
    let body = document.getElementById('body') //linea 32 boton X
    body.innerHTML = `  <div class="container-fluid mt-4 align-center">
                        <div class="row">
                        <div class="col col-lg-2">
                        <button type="button" onclick="volver()" class="btn-close bg-dark" aria-label="Close"></button></div>
                        <div class="col">
                        <div class="progress" style="width: 60vw;">
                        <div class="progress-bar " role="progressbar" style="width:${progesoCcs}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="2"></div></div>
                        </div>
                        <div class="col col-lg-2">
                        <h6 class="text-white"><i class="material-icons text-danger justify-content-center">favorite</i>${verificar.vida}</h6></div></div></div>
                        <div class="container mt-3">
                        <img src="../image/Property 1=1.png" class="float-start mt-5" style="width: 5rem;" alt="HTML5">
                        ${cssQuestionCode}
                        ${cssAnswers}
                        <button onClick="css(posicion)" id="subir" class="btn mt-4 btn-secondary answer disabled text-center position-relativa bottom-0">COMPROBAR</button></div>`
}

// javascript

async function js(i) {
    // peticion tipo get para imprimir preguntas
    let resp = await fetch(preguntasJs)
    let data = await resp.json();


    // peticion tipo get para actualizar la bd
    let pedirEstadisticas = JSON.parse(localStorage.getItem("usuario"));
    let peticion = await fetch(urlUsuario)
    let contenido = await peticion.json();
    let verificar = contenido.find(datos => datos.id == pedirEstadisticas.id)

    let todasLasPreguntas = verificar.totalPreguntas + totalPreguntas;
    let buenasPreguntas = verificar.totalCorrectas + buenaAnswer;
    let malasPreguntas = verificar.totalMalas + malaAnswer;

    if (i == 0) {
        progesoJavaScript = 0;
    } else {
        progesoJavaScript = progesoJavaScript + 17;
    }
    if (i == 6) {
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
                progesoHtml: verificar.progesoHtml,
                progesoCcs: verificar.progesoCcs,
                progesoJavaScript: progesoJavaScript,
                totalPreguntas: todasLasPreguntas,
                totalCorrectas: buenasPreguntas,
                totalMalas: malasPreguntas,
                vida: vida
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

    } else {
        swal.fire({
            title: 'Tuviste un fallo, vuelve a intentarlo',
            showConfirmButton: true,
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "./index.html";

            }
        })
    }

    let q = data[i];
    let a = q.respuesta;
    rightAnswer = a[0]  // en el array la primer arespuesta sera la correcta siempre
    a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1); // preguntas randon
    let jsQuestionCode = `<h7 class="text-white texto m-2 float-end"> ${q.pregunta}</h7>`
    const jsAnswers = a.map(currentA => `<button onClick="evaluateAnswer('${currentA}')" class="mt-3 btn btn-dark text-start "> <span> ${currentA} </span> <input type="radio"></button> `)
    posicion++;


    // imprimir los cursos de html
    let body = document.getElementById('body') //linea 32 boton X
    body.innerHTML = `  <div class="container-fluid mt-4 align-center">
                        <div class="row">
                        <div class="col col-lg-2">
                        <button type="button" onclick="volver()" class="btn-close bg-dark" aria-label="Close"></button></div>
                        <div class="col">
                        <div class="progress" style="width: 60vw;">
                        <div class="progress-bar " role="progressbar" style="width:${progesoJavaScript}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="2"></div></div>
                        </div>
                        <div class="col col-lg-2">
                        <h6 class="text-white"><i class="material-icons text-danger justify-content-center">favorite</i>${verificar.vida}</h6></div></div></div>
                        <div class="container mt-3">
                        <img src="../image/Property 1=1.png" class="float-start mt-5" style="width: 5rem;" alt="HTML5">
                        ${jsQuestionCode}
                        ${jsAnswers}
                        <button onClick="js(posicion)" id="subir" class="btn mt-4 btn-secondary answer disabled text-center position-relativa bottom-0">COMPROBAR</button></div>`
}