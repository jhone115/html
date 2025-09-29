const params = new URLSearchParams(window.location.search);
const personaje = params.get("id");

const data = {
    "isaac": {
        nombre: "Isaac",
        imagen: "personajesimagenes/isaac.png",
        vida: [
            {tipo: "rojo", cantidad: 3} 
        ],
        daño: 3.50,          
        lagrimas: 2.73,       
        vellagrimas: 1.00,  
        rango: 6.50,         
        velocidad: 1.00,    
        suerte: 0.00,         
        descripcioncorta: "El personaje inicial y más equilibrado.",
        consumibles:[{tipo:"bomba", cantidad:1}],
        objetos:"collectibles_105_dice",
        descripcionlarga: `Isaac es el primer personaje jugable y el más básico de todos. Empieza con 3 corazones rojos y sin ítems pasivos. 
        Su diseño está pensado para ser un punto medio en todas las estadísticas, sin ventajas ni desventajas destacables. 
        Es ideal para principiantes, ya que no tiene mecánicas complejas.<br>Isaac empieza con tres contenedores de Corazón Rojo y una 
        <img src="../objetos/consumibles/bomba.png" width="20">Bomba. 
        También empezará con el <img src="../objetos/objetosimg/collectibles_105_dice.png" width="20">D6 una vez desbloqueado 
        (tras derrotar a <img src="../jefes/jefesimg/isaac boss.png" width="25"> Isaac como <img src="personajesimagenes/blue baby.png" width="20"> ???).`
    },
    "Tainted isaac": {
        nombre: "Tainted Isaac",
        imagen: "personajesimagenes/t isaac.png",
        vida: [
            {tipo: "rojo", cantidad: 3}
        ],
        daño: 3.50,
        lagrimas: 2.73,
        vellagrimas: 1.00,
        rango: 6.50,
        velocidad: 1.00,
        suerte: 0,
        consumibles:[{tipo:"bomba", cantidad:1}],
        objetos:"",
        descripcioncorta: "La versión corrompida de Isaac.",
        descripcionlarga: "Tainted Isaac solo puede llevar hasta 8 ítems pasivos a la vez. Cada vez que recoge uno nuevo, debe reemplazar uno de los anteriores. Esta mecánica lo hace muy flexible y estratégico, pero también arriesgado, ya que el jugador debe decidir constantemente qué conservar y qué descartar."
    }
    // ... más personajes
};

const p = data[personaje];
if (p) {
    let corazones = "";
    p.vida.forEach(obj => {
        for (let i = 0; i < obj.cantidad; i++) {
            corazones += `<img src="../objetos/consumibles/corazon ${obj.tipo}.png" width="20">`;
        }
    });
    let objetos = "";
    p.consumibles.forEach(obje => {
        objetos += `<img src="../objetos/consumibles/${obje.tipo}.png" width="20"> ${obje.cantidad} `;
    });

    document.getElementById("nombre").textContent = p.nombre;
    document.getElementById("imagen").src = p.imagen;
    document.getElementById("descripcioncorta").innerHTML = `
    <table>
        <tr><td colspan="2">${p.descripcioncorta}</td></tr>
        <tr><td colspan="2">stats</td></tr>
        <tr>
            <td><img src="../objetos/consumibles/corazon vacio.png" width="20"> Vida<br> ${corazones}</td>
            <td><img src="../personajes/statsimg/daño.png" width="20"> Daño <br>${p.daño}</td>
        </tr>
        <tr>
            <td><img src="../personajes/statsimg/lagrimas.png" width="20"> Lágrimas <br>${p.lagrimas}</td>
            <td><img src="../personajes/statsimg/vel lagrima.png" width="20"> Vel. Lágrimas <br>${p.vellagrimas}</td>
        </tr>
        <tr>
            <td><img src="../personajes/statsimg/rango.png" width="20"> Rango <br>${p.rango}</td>
            <td><img src="../personajes/statsimg/velocidad.png" width="20"> Velocidad<br>${p.velocidad}</td>
        </tr>
        <tr>
            <td colspan="2"><img src="../personajes/statsimg/suerte.png" width="20"> Suerte ${p.suerte}</td>
        </tr>
        <tr>
        <td colspan="2">items iniciales</td>
        </tr>
        <tr>
        <td> ${objetos}</td>
        <td><img src="../objetos/objetosimg/${p.objetos}.png" width="20"></td>
        </tr>
    </table>`;
    document.getElementById("descripcionlarga").innerHTML = p.descripcionlarga;

    document.title = `${p.nombre} | The Isaac Wiki`;
} else {
    document.body.innerHTML = "<h1>Personaje no encontrado</h1>";
    document.title = "Personaje no encontrado";
}
