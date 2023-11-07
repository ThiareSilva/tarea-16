const moneditas = document.getElementById("moneditas");
const desplegable = document.getElementById("desplegable");
const btnBuscar = document.getElementById("btnBuscar");
const resultadoFinal = document.getElementById("resultadoFinal");

const ctx = document.getElementById("myChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    width: "100%",
    height: "100%"
  },
});

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
    resultadoFinal.innerHTML = e;
  }
}

async function obtenerHistorialMoneda() {
  const codigoMonedaSeleccionada =
    desplegable.options[desplegable.selectedIndex].id;
  try {
    const res = await fetch(
      `https://mindicador.cl/api/${codigoMonedaSeleccionada}`
    );
    const historialMoneda = await res.json();

    const labels = historialMoneda.serie.map((element) => {
      return element.fecha;
    });

    const data = historialMoneda.serie.map((element) => {
      return element.valor;
    });

    const datasets = [
      {
        label:
        desplegable.options[desplegable.selectedIndex]
            .innerHTML,
        borderColor: "black",
        data,
      },
    ];

    // Update the chart's data
    chart.data.labels = labels;
    chart.data.datasets = datasets;

    // Update the chart
    chart.update();
  } catch (e) {
    console.log(e.error);
  }
}

function convertirMoneda() {
  const indiceDeOptionElegidaEnMenuDesplegable = desplegable.selectedIndex;
  const optionCompletoSeleccionadoEnElMenuDesplegable =
    desplegable.options[indiceDeOptionElegidaEnMenuDesplegable];
  const valorMonedaSeleccionada =
    optionCompletoSeleccionadoEnElMenuDesplegable.value;
  resultadoFinal.innerHTML = (
    Number(moneditas.value) / Number(valorMonedaSeleccionada)
  ).toString();
  obtenerHistorialMoneda();
}
monedas();
