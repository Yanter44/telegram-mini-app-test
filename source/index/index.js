function fetchCityProducts(button) {
    const cityId = button.getAttribute('data-city-id');

    // Отправка запроса на Web API
    fetch('http://localhost:5103/api/Data/GetProductsByCity', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityId: cityId }) 
    })
    .then(response => response.json())
    .then(data => {
        // Проверка на успешный ответ
        if (data && Array.isArray(data)) {
            localStorage.setItem('cityProducts', JSON.stringify(data));
            console.log(localStorage);
            // Перенаправление на страницу только после получения данных
            window.location.href = "main.html"; 
        } else {
            console.error('Ошибка в данных');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
