function enviar(){
    let inputtext = document.getElementById('inputtext').value
    const datosIngresados = inputtext
    console.log(datosIngresados)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (inputtext === ''){
        alert('No has ingresado tu correo')
    }
   else if (!emailPattern.test(inputtext)) {
    alert("Por favor, introduce un correo electrónico válido.");
    
   }
   else{
    alert("Listo ya enviaste tu correo seras ‼️hackeado‼️ en los proximos 10seg💢!!")
   }
   
   return location.reload()
   
}
