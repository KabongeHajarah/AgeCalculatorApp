document.getElementById('ageForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var dayInput = document.getElementById('day');
  var monthInput = document.getElementById('month');
  var yearInput = document.getElementById('year');

  var day = parseInt(dayInput.value, 10);
  var month = parseInt(monthInput.value, 10);
  var year = parseInt(yearInput.value, 10);

  clearErrorMessages();

  if (!day || !month || !year) {
    displayErrorMessage('All fields are required.');
    return;
  }

  if (day < 1 || day > 31) {
    displayErrorMessage('Invalid day. Please enter a day between 1 and 31.');
    return;
  }

  if (month < 1 || month > 12) {
    displayErrorMessage('Invalid month. Please enter a month between 1 and 12.');
    return;
  }

  var currentDate = new Date();
  var selectedDate = new Date(year, month - 1, day);

  if (selectedDate > currentDate) {
    displayErrorMessage('Invalid year. Please enter a year in the past.');
    return;
  }

  if (selectedDate.getDate() !== day || selectedDate.getMonth() + 1 !== month || selectedDate.getFullYear() !== year) {
    displayErrorMessage('Invalid date. Please enter a valid date.');
    return;
  }

  var age = calculateAge(selectedDate, currentDate);

  document.getElementById('years').textContent = age.years;
  document.getElementById('months').textContent = age.months;
  document.getElementById('days').textContent = age.days;

  document.getElementById('result').style.display = 'block';
});

function calculateAge(selectedDate, currentDate) {
  var years = currentDate.getFullYear() - selectedDate.getFullYear();
  var months = currentDate.getMonth() - selectedDate.getMonth();
  var days = currentDate.getDate() - selectedDate.getDate();

  if (months < 0 || (months === 0 && currentDate.getDate() < selectedDate.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }

  return { years: years, months: months, days: days };
}

function displayErrorMessage(message) {
  var errorContainer = document.getElementById('error');
  errorContainer.textContent = message;
}

function clearErrorMessages() {
  var errorContainer = document.getElementById('error');
  errorContainer.textContent = '';
}

  