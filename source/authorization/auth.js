window.onload = function () {
    if (Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        const initData = Telegram.WebApp.initDataUnsafe;  // Используйте initDataUnsafe
        const initDataSignature = Telegram.WebApp.initDataSignature;

        if (initData.user) {  // Проверяем, что данные о пользователе существуют
            const telegramId = initData.user.id;  // ID пользователя
            const username = initData.user.username;  // Имя пользователя

            console.log('InitData:', initData);
            console.log('InitDataSignature:', initDataSignature);
            console.log('TelegramId:', telegramId);
            console.log('Username:', username);

            // Подготовим данные для отправки на сервер
         const requestData = {
    initData: JSON.stringify(initData),  // Преобразуем объект в строку
    initDataSignature: initDataSignature,
    username: username,
    telegramId: telegramId.toString()  // Преобразуем ID в строку
};


            // Отправка запроса на сервер
            fetch('https://fa71-194-31-168-146.ngrok-free.app/api/Data/TelegramAuth', {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())  // Преобразуем ответ в JSON
            .then(data => {
                if (data.token) {
                    console.log('Получен токен:', data.token);
                    localStorage.setItem('authToken', data.token);  // Сохраняем токен в localStorage
                    window.location.href = '/firstpage.html';  // Перенаправляем на страницу
                } else {
                    console.error('Ошибка авторизации:', data.error);  // Логируем ошибку, если токен не получен
                }
            })
            .catch(error => {
                console.error('Ошибка при запросе авторизации:', error);  // Логируем ошибки запроса
            });
        } else {
            console.error('Нет данных о пользователе');  // Если нет данных о пользователе
        }
    } else {
        console.error('Telegram WebApp не инициализирован');  // Если Telegram WebApp не инициализирован
    }
};
