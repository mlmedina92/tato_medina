import { guardarPedido } from "./pedido.js"; //guardarpedido la llama la función listarproductos:
import { getData } from "./getData.js"; //traigo los datos obtenidos de la consulta al json. get data retorna el [{},{}]

//Función que lista las cards (htlm) en el div id servicios
async function listarServicios() {
  let contenedorServicios = document.getElementById('servicios'); // del archivo servicios.hmtl

  const urlParams = new URLSearchParams(window.location.search); //busco parametros y los guardo en var.
  const categoriaParam = urlParams.get('categoria'); //traigo los parametros de categoria

  const servicios = await getData(categoriaParam); //llamo a getdata y renderiza las card del param q le paso por argumento. getData es una funcion que trae los datos de un json pero convertidos en objetos literales. getData trae datos, le paso por parametro la categoria correspondiente (el jsonName : electricos o grùas)

  //for each: recorre c/ ss. del array que trae del JSON, para crear elementos html (cards de c/ss)
  servicios.forEach((servicio) => {
    // destructucturing:p/ acceder a prop de c/ obj ss.
    let { imagen, id, nombre } = servicio;
    //+=concateno al contenido de contenerdorServicios con cada card:
    // contenedorServicios.innerHTML = contenedorServicios.innerHTML +..
    contenedorServicios.innerHTML += `<div class="col p-2 m-0">
                                        <div class="card border rounded">
                                            <img src="${imagen}" class="card-img-top" alt="${nombre}" loading="lazy">
                                            <div class="card-body">
                                                <h5 class="card-title">${nombre}</h5>
                                            </div>
                                            <div class="card-footer p-3">
                                                <div class="container p-0">
                                                    <div class="row align-items-end">
                                                        <div class="col-4 pe-0">
                                                            <label class="form-label" for="cantidad-${id}">Cant.</label>
                                                            <input class="form-control" type="number" id="cantidad-${id}" name="quantity" min="1" max="100" oninput="validity.valid||(value='');" value="1">
                                                        </div>
                                                        <div class="col-8">
                                                            <a class="btn btn-primary w-100" href="#" id="btn-agregar-${id}"><i class="fa-solid fa-cart-shopping"></i> Cotizar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
  });
  //for each para vincular eventos al htlm generado(cards). recorro cada ss
  servicios.forEach((servicio) => {
    let { id, nombre } = servicio; //destructuring objetos
    let btnAgregar = document.getElementById(`btn-agregar-${id}`); //selecciono boton de c/ card (html creado dinamicamente en este archivo)
    btnAgregar.addEventListener('click', () => {
      let cantidad = document.getElementById(`cantidad-${id}`); // el valor que el us ingresa en input
      // con c/ clik en el btn, se agrega Al carrito un nuevo objeto del tipo ItemPedido
      guardarPedido(servicio, parseInt(cantidad.value)); //Llamo a guardarPedido y la ejecito pasandole valores
      Swal.fire({//alert servicio añadido
        text: `El Servicio ${nombre} se añadió con éxito`,
        icon: "success",
        confirm: "ok",
        timer: 4000,
      });
    });
  });
}

// Llamo a listarServicios
listarServicios();