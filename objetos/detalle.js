const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // Ej: collectibles_1_TheSadOnion

const regex = /^collectibles_(\d+)_(.+)$/;
const match = id ? id.match(regex) : null;

const numero = match ? match[1] : "";
const nombre = match ? match[2] : "";
const key = normalizeKey(nombre);

const detalle = document.getElementById("detalle");
const data = detallesObjetos[key];

if (!data) {
  detalle.innerHTML = `<p>Objeto no encontrado.</p>`;
} else {
  detalle.innerHTML = `
    <h1>${data.nombre} (#${numero})</h1>
    <img src="objetosimg/${id}.png" alt="${data.nombre}">
    <p><strong>Descripción:</strong> ${data.descripcion}</p>
    <p><strong>Tipo:</strong> ${data.tipo}</p>
    <p><strong>Efecto:</strong> ${data.efecto}</p>
    <p><strong>Desbloqueo:</strong> ${data.unlock}</p>
  `;
}
