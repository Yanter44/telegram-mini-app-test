window.onload = function () {
    // Проверка наличия Telegram WebApp
    if (Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        // Получаем необработанные данные initData через WebApp
        const initData = Telegram.WebApp.initData;
        // Получаем необработанные данные из SDK, если доступно
        const { initDataRaw } = retrieveLaunchParams();  // Это извлекает initDataRaw из SDK

        // Логируем данные
        console.log('InitData:', initData);
        console.log('InitDataRaw:', initDataRaw);  // Логируем необработанные данные

        // Проверка наличия данных о пользователе
        if (Telegram.WebApp.initDataUnsafe.user) {
            const telegramId = Telegram.WebApp.initDataUnsafe.user.id;  // ID пользователя
            const username = Telegram.WebApp.initDataUnsafe.user.username;  // Имя пользователя

            console.log('TelegramId:', telegramId);
            console.log('Username:', username);

            // Подготовка данных для запроса
            const requestData = {
                initData: initDataRaw,  // Отправляем initData
                username: username,
                telegramId: telegramId.toString()
            };

            // Отправляем POST запрос на сервер
            fetch('https://eb55-45-32-144-56.ngrok-free.app/api/Data/TelegramAuth', {
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
                    // Сохраняем токен в localStorage
                    localStorage.setItem('authToken', data.token);
                    // Перенаправляем на другую страницу
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
