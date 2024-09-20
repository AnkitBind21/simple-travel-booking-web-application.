// Sample flight data
const flights = [
    { id: 1, from: 'Delhi', to: 'Mumbai', date: '2024-10-05', airline: 'Air India', price: 5000 },
    { id: 2, from: 'Delhi', to: 'Bangalore', date: '2024-10-06', airline: 'Indigo', price: 4000 },
    { id: 3, from: 'Kolkata', to: 'Mumbai', date: '2024-10-06', airline: 'SpiceJet', price: 4500 }
];

// Flight search form submission
document.getElementById('flight-search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fromCity = document.getElementById('from').value;
    const toCity = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const budget = parseInt(document.getElementById('budget').value);

    const filteredFlights = flights.filter(flight => 
        flight.from.toLowerCase() === fromCity.toLowerCase() &&
        flight.to.toLowerCase() === toCity.toLowerCase() &&
        flight.date === date &&
        flight.price <= budget
    );

    displayFlights(filteredFlights);
});

// Display available flights
function displayFlights(flights) {
    const packageResults = document.querySelector('.package-results');
    packageResults.innerHTML = '';

    if (flights.length === 0) {
        packageResults.innerHTML = '<p>No flights found for the selected route.</p>';
        return;
    }

    flights.forEach(flight => {
        const packageItem = document.createElement('div');
        packageItem.classList.add('package-item');

        packageItem.innerHTML = `
            <div class="flight-details">
                <p><strong>${flight.airline}</strong></p>
                <p>From: ${flight.from} To: ${flight.to}</p>
                <p>Date: ${flight.date}</p>
                <p>Price: ₹${flight.price}</p>
            </div>
            <button class="book-btn" onclick="showBookingSection(${flight.id})">Book Now</button>
        `;

        packageResults.appendChild(packageItem);
    });

    document.getElementById('results-section').classList.remove('hidden');
}

// Show booking section
function showBookingSection(flightId) {
    const selectedFlight = flights.find(flight => flight.id === flightId);
    if (selectedFlight) {
        document.getElementById('booking-section').classList.remove('hidden');
        document.getElementById('booking-form').onsubmit = function (e) {
            e.preventDefault();
            bookFlight(selectedFlight);
        };
    }
}

// Book flight function
function bookFlight(flight) {
    alert(`Booking confirmed for ${flight.airline} from ${flight.from} to ${flight.to} on ${flight.date} for ₹${flight.price}.`);
    
    // Reload the page to reset everything
    location.reload();
}
