// Get current count from browser storage
let count = parseInt(localStorage.getItem('dipole-visits') || '1973');
// Increment on each visit
count++;
// Save it back
localStorage.setItem('dipole-visits', count);
// Display it
document.getElementById('visitor-count').textContent = count.toLocaleString();