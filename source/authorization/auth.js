document.addEventListener("DOMContentLoaded", async function () {
    try {
        const platform = window.Telegram.WebApp.platform;
        console.log("Platform: ", platform); // Логирование платформы

      
        const initData = window.Telegram.WebApp.initData;
        const initDataSignature = window.Telegram.WebApp.initDataSignature;
        console.log("initData: ", initData); // Логирование initData
        console.log("initDataSignature: ", initDataSignature); // Логирование подписи

        if (!initData || !initDataSignature) {
            console.error("Ошибка: initData или initDataSignature не найдены!");
            return;
        }

        // Формируем URL с параметрами
        const url = `https://6c14-178-173-127-190.ngrok-free.app/api/Data/GetToken?initData=${encodeURIComponent(initData)}&initDataSignature=${encodeURIComponent(initDataSignature)}&username=${encodeURIComponent(window.Telegram.WebApp.initDataUnsafe?.user?.username)}&telegramId=${encodeURIComponent(window.Telegram.WebApp.initDataUnsafe?.user?.id)}`;

        const response = await fetch(url, {
            method: "GET",
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/firstpage";
        } else {
            console.error("Ошибка авторизации:", data.error);
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
});
