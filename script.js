function enviar(){
    let inputtext = document.getElementById('inputtext').value
    const datosIngresados = inputtext
    console.log(datosIngresados)
    if (inputtext === ''){
        alert('No has ingresado tu correo')
    }
    else{alert('Listo tu correo ha sido enviado Gracias!!')
    }
   
    return location.reload();
}
