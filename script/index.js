

let perfil = document.getElementById('perfil');
let preguntas = ' http://localhost:4001/pregunta1'
let posicion = 0;
let buenaAnswer = 0;
let malaAnswer = 0;
let vida = 4;
let progreso = 0;

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

    }

    let q = data[i];
    let a = q.respuesta;
    rightAnswer = a[0]
    console.log(data[i])
    a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1);
    let htmlQuestionCode = `<h7 class="text-white texto m-2 float-end"> ${q.pregunta}</h7>`
    const htmlAnswers = a.map(currentA => `<button onClick="evaluateAnswer('${currentA}', this)" class="mt-3 btn btn-dark text-start answer"> <span> ${currentA} </span> <input type="radio"></button> `)
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
                        <button onClick="html(posicion)"  class="btn mt-4 btn-secondary text-center position-relativa bottom-0">COMPROBAR</button></div>`
}

const evaluateAnswer = (answer, obj) => {
    document.querySelectorAll('.answer').forEach(a => a.classList.remove('rightCurr', 'wrongCurr'));
    const parentP = obj.parentNode;
    if (answer == rightAnswer) {
        parentP.classList.add('rightCurr');
        progreso = progreso + 17;
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