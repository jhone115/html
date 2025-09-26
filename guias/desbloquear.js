const params = new URLSearchParams(window.location.search);
const desbloquear = params.get("id");

const data = {
    //desbloqueables
    "isaac's head":{
        nombre:"isaac's head",
        imagen:`<img src="../objetos/trinkets/trinket_054_isaacshead.png" width="20">`,
        desbloquearcon:"isaac",
        descripcioncorta:"dead friend",
        metododesbloquear:`completar <img src="../pisos/pisosimagenes/boss rush.png" width="25"> boss rush con <img src="../personajes/personajesimagenes/isaac.png" width="25"> isaac`,
        descripcionlarga:"La cabeza cortada de Isaac lo seguirá como un familiar disparando lágrimas penetrantes que infligen 3,5 de daño con cada disparo.",
        interacciones:`<img src="../objetos/activas/box of friends.png" width="25"> box of friends: no la afecta; no lo duplica <br>
        <img src="../objetos/activas/sacrifice altar.png" width="20"> lo destrulle y aparece un item como deve suceder<br>
        <img src="../objetos/activas/mom box.png" width="20"> mom's box o su forma dorada hace el daño de isaac`
    }
};

const p = data[personaje];
if (p) {
    document.getElementById("nombre").textContent = p.nombre;
    document.getElementById("imagen").src = p.imagen;
    document.getElementById("descripcioncorta").innerHTML = p.descripcioncorta;
    document.getElementById("metododesbloquear").innerHTML = p.metododesbloquear
    document.getElementById("descripcionlarga").innerHTML = p.descripcionlarga;

    document.title = `${p.nombre} | The Isaac Wiki`;
} else {
    document.body.innerHTML = "<h1>desbloqueable no encontrado</h1>";
    document.title = "desbloqueable no encontrado";
}
