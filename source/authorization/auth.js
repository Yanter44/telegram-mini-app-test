window.onload = function () {
        const initData = Telegram.WebApp.initData;
        const initDataSignature = Telegram.WebApp.initDataSignature;
        
        // Получаем информацию о пользователе (например, TelegramId, Username)
        const telegramId = Telegram.WebApp.initDataUnsafe.user.id; // ID пользователя
        const username = Telegram.WebApp.initDataUnsafe.user.username; // Имя пользователя

        console.log('InitData:', initData);
        console.log('InitDataSignature:', initDataSignature);
        console.log('TelegramId:', telegramId);
        console.log('Username:', username);

        // Формируем объект для отправки на сервер
        const requestData = {
            initData: initData,
            initDataSignature: initDataSignature,
            username: username,
            telegramId: telegramId
        };

        fetch('https://1f2b-178-173-127-190.ngrok-free.app/api/Data/TelegramAuth' {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': 'true' 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
         .then(response => response.json())
        .then(data => {
            if (data.token) {
                console.log('Получен токен:', data.token);
                // Сохраняем токен, перенаправляем на другую страницу, или выполняем другие действия
                localStorage.setItem('authToken', data.token);
                window.location.href = '/firstpage'; // или другая страница
            } else {
                console.error('Ошибка авторизации:', data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе авторизации:', error);
        });
};



