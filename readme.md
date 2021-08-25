 
 
 const modificar = data.find(cor => cor.email.toLowerCase() == correo.toLowerCase())
            // console.log(modificar)
            if (nombre, correo, url == '') {
                swal.fire({
                    title: '<span class="text-white">Complete Todos los campos',
                    background: `rgba(127, 90, 240)`,
                    timer: 2500,
                    icon: 'info',
                    showConfirmButton: false
                })
            } else if (modificar == undefined) {
                guardar(nombre, correo, url)
                activo = {
                    nombre,
                    correo,
                    url
                }
                console.log(usuario);
                usuario.push(activo);
                localStorage.setItem('usuario', JSON.stringify(usuario))

                
            }else{
                if (modificar.email.toLowerCase() == correo.toLowerCase()) {
                    swal.fire({
                        title: '<span class="text-white">Este usuario ya existe',
                        text: `${correo}`,
                        background: `rgba(127, 90, 240)`,
                        timer: 2500,
                        icon: 'info',
                        showConfirmButton: false
                    })
                }
            }