document.addEventListener("DOMContentLoaded", async function () {
    const platform = window.Telegram.WebApp.platform; // Определяем платформу

    if (platform !== "android" && platform !== "ios") {
        console.error("Доступ разрешен только с мобильного приложения Telegram!");
        alert("Вход разрешен только с мобильного Telegram.");
        return;
    }
    const API_BASE_URL = "https://6c14-178-173-127-190.ngrok-free.app";

    const initData = window.Telegram.WebApp.initData;
    const initDataSignature = window.Telegram.WebApp.initDataSignature;

    if (!initData || !initDataSignature) {
        console.error("Ошибка: initData или initDataSignature не найдены!");
        return;
    }
    const response = await fetch(`${API_BASE_URL}/api/Data/telegram-auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        initData,
        initDataSignature,
        username: window.Telegram.WebApp.initDataUnsafe?.user?.username,
        telegramId: window.Telegram.WebApp.initDataUnsafe?.user?.id,
     }),
    });


    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/firstpage";
    } else {
        console.error("Ошибка авторизации:", data.error);
    }
});
