document.addEventListener('DOMContentLoaded', function () {
    // Функция для извлечения параметров из URL
    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const initData = urlParams.get('initData');
        const initDataSignature = urlParams.get('initDataSignature');
        const username = urlParams.get('username');  // предполагается, что это тоже передается в URL
        const telegramId = urlParams.get('telegramId');  // и это также

        return { initData, initDataSignature, username, telegramId };
    }

    // Функция авторизации через Telegram
    async function telegramAuth(initData, initDataSignature, username, telegramId) {
        const response = await fetch('https://6c14-178-173-127-190.ngrok-free.app/api/Data/TelegramAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                initData: initData,
                initDataSignature: initDataSignature,
                username: username,
                telegramId: telegramId
            })
        });

        const responseData = await response.json();
        if (response.ok) {
            console.log('Authorization successful', responseData);
            // Здесь можно перенаправить пользователя или обновить интерфейс
        } else {
            console.error('Authorization failed', responseData);
        }
    }

    // Получаем данные из URL
    const { initData, initDataSignature, username, telegramId } = getUrlParams();

    // Если все параметры есть, выполняем авторизацию
    if (initData && initDataSignature && username && telegramId) {
        telegramAuth(initData, initDataSignature, username, telegramId);
    } else {
        console.error('Missing parameters in the URL.');
    }
});
