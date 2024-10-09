document.addEventListener('DOMContentLoaded', function () {
    // Potenziale funzione per caricare eventi tramite API
    fetch('https://api.eventi.com/upcoming')
        .then(response => response.json())
        .then(data => {
            // Inserisci dinamicamente gli eventi nella pagina
            console.log(data);
        })
        .catch(error => console.error('Errore nel caricamento degli eventi:', error));
});
