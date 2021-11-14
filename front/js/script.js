fetch('http://localhost:3000/api/products/')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        createCards(data)
    })
    .catch((error) =>console.log(error))


    function createCards(array){
        const container=document.getElementById('items');
        console.log(container);

        for (let index = 0; index < array.length; index++) {
            
            const card = document.createElement('a');
            const article = document.createElement('article');
            const image = document.createElement('img');
            const heading = document.createElement('h3');
            const description = document.createElement('p');

            heading.innerText = array[index].name;
            description.innerText = array[index].description;

            heading.classList.add('productName');
            description.classList.add('productDescription');

            image.setAttribute('src', array[index].imageUrl);
            image.setAttribute('alt', `picture of ${array[index].name}`);
            card.setAttribute('href', `./product.html?id=${array[index]._id}`)

            article.appendChild(image);
            article.appendChild(heading);
            article.appendChild(description);

            card.appendChild(article);

            container.appendChild(card);
        }
    }