
let urlUsuario = ('http://localhost:4000/usuarios')

let incribirse = document.getElementById('incribirse');
let usuario = []

incribirse.addEventListener('click', async () => {
    let resp = await fetch(urlUsuario)
    let data = await resp.json();

    Swal.fire({
        title: '<span class="text-white">Registrate',
        background: `rgba(127, 90, 240)`,
        html:   '<input id="swal-input1" class="swal2-input" placeholder="Nombre y Apellido" type="text">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Correo Electrónico" type="email">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Dirrecion Url (Avatar)" type="text">',
        confirmButtonText: '<span class="text-dark">Registrar'
    }).then((result) => {
        if (result.isConfirmed) {
            let nombre = document.getElementById('swal-input1').value;
            let email = document.getElementById('swal-input2').value;
            let url = document.getElementById('swal-input3').value;


            if (nombre, email, url != '') {

                let modificar = data.find(correo => correo.email.toLowerCase() == email.toLowerCase())

                if (modificar != undefined) {
                    if (modificar.email.toLowerCase() == email.toLowerCase()) {
                        Swal.fire({
                            title: '<span class="text-white">Este usuario ya existe',
                            text: `${email}`,
                            background: `rgba(127, 90, 240)`,
                            timer: 2500,
                            icon: 'info',
                            showConfirmButton: false
                        })
                    }
                } else {
                    guardar(nombre, email, url)
                    location.reload('./index.html');
                    const activo = {
                        nombre: nombre,
                        email: email,
                        imag: url
                    }
                    usuario.push(activo);
                    localStorage.setItem('usuario', JSON.stringify(usuario))
                }

            }else{
                Swal.fire({
                    title: '<span class="text-white">Complete Todos los campos',
                    background: `rgba(127, 90, 240)`,
                    timer: 2500,
                    icon: 'info',
                    showConfirmButton: false
                })
            }
        }
    })
})
async function guardar(nombre, email, url) {
    let resp = await fetch(urlUsuario, {
        method: 'POST',
        body: JSON.stringify({
            nombre,
            email,
            url
        }),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    })
    console.log(resp)
}