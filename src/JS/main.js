const homeList = document.querySelector('.home__row');
const loadBtn = document.querySelector('.btn-load');
const selectCategory = document.querySelector('.filter__select');

const addCardsToList = () => {
    homeList.innerHTML = '';
    let shopData;

     fetch('https://fakestoreapi.com/products?limit=6')
             .then(res => res.json())
             .then(data => {   
                data.forEach(item => {
                    homeList.innerHTML += `
                        <div class="card" id='${item.id}'>
                            <div class="card__top">
                                <img class='card__img' src='${item.image}' /> 
                            </div>
                            <div class='card__info'>
                                <h3 class='card__title'>${item.title}</h3>
                                <p class='card__desc'>${item.description}</p>
                                <div class='card__row'>
                                    <p class='card__price'> Price: ${item.price} $</p>
            
                                    <button class='card__btn btn btn-small'>Add to Cart</button>
                                </div>
                            </div>
                        </div> 
                    `
                });
             })
             .catch(err => console.log(err.message)) 
}
addCardsToList();


const addAllCardsToList = () => {
    homeList.innerHTML = '';

     fetch('https://fakestoreapi.com/products')
             .then(res => res.json())
             .then(data => {   
                data.forEach(item => {
                    homeList.innerHTML += `
                        <div class="card" id='${item.id}'>
                            <div class="card__top">
                                <img class='card__img' src='${item.image}' /> 
                            </div>
                            <div class='card__info'>
                                <h3 class='card__title'>${item.title}</h3>
                                <p class='card__desc'>${item.description}</p>
                                <div class='card__row'>
                                    <p class='card__price'> Price: ${item.price} $</p>
            
                                    <button class='card__btn btn btn-small'>Add to Cart</button>
                                </div>
                            </div>
                        </div> 
                    `
                });
             })
             .catch(err => console.log(err.message)) 
}


loadBtn.addEventListener('click', ()=> {
    addAllCardsToList();
})


const getAllCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(category => {
                category.forEach(category => {
                    selectCategory.innerHTML += `
                        <option class="filter__option" value="${category}">${category}</option>
                    `
                })

            });
}
getAllCategories();


const getCardsByCategory = (category) => {
    fetch(`https://fakestoreapi.com/category/${category}`)
        .then(res => res.json())
        .then(json => console.log(json));
}



//   fetch('https://fakestoreapi.com/products/categories')
//           .then(res => res.json())
//           .then(json => console.log(json));


