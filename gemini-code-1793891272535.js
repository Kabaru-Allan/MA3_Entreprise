async function saveBookingToLiveBackend(bookingData) {
  const response = await fetch('https://MA3_Entreprise.onrender.com/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  
  const result = await response.json();
  console.log("Saved to Database:", result);
}
