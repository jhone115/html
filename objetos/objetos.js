const tabla = document.getElementById("contenedor-detalle");

objetos.forEach(num => {
  const key = nombres[num]; // ej. "thesadonion"
  const detalle = detallesObjetos[key];
  const id = `collectibles_${num}_${key}`;

  const fila = document.createElement("tr");

  // Nombre con enlace
  const celdaNombre = document.createElement("td");
  const enlaceNombre = document.createElement("a");
  enlaceNombre.href = `objeto.html?id=${id}`;
  enlaceNombre.textContent = detalle ? detalle.nombre : key;
  enlaceNombre.style.textDecoration = "none";
  enlaceNombre.style.color = "inherit";
  celdaNombre.appendChild(enlaceNombre);
  fila.appendChild(celdaNombre);

  // ID
  const celdaID = document.createElement("td");
  celdaID.textContent = num;
  fila.appendChild(celdaID);

  // Imagen con enlace
  const celdaIcono = document.createElement("td");
  const enlaceIcono = document.createElement("a");
  enlaceIcono.href = `objeto.html?id=${id}`;
  const img = document.createElement("img");
  img.src = `objetosimg/${id}.png`;
  img.alt = key;
  img.style.width = "40px";
  img.style.height = "40px";
  enlaceIcono.appendChild(img);
  celdaIcono.appendChild(enlaceIcono);
  fila.appendChild(celdaIcono);

  // Descripción breve
  const celdaDescripcion = document.createElement("td");
  celdaDescripcion.textContent = detalle ? detalle.descripcion : "Sin descripción aún.";
  fila.appendChild(celdaDescripcion);

  tabla.appendChild(fila);
});
