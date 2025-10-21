
function normalizeKey(str) {
    return String(str)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9_]/g, "");
}

const searchIndex = {
    pisos: [],
    personajes: [],
    objetos: []
};

function initializeSearchIndex() {
    console.log("Inicializando índice de búsqueda...");

    const pisosData = {
        'basement': { nombre: "Basement", descripcion: "Primer piso del juego. Enemigos simples y ambiente doméstico." },
        'cellar': { nombre: "Cellar", descripcion: "Variante del sótano con ambiente más oscuro y húmedo." },
        'burningbasement': { nombre: "Burning Basement", descripcion: "Variante infernal del sótano con fuego y enemigos ardientes." },
        'caves': { nombre: "Caves", descripcion: "Segundo conjunto de pisos. Más enemigos voladores y peligros ambientales." },
        'catacombs': { nombre: "Catacombs", descripcion: "Variante de las cuevas con ambiente más lúgubre y esqueletos." },
        'floadedcaves': { nombre: "Flooded Caves", descripcion: "Variante acuática de las cuevas con agua y enemigos relacionados." },
        'depths': { nombre: "Depths", descripcion: "Tercer conjunto de pisos. Introduce enemigos más agresivos." },
        'necropolois': { nombre: "Necropolis", descripcion: "Variante de las profundidades con temática de necrófagos." },
        'dankdepths': { nombre: "Dank Depths", descripcion: "Variante oscura y húmeda de las profundidades." },
        'womb': { nombre: "Womb", descripcion: "El interior del cuerpo de la madre. Enemigos causan daño de corazón completo." },
        'scarredwomb': { nombre: "Scarred Womb", descripcion: "Variante más difícil del útero con enemigos más fuertes." },
        'sheol': { nombre: "Sheol", descripcion: "Piso final alternativo donde enfrentas a Satanás." },
        'cathedral': { nombre: "Cathedral", descripcion: "Piso final alternativo donde enfrentas a Isaac." },
        'chest': { nombre: "The Chest", descripcion: "Piso de final verdadero contra Blue Baby (???)." },
        'darkroom': { nombre: "The Dark Room", descripcion: "Piso de final verdadero contra The Lamb." },
        'void': { nombre: "The Void", descripcion: "Piso final donde se enfrenta a Delirium." },
        'corpse': { nombre: "Corpse", descripcion: "Piso introducido en Repentance, con ambiente grotesco y el jefe Mother." },
        'mausoleum': { nombre: "Mausoleum", descripcion: "Parte de la ruta alternativa con nuevos desafíos." },
        'gehenna': { nombre: "Gehenna", descripcion: "Variante infernal de la ruta alternativa." },
        'downpour': { nombre: "Downpour", descripcion: "Piso acuático de la ruta alternativa." },
        'dross': { nombre: "Dross", descripcion: "Variante corrupta de Downpour." },
        'ashpit': { nombre: "Ashpit", descripcion: "Piso con cenizas y fuego de la ruta alternativa." },
        'mines': { nombre: "Mines", descripcion: "Piso minero de la ruta alternativa." },
        'home': { nombre: "Home", descripcion: "La casa de Isaac, piso final especial." }
    };

    Object.keys(pisosData).forEach(key => {
        searchIndex.pisos.push({
            id: key,
            title: pisosData[key].nombre,
            description: pisosData[key].descripcion,
            url: `pisos/piso.html?piso=${key}`,
            image: `pisos/pisosimagenes/${key}.jpeg`,
            category: "pisos"
        });
    });

    if (typeof data !== 'undefined') {
        Object.keys(data).forEach(key => {
            const personaje = data[key];
            searchIndex.personajes.push({
                id: key,
                title: personaje.nombre,
                description: personaje.descripcioncorta,
                url: `personajes/personaje.html?id=${key}`,
                image: personaje.imagen,
                category: "personajes"
            });
        });
        console.log(`Cargados ${searchIndex.personajes.length} personajes`);
    } else {
        console.log("Datos de personajes no disponibles aún");
    }

    if (typeof nombres !== 'undefined') {
        Object.keys(nombres).forEach(id => {
            const nombreObjeto = nombres[id];
            const keyNormalized = normalizeKey(nombreObjeto);
            const detalles = typeof detallesObjetos !== 'undefined' ? detallesObjetos[keyNormalized] : null;
            
            searchIndex.objetos.push({
                id: id,
                title: nombreObjeto,
                description: detalles ? detalles.descripcion : "Objeto de The Binding of Isaac",
                url: `objetos/objeto.html?objeto=${id}`,
                image: `objetos/objetosimg/collectibles_${id}_${keyNormalized}.png`,
                category: "objetos"
            });
        });
        console.log(`Cargados ${searchIndex.objetos.length} objetos`);
    } else {
        console.log("Datos de objetos no disponibles aún");
    }

    console.log("Índice de búsqueda inicializado:", {
        pisos: searchIndex.pisos.length,
        personajes: searchIndex.personajes.length,
        objetos: searchIndex.objetos.length
    });
}

function checkAndInitialize() {
    const personajesReady = typeof data !== 'undefined';
    const objetosReady = typeof nombres !== 'undefined';
    
    if (personajesReady && objetosReady) {
        initializeSearchIndex();
    } else {
        console.log("Esperando datos...");
        setTimeout(checkAndInitialize, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkAndInitialize, 100);
});