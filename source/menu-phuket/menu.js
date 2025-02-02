document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли товары в localStorage
    const cityProducts = JSON.parse(localStorage.getItem('cityProducts'));
    
    // Если товары есть, отображаем их на странице
    if (cityProducts && Array.isArray(cityProducts)) {
        const productList = document.getElementById('product-list');
        
        productList.innerHTML = '';

        cityProducts.forEach(product => {
            const productElement = document.createElement('a');
            productElement.href = './item.html'; 

            const productImage = document.createElement('img');
            productImage.src = product.imageUrl;  
            productImage.alt = product.name;    

            productElement.appendChild(productImage);
            productList.appendChild(productElement);
        });
    } else {
        console.log('Нет товаров в localStorage');
    }
});
