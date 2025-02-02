document.addEventListener("DOMContentLoaded", async function() {
    const initData = window.Telegram.WebApp.initData; // Получаем данные Telegram
    const initDataSignature = window.Telegram.WebApp.initDataSignature; // Получаем подпись данных

    if (!initData || !initDataSignature) {
        console.error("Ошибка: initData или initDataSignature не найдены!");
        return;
    }

 

    // Отправляем данные на сервер для проверки
    const response = await fetch('http://localhost:5103/api/Data/telegram-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            initData: initData,
            initDataSignature: initDataSignature,
            username: userData.username,  // Дополнительные данные о пользователе
            telegramId: userData.id
        })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Перенаправляем на нужную страницу после успешной авторизации
    } else {
        console.error("Ошибка авторизации:", data.error);
    }
});

