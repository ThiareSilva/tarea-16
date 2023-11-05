const moneditas = document.getElementById("moneditas");
const desplegable = document.getElementById("desplegable");
const btnBuscar = document.getElementById("btnBuscar");
const resultadoFinal = document.getElementById("resultadoFinal");

async function monedas() {
  try {
    const apiMonedas = await fetch("https://mindicador.cl/api/");
    const apiJson = await apiMonedas.json();

    console.log(apiJson);

    Object.keys(apiJson).forEach((key) => {
      if (key !== "version" && key !== "autor" && key !== "fecha") {
        const opt = document.createElement("option");
        opt.id = apiJson[key].codigo;
        opt.value = apiJson[key].valor;
        opt.innerHTML = apiJson[key].nombre;
        desplegable.appendChild(opt);
      }
    });
    return apiJson;
  } catch (e) {
    console.log(e);
  }
}

function convertirMoneda(){


    const indiceDeOptionElegidaEnMenuDesplegable = desplegable.selectedIndex;
    const optionCompletoSeleccionadoEnElMenuDesplegable = desplegable.options[indiceDeOptionElegidaEnMenuDesplegable];
    const valorMonedaSeleccionada = optionCompletoSeleccionadoEnElMenuDesplegable.value;
    resultadoFinal.innerHTML = (Number(moneditas.value) / Number(valorMonedaSeleccionada)).toString();
}
monedas();
