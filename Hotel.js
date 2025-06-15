document.getElementById('calculateBtn').addEventListener('click', calculateCost);

function calculateCost() {
  // Rates
  const rates = {
    delux: 2000,   
    suite: 3500,    
    ac: 500,        
    locker: 100,    
    extraPersonCharge: 1000 
  };

  // Get form values
  const name = document.getElementById('name').value.trim();
  const checkin = document.getElementById('checkin').value;
  const totalDays = parseInt(document.getElementById('totalDays').value, 10);
  const totalPersons = parseInt(document.getElementById('totalPersons').value, 10) || 1;
  const advanceAmount = parseFloat(document.getElementById('advanceAmount').value);
  const roomType = document.getElementById('roomType').value;

  const acChecked = document.getElementById('ac').checked;
  const lockerChecked = document.getElementById('locker').checked;

  // Validation
  if (!name) {
    alert('Customer Name is mandatory.');
    return;
  }
  if (!checkin) {
    alert('Check-in Date is mandatory.');
    return;
  }
  if (!totalDays || totalDays < 1) {
    alert('Total Days must be at least 1.');
    return;
  }
  if (isNaN(advanceAmount) || advanceAmount < 0) {
    alert('Advance Amount is mandatory and must be 0 or more.');
    return;
  }

  // Calculate room cost
  let roomRatePerDay = (roomType === 'delux') ? rates.delux : rates.suite;
  let roomCost = roomRatePerDay * totalDays;

  // Calculate amenities cost
  let amenitiesCost = 0;
  if (acChecked) amenitiesCost += rates.ac * totalDays;
  if (lockerChecked) amenitiesCost += rates.locker * totalDays;

  // Extra person charges (beyond 1 person)
  let extraPersons = totalPersons > 1 ? totalPersons - 1 : 0;
  let extraPersonCost = extraPersons * rates.extraPersonCharge * totalDays;

  // Total cost
  let totalCost = roomCost + amenitiesCost + extraPersonCost;

  // Balance calculation
  let balance = totalCost - advanceAmount;
  if (balance < 0) balance = 0;

  // Display results
  document.getElementById('totalCost').value = totalCost.toFixed(2);
  document.getElementById('balance').value = balance.toFixed(2);
}

// Optional: prevent form submission to avoid page reload
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Form submitted successfully!');
});
