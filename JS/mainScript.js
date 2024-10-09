document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '1poNa0wzCJ3qoAWAwmywQaOJO9c92uic'; // La tua Consumer Key
    const eventContainer = document.querySelector('.event-list');
    const searchInput = document.getElementById('search');

    // Funzione per caricare gli eventi
    function loadEvents(searchTerm = '') {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${apiKey}&keyword=${encodeURIComponent(searchTerm)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella rete o nella richiesta.');
                }
                return response.json();
            })
            .then(data => {
                // Controlla se ci sono eventi
                if (data._embedded && data._embedded.events) {
                    displayEvents(data._embedded.events);
                } else {
                    eventContainer.innerHTML = '<p>Nessun evento trovato.</p>';
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento degli eventi:', error);
                eventContainer.innerHTML = '<p>Si è verificato un errore nel caricamento degli eventi. Riprova più tardi.</p>';
            });
    }

    // Funzione per visualizzare gli eventi
    function displayEvents(events) {
        eventContainer.innerHTML = ''; // Pulisci la lista degli eventi
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event-item');
            
            // Ottieni l'immagine dell'evento (usa un'immagine di fallback se non disponibile)
            const imageUrl = event.images && event.images.length > 0 
                ? event.images[0].url 
                : 'https://via.placeholder.com/300x200?text=Immagine+non+disponibile';

            // Formatta la data dell'evento
            const eventDate = event.dates && event.dates.start && event.dates.start.localDate
                ? new Date(event.dates.start.localDate).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })
                : 'Data non disponibile';

            // Ottieni il nome della location (usa un valore di fallback se non disponibile)
            const venueName = event._embedded && event._embedded.venues && event._embedded.venues[0]
                ? event._embedded.venues[0].name
                : 'Location non disponibile';

            eventElement.innerHTML = `
                <div class="event-image">
                    <img src="${imageUrl}" alt="${event.name}">
                </div>
                <div class="event-info">
                    <h3>${event.name}</h3>
                    <p><strong>Data:</strong> ${eventDate}</p>
                    <p><strong>Location:</strong> ${venueName}</p>
                    <a href="${event.url}" class="btn" target="_blank">Dettagli</a>
                </div>
            `;
            eventContainer.appendChild(eventElement);
        });
    }

    // Carica gli eventi imminenti all'avvio
    loadEvents();

    // Aggiungi evento di ascolto per la barra di ricerca
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value;
        loadEvents(searchTerm); // Carica eventi in base al termine di ricerca
    });
});