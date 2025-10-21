
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando pisos.js');

    const pisoLinks = document.querySelectorAll('.piso-link');
    console.log(`Encontrados ${pisoLinks.length} enlaces de pisos`);
    
    pisoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const pisoNombre = this.getAttribute('data-piso');
            console.log(`Clic en piso: ${pisoNombre}`);

            window.location.href = `piso.html?piso=${pisoNombre}`;
        });
    });

    if (window.location.pathname.includes('piso.html')) {
        console.log('Estamos en piso.html - procesando parámetros');
        procesarPisoSeleccionado();
    }
});

function procesarPisoSeleccionado() {

    const urlParams = new URLSearchParams(window.location.search);
    const pisoNombre = urlParams.get('piso');
    
    console.log(`Piso seleccionado: ${pisoNombre}`);
    
    if (pisoNombre) {

        document.title = `the isaac of wiki/${pisoNombre}`;

        actualizarFondo(pisoNombre);

        actualizarContenidoPiso(pisoNombre);
    } else {
        console.log('No se encontró parámetro de piso en la URL');
    }
}

function actualizarFondo(pisoNombre) {
    const fondosPisos = {
        'basement': '../pisos/pisosimagenes/basement.jpeg',
        'cellar': '../pisos/pisosimagenes/cellar.jpeg',
        'burningbasement': '../pisos/pisosimagenes/burningbasement.jpeg',
        'caves': '../pisos/pisosimagenes/caves.jpeg',
        'catacombs': '../pisos/pisosimagenes/catacombs.jpeg',
        'floadedcaves': '../pisos/pisosimagenes/floadedcaves.jpeg',
        'depths': '../pisos/pisosimagenes/depths.jpeg',
        'necropolois': '../pisos/pisosimagenes/necropolois.jpeg',
        'dankdepths': '../pisos/pisosimagenes/dankdepths.jpeg',
        'womb': '../pisos/pisosimagenes/womb.jpeg',
        'scarredwomb': '../pisos/pisosimagenes/scarredwomb.jpeg',
        'sheol': '../pisos/pisosimagenes/sheol.jpeg',
        'cathedral': '../pisos/pisosimagenes/cathedral.jpeg',
        'chest': '../pisos/pisosimagenes/chest.jpeg',
        'darkroom': '../pisos/pisosimagenes/darkroom.jpeg',
        'void': '../pisos/pisosimagenes/void.jpeg',
        'corpse': '../pisos/pisosimagenes/corpse.jpeg',
        'mausoleum': '../pisos/pisosimagenes/mausoleum.jpeg',
        'gehenna': '../pisos/pisosimagenes/gehenna.jpeg',
        'downpour': '../pisos/pisosimagenes/Downpour.jpeg',
        'dross': '../pisos/pisosimagenes/dross.jpeg',
        'ashpit': '../pisos/pisosimagenes/ashpit.jpeg',
        'mines': '../pisos/pisosimagenes/mines.jpeg',
        'home': '../pisos/pisosimagenes/home.jpeg'
    };

    const rutaCompleta = fondosPisos[pisoNombre];
    
    if (rutaCompleta) {
        console.log(`Intentando cargar fondo: ${rutaCompleta}`);

        const img = new Image();
        img.onload = function() {
            document.body.style.backgroundImage = `url('${rutaCompleta}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            console.log(`Fondo aplicado correctamente: ${rutaCompleta}`);
        };
        img.onerror = function() {
            console.error(`No se pudo cargar la imagen: ${rutaCompleta}`);
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            document.body.style.backgroundAttachment = 'fixed';
        };
        img.src = rutaCompleta;
    } else {
        console.warn(`No se encontró mapeo para el piso: ${pisoNombre}`);
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        document.body.style.backgroundAttachment = 'fixed';
    }
}

function actualizarContenidoPiso(pisoNombre) {
    const tituloPiso = document.querySelector('h1');
    if (tituloPiso) {
        tituloPiso.textContent = pisoNombre.toUpperCase();
        tituloPiso.style.textAlign = 'center';
    }

    const contenedorInfo = document.getElementById('piso-info');
    if (contenedorInfo) {
        contenedorInfo.innerHTML = '';

        const contenido = `
            <h1 style="text-align: center;"><b>${pisoNombre.toUpperCase()}</b></h1>
            <div class="piso-details">
                <h2>Información del Piso</h2>
                <p>Esta es la página para <strong>${pisoNombre}</strong>. Aquí puedes encontrar información detallada sobre este piso.</p>
                
                <h3>Características:</h3>
                <ul>
                    <li>Enemigos característicos</li>
                    <li>Jefes que aparecen</li>
                    <li>Objetos especiales</li>
                    <li>Salas secretas</li>
                </ul>
                
                <h3>Estrategias:</h3>
                <p>Consejos para superar este piso...</p>
            </div>
        `;
        
        contenedorInfo.innerHTML = contenido;
    }
}