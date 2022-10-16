// Links dinamicos del nav: Consulto una ruta relativa (mediante fetch) del archivo prod.json, el cual se pasa por parámetro o llega electricos.json o gruas.json
//CONSULTO A LOS JSON PARA QUE TRAIGAN LAS CARD DE PRODUCTOS SEGUN LA CATEGORIA QUE LLEGA POR PARAM
const getData = async (jsonName) => { //promesa
    try {
        const response = await fetch('./data/'+jsonName+'.json');//Fetch: consulta link a ruta relativa. Away: espera rta de la cosulta hasta obtener un dato, sino da error. Lo que trae lo guardo en una var. Response esta en formato json ("color":"rojo")
        const data = await response.json();// convierto a response de json a un [{},{}] y lo guardo en una var. Response sigue siendo una prom entonces le agrego el await 
        return data;// si invoco la funcion retorna el [{},{}] productos con sus prop
    }
    catch (error) { // Si hay error no entra a try 
        console.log('Hubo un error' , error)
    }
}

// exporto la funcion para usar en productos.js
export { getData }