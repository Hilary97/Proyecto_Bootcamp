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
    alert("Listo ya enviaste tu correo Gracias por tu aportación.")
   }
   correoIngresado(inputtext)
   
   let email = getEmaillocalStorage();
   email.push(inputtext)
   localStorage.setItem('email',JSON.stringify(email))

   
   return  
   
}
function correoIngresado (inputtext){
    const correoIngresado = document.getElementById("correoIngresado");
    const div = document.createElement("div")
    div.innerHTML = `El dato enviado ala base de datos es : ${inputtext}`
    correoIngresado.appendChild(div)
    
}
function getEmaillocalStorage(){
   const email = localStorage.getItem('email')
   
    return email ? JSON.parse(email) : [];
}
