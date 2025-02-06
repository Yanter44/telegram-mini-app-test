document.addEventListener("DOMContentLoaded", async function () {
    try {
        const platform = window.Telegram.WebApp.platform;
        console.log("Platform: ", platform); // Логирование платформы

        // Формируем URL с параметрами
        const url = `https://6c14-178-173-127-190.ngrok-free.app/api/Data/GetToken`;

        const response = await fetch(url, {
            method: "GET",
        });

        // Проверка на успешный статус ответа
        if (!response.ok) {
            console.error("Ошибка запроса: ", response.status, response.statusText);
            return;
        }

        // Логирование ответа от сервера
        const text = await response.text();  // Получаем ответ как текст
        console.log("Response Text:", text);  // Логируем текст ответа

        // Пробуем преобразовать в JSON
        try {
            const data = JSON.parse(text);  
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/firstpage";
            } else {
                console.error("Ошибка авторизации:", data.error);
            }
        } catch (jsonError) {
            console.error("Ошибка при парсинге JSON:", jsonError);
        }

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
});
