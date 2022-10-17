// Definicion de funciones :

class ItemPedido {
  // es un OBJETO  que dentro tiene un OBJETO servicio y una cantidad
  constructor(servicio, cantidad) {
    //servicio: es cada OBJETO del json
    this.servicio = servicio;
    this.cantidad = cantidad;
  }
}

let pedido = []; // guarda cada OBJETO del tipo ItemPedido y sus cantidades

function refrescarCarrito() {
  // Muestra detalles de servicios, cantidades, subtotal-total de la compra.
  let carrito = document.getElementById("pedido"); //del modal carrito donde se guarda el contenido del carrito
  carrito.innerHTML = ""; // Borro todo el contenido que tiene dentro para actualizarlo

  let contadorcarrito = document.getElementById("contadorCarrito");
  let cant = 0;

  if (pedido.length == 0) {
    //Se renderiza esto si no hay elem en carrito
    carrito.innerHTML = "<p>Aún no se agregaron servicios</p>";
    contadorcarrito.innerText = "";
  } else {
    //For each: recorro el arreglo pedido. De cada item genero su html en el carrito
    pedido.forEach(function (item) {
      //Creo el contenido del carrito
      carrito.innerHTML += `<div class="card border-0 border-bottom mb-3 m-0">
                                <div class="row card-body">
                                    <div class="col-2">
                                        <img src="${
                                          item.servicio.imagen //Dentro de la clase ItemPedido esta el obj item servicio con sus prop.
                                        }" class="card-img-top" alt="${
        item.servicio.nombre
      }" loading="lazy">
                                    </div>
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-10">
                                                <h5 class="card-title">${
                                                  item.servicio.nombre
                                                }</h5>
                                            </div>
                                            <div class="col-2 text-end px-0 mx-0">
                                            <button id="btn-clear-${
                                              //Creo un boton con el id de cada prod guardado en itemPedido
                                              item.servicio.id
                                            }" class="btn"><i class=" fas fa-trash-alt"></i></button>
                                            </div>  
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                            <p class="card-text">x${
                                              item.cantidad
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
      cant += item.cantidad;
    });

    //recorro arreglo pedido para crear eventos. Cada item captura el btn eliminar que se creo en cada ss
    pedido.forEach(function (item) {
      let btnEliminar = document.getElementById(
        `btn-clear-${item.servicio.id}`
      ); //btn eliminar: evento click
      btnEliminar.addEventListener("click", () => {
        Swal.fire({
          title: `¿Estás seguro de quitar ${item.servicio.nombre}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarServicio(item.servicio.id); //llamo a eliminarServicio, le paso el prod a eliminar
            Swal.fire("Tu servicio fue eliminado con éxito");
          }
        });
      });
    });
    contadorcarrito.innerText = cant; //actualizamos la cantidad total de items en el carrito
  }
}

// Funcion para guardar pedido en localstorage: convierte el item en string.
//pedido es un arreglo de objeto (Carrito)

function guardarPedido(servicio, cantidad) {
  //recorro c/ item del arreglo pedido y lo guardo en la variable item
  let item = pedido.find((item) => item.servicio.id == servicio.id);
  if (item) {
    // comprueba si existe ese ss en el carrito para no repetiro, le sumo la cantidad solicita a la que habia
    item.cantidad += cantidad;
  } else {
    // si no existe el prod en el carrito(undefined) crea un nuevo objeto ItemPedido y lo guarda en carrito
    item = new ItemPedido(servicio, cantidad);
    pedido.push(item);
  }
  localStorage.setItem("pedido", JSON.stringify(pedido)); // Guardo en localstorage el arreglo de objetos pedido
  refrescarCarrito(); //llama a refrescarCarrito
}

function eliminarServicio(id) {
  //elimina ss del carrito
  pedido = pedido.filter((item) => item.servicio.id != id); //recorre arreglo pedido , si hay prod con distinto id los deja pasar y los guarda como pedido en el local
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito(); // llama  a refrescar carrito para actualizar el contenido
}

function vaciarCarrito() {
  pedido = [];
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito(); // llama  a refrescar carrito para actualizar el contenido
}

//Carga el pedido desde lo guardado en localStorage
function cargarPedido() {
  //al pedido que se guardo en localstorage en formato json lo convierto en objeto
  let pedidoJson = JSON.parse(localStorage.getItem("pedido")) ?? []; //operador nulish ??: un string vacio , cero o undefined al ser evaluado es falso. si no hay nada guardaro en el carrito cdo entro a la pagina me da false. Si inicializa en 0 me muestra no hay prod en el carrito
  for (const item of pedidoJson) {
    //for of para recorrer objetos
    pedido.push(new ItemPedido(item.servicio, item.cantidad));
  }
  refrescarCarrito(); // llama  a refrescar carrito para actualizar el contenido
}

// Bindeo botones con las funciones a través de eventos
let btnVaciar = document.getElementById(`btn-clear`); //boton vaciar carrito del modal carrito
btnVaciar.addEventListener('click', () => {
  Swal.fire({
    title: `¿Estás seguro de vaciar el presupuesto?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire("Presupuesto vaciado con éxito");
    }
  });
});

let btnFinalizar = document.getElementById(`btn-finalizar`);
btnFinalizar.addEventListener('click' , () => {
    let texto = "Hola, me gustaría solicitar un presupuesto para \n";
    pedido.forEach(function(item){
        texto += 
            item.servicio.nombre +
            "x" + 
            item.cantidad;
    });
    
    let url = "https://wa.me/2494496102?text=" + encodeURIComponent(texto); //encodeURIComponent reemplaza espacios y caracteres especiales para ser enviados por parámetro en la url.whatsapp
    window.open(url, "blank"); //abrir nueva pestaña con la url 
});

cargarPedido();

export {guardarPedido};

