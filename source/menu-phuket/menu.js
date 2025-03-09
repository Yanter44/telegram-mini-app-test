document.addEventListener("DOMContentLoaded", function () {
    const cityProducts = JSON.parse(localStorage.getItem('cityProducts'));

    if (cityProducts && Array.isArray(cityProducts)) {
        const productList = document.getElementById('product-list');
        
        cityProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item'); 

            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.imageUrl}" alt="${product.name}" />
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span>${product.price} USD</span>
                </div>
            `;
            
            productList.appendChild(productElement);
        });
    } else {
        console.error('Ошибка: Нет данных о продуктах');
    }
});