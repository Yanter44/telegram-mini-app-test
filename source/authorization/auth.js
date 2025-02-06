document.addEventListener("DOMContentLoaded", async function () {
    try {
        const platform = window.Telegram.WebApp.platform;
        console.log("Platform: ", platform); // Логирование платформы

        // Формируем URL с параметрами
        const url = `https://6c14-178-173-127-190.ngrok-free.app/api/Data/GetToken`;

    const response = await fetch(url, {
    method: "GET",
});

if (!response.ok) {
    throw new Error(`Ошибка на сервере: ${response.status} ${response.statusText}`);
}

const text = await response.text();  // Получаем ответ как текст
console.log("Response Text:", text);

try {
    const data = JSON.parse(text);  // Пробуем преобразовать в JSON
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/firstpage";
    } else {
        console.error("Ошибка авторизации:", data.error);
    }
} catch (jsonError) {
    console.error("Ошибка при парсинге JSON:", jsonError);
}

});
