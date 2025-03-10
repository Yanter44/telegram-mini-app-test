window.onload = function () {
    if (Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        const initData = Telegram.WebApp.initData;
        const initDataSignature = Telegram.WebApp.initDataSignature;

        if (Telegram.WebApp.initDataUnsafe.user) {
            const telegramId = Telegram.WebApp.initDataUnsafe.user.id; // ID пользователя
            const username = Telegram.WebApp.initDataUnsafe.user.username; // Имя пользователя

            console.log('InitData:', initData);
            console.log('InitDataSignature:', initDataSignature);
            console.log('TelegramId:', telegramId);
            console.log('Username:', username);
                  
            const requestData = {
                initData: initData,           
                username: username,
                telegramId: telegramId.toString()
            };

            fetch('https://72b3-45-32-144-56.ngrok-free.app/api/Authentication/TelegramAuth', {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    console.log('Получен токен:', data.token);
                  
                    localStorage.setItem('authToken', data.token);
                    window.location.href = '/firstpage.html'; 
                } else {
                    console.error('Ошибка авторизации:', data.error);
                }
            })
            .catch(error => {
                console.error('Ошибка при запросе авторизации:', error);
            });
        } else {
            console.error('Нет данных о пользователе');
        }
    } else {
        console.error('Telegram WebApp не инициализирован');
    }
};
