window.onload = function () {
    fetch('https://cbf4-178-173-127-190.ngrok-free.app/api/Data/GetToken', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сервер вернул ошибку: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            console.log('Токен:', data.token);
            window.location.href = '/index';
        } else {
            console.error('нет токена');
        }
    })
    .catch(error => {
        console.error('ошибка при чтении токена:', error);
    });
};
