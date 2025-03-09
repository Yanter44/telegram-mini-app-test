
function fetchCityProducts(button) {
    const cityId = button.getAttribute('data-city-id');
  fetch('https://72b3-45-32-144-56.ngrok-free.app/api/Products/GetProductsByCity', {
        method: 'POST', 
        headers: {
            'Authorization': localStorage.getItem('authToken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityId: cityId }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data)) {
            localStorage.setItem('cityProducts', JSON.stringify(data));
            window.location.href = '/main.html';                
        } else {
            console.error('Ошибка в данных');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
    });
}
