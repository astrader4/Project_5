let cartStr = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartStr);
console.log('cartArray', cartArray);

function createCards (cartArray) {
    const cartItems = document.getElementById('cart__items');

    for (let index = 0; index < cartArray.length; index++) {
    
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItem.dataset.id = cartArray[index].id;
        cartItem.dataset.color = cartArray[index].color;
        cartItem.dataset.qty = cartArray[index].qty;
        console.log(cartItem);
      
        const imgHolder = document.createElement('div');
        imgHolder.classList.add('cart__item__img');
        const img = document.createElement('img');
        img.setAttribute('src', cartArray[index].imageUrl);
        img.setAttribute('alt', cartArray[index].altTxt);
        imgHolder.appendChild(img);

        const itemHolder = document.createElement('div');
        itemHolder.classList.add('cart__item__content');

        const headingHolder = document.createElement('div');
        headingHolder.classList.add('cart__item__content__titlePrice');
        const heading = document.createElement('h2');
        heading.innerText = cartArray[index].name;
        const color = document.createElement('p');
        color.innerText = cartArray[index].color;
        const price = document.createElement('p');
        price.innerText = '€' + cartArray[index].price;
        headingHolder.appendChild(heading);
        headingHolder.appendChild(color);
        headingHolder.appendChild(price);
        itemHolder.appendChild(headingHolder);

        const settings = document.createElement('div');
        settings.classList.add('cart__item__content__settings');
        const qtyHolder = document.createElement('div');
        qtyHolder.classList.add('cart__item__content__settings__quantity');
        const qty = document.createElement('input');
        qty.classList.add('itemQuantity');
        qty.setAttribute('type', 'number');
        qty.setAttribute('value', cartArray[index].qty);
        qty.setAttribute('min', '1');
        qty.setAttribute('max', '100');

        //listener for the qty input
        qty.addEventListener('change', changeQty);
        qtyHolder.appendChild(qty);
        settings.appendChild(qtyHolder);
        itemHolder.appendChild(settings);

        const deleteButton = document.createElement('div');
        deleteButton.classList.add('cart__item__content__settings__delete');
        const removeElement = document.createElement('p');
        removeElement.innerHTML = "Delete";
        deleteButton.addEventListener('click', changeDelete);
        deleteButton.appendChild(removeElement);
        settings.appendChild(deleteButton);




        cartItem.appendChild(imgHolder);
        cartItem.appendChild(itemHolder);
        cartItems.appendChild(cartItem);

        updateTotal(cartArray);
    }
}

function changeQty(ev) {
    // console.log('cart item qty', ev.target.value);
    const productId = ev.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    let productQty = ev.target.parentElement.parentElement.parentElement.parentElement.dataset.qty;
    // console.log(productId)
    for (let i = 0; i < cartArray.length; i++) {
        if (productId === cartArray[i].id) {
            cartArray[i].qty = ev.target.value; 
            productQty = cartArray[i].qty;
            // console.log(cartArray[i], productQty, 'end');  
        }
    }
    //change qty in local storage
    syncCart();
    updateTotal(cartArray);
}

function changeDelete(ev) {
    const productId = ev.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    const productColor = ev.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
    //get id of product
    //find object in the cart array by id and delete it
    //delete this article from the DOM
    const remove = ev.target.parentElement.parentElement.parentElement.parentElement;
    const parent = remove.parentElement;
    parent.removeChild(remove);

    for (let i = 0; i < cartArray.length; i++) {
        if (productId === cartArray[i].id && 
            productColor === cartArray[i].color){
           cartArray.splice(i,1);
        }
    }
    syncCart();
    updateTotal(cartArray);
    
}

function updateTotal(array){
    const totalQty = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');
    let totalQtyVal = 0;
    let totalPriceVal = 0;
    

    for (let i = 0; i < array.length; i++) {
        totalQtyVal = totalQtyVal + parseInt(array[i].qty, 10);
        totalPriceVal = totalPriceVal + (array[i].price * array[i].qty);
    }
    

    totalPrice.innerText = totalPriceVal;
    totalQty.innerText = totalQtyVal;
}


function syncCart(){
    cartStr = JSON.stringify(cartArray);
    localStorage.setItem('cart', cartStr);
    cartArray = JSON.parse(localStorage.getItem('cart'));
}

createCards(cartArray);
