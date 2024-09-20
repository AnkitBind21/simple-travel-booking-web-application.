// Sample flight data (mock API data for testing)
const flights = [
    { id: 1, from: 'Delhi', to: 'Mumbai', date: '2024-10-05', airline: 'Air India', price: 5000 },
    { id: 2, from: 'Delhi', to: 'Bangalore', date: '2024-10-06', airline: 'Indigo', price: 4000 },
    { id: 3, from: 'Kolkata', to: 'Mumbai', date: '2024-10-06', airline: 'SpiceJet', price: 4500 },
    { id: 4, from: 'Delhi', to: 'Chennai', date: '2024-10-07', airline: 'Vistara', price: 6000 },
    { id: 5, from: 'Mumbai', to: 'Delhi', date: '2024-10-06', airline: 'GoAir', price: 3500 }
];

// Flight search form submission
document.getElementById('flight-search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page refresh

    const fromCity = document.getElementById('from').value;
    const toCity = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const maxBudget = parseInt(document.getElementById('budget').value);

    // Filter flights based on search criteria
    const filteredFlights = flights.filter(flight => 
        flight.from.toLowerCase() === fromCity.toLowerCase() &&
        flight.to.toLowerCase() === toCity.toLowerCase() &&
        flight.date === date &&
        flight.price <= maxBudget
    );

    // Display the filtered flights
    displayFlights(filteredFlights);
});

// Display available flights
function displayFlights(flights) {
    const flightList = document.querySelector('.package-results');
    flightList.innerHTML = ''; // Clear previous results

    if (flights.length === 0) {
        flightList.innerHTML = '<p>No flights found for the selected route and budget.</p>';
        return;
    }

    // Iterate through flights and display them
    flights.forEach(flight => {
        const flightItem = document.createElement('div');
        flightItem.classList.add('flight-item');

        flightItem.innerHTML = `
            <div class="flight-details">
                <p><strong>${flight.airline}</strong></p>
                <p>From: ${flight.from} To: ${flight.to}</p>
                <p>Date: ${flight.date}</p>
            </div>
            <div class="flight-price">${flight.price} ₹</div>
            <button class="book-btn" onclick="showBookingSection(${flight.id})">Book Now</button>
        `;

        flightList.appendChild(flightItem);
    });

    // Make the results section visible
    document.getElementById('results-section').classList.remove('hidden');
}

// Show booking section when a user clicks "Book Now"
function showBookingSection(flightId) {
    const selectedFlight = flights.find(flight => flight.id === flightId);
    if (selectedFlight) {
        const selectedPackageDiv = document.getElementById('selected-package');
        selectedPackageDiv.innerHTML = `
            <h3>Selected Flight</h3>
            <p><strong>${selectedFlight.airline}</strong></p>
            <p>From: ${selectedFlight.from} To: ${selectedFlight.to}</p>
            <p>Date: ${selectedFlight.date}</p>
            <p>Price: ₹${selectedFlight.price}</p>
        `;
        document.getElementById('booking-section').classList.remove('hidden');

        // Handle form submission for booking
        document.getElementById('booking-form').onsubmit = function (e) {
            e.preventDefault();
            bookFlight(selectedFlight);
        };
    }
}

// Book flight function
function bookFlight(flight) {
    alert(`Booking confirmed for ${flight.airline} from ${flight.from} to ${flight.to} on ${flight.date} for ₹${flight.price}.`);
    
    // Optionally, you could reload the page to reset the form and hide the booking section
    location.reload();
}
