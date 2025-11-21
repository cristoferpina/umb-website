// Control accesible del reproductor del himno institucional

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audioHimno');
    if (!audio) return;

    const btnPlay = document.getElementById('btnPlay');
    const btnPause = document.getElementById('btnPause');
    const estado = document.getElementById('estadoHimno');

    const updateEstado = (text) => estado && (estado.textContent = text);

    btnPlay?.addEventListener('click', () => {
        audio.play()
            .then(() => {
                btnPlay.disabled = true;
                btnPause.disabled = false;
                updateEstado('Reproduciendo');
            })
            .catch(() => updateEstado('Error al reproducir'));
    });

    btnPause?.addEventListener('click', () => {
        audio.pause();
        btnPlay.disabled = false;
        btnPause.disabled = true;
        updateEstado('Pausado');
    });

    audio.addEventListener('ended', () => {
        btnPlay.disabled = false;
        btnPause.disabled = true;
        updateEstado('Finalizado');
    });

    audio.addEventListener('loadeddata', () => updateEstado('Listo para reproducir'));
    audio.addEventListener('waiting', () => updateEstado('Cargando...'));

    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            const progreso = (audio.currentTime / audio.duration) * 100;
            estado.setAttribute('data-progreso', progreso.toFixed(0) + '%');
        }
    });
});
