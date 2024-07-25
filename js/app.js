// Variables
const carrito = document.querySelector('#carrito');
// Otra forma de escribir variables.
// listaCursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

// Listeners registrar eventos , es un buen nombre de funcion cargarEventListeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     //Prevenimos la acciòn por default que vaya a ese id
     e.preventDefault();
     // Delegation para agregar-carrito , verificar
     // Recomedable no crear funciones muy grandes 'problema'
     if(e.target.classList.contains('agregar-carrito')) {
          // parenElement para ir dònde el padre
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso html al que le dimos click y extrae la informaciòn del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }

// Some nos permite iterar y verificar si existe
     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          // Map nos crea un nuevo arreglo
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                    // Retorna el objeto actualizado
                     return curso;
                } else {
                    // Retorna el objeto que nos son duplicados
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          // getAttribute btener el atributo que se desea eliminar
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito , filter iterar
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();
     // forEach reccorrer el carrito y genera html

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          // template string
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          // row la pasamoscomo variable ,agregamos html del carrito en el tbody
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
