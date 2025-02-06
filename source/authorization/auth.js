document.addEventListener("DOMContentLoaded", async function () {
    try {
        const platform = window.Telegram.WebApp.platform;
        console.log("Platform: ", platform); // Логирование платформы

        if (platform !== "android" && platform !== "ios") {
            console.error("Доступ разрешен только с мобильного приложения Telegram!");
            alert("Вход разрешен только с мобильного Telegram.");
            return;
        }

        const initData = window.Telegram.WebApp.initData;
        const initDataSignature = window.Telegram.WebApp.initDataSignature;
        console.log("initData: ", initData); // Логирование initData
        console.log("initDataSignature: ", initDataSignature); // Логирование подписи

        if (!initData || !initDataSignature) {
            console.error("Ошибка: initData или initDataSignature не найдены!");
            return;
        }

        const response = await fetch("https://6c14-178-173-127-190.ngrok-free.app/api/Data/TelegramAuth", {
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
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
});
