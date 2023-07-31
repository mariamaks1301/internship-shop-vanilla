function debounce(fn, ms){
     let timeout;
     return function(){
         const fnCall = () => {fn.apply(this, arguments)}
         clearTimeout(timeout)
         timeout = setTimeout(fnCall, ms)
     }
 }


const homeList = document.querySelector('.home__row');
const loadBtn = document.querySelector('.home__load-more');
const selectCategory = document.querySelector('.filter__select');

let filterCategory = '';
let limit = 6;



function loadShopProducts() {
    homeList.innerHTML = '';
    if(homeList.innerHTML !== null){
        fetch(`https://fakestoreapi.com/products?limit=${limit}`)
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
           localStorage.setItem('dataShop', JSON.stringify(data));
        })
        .catch(err => console.log(err.message)) 
    }

       
}
loadShopProducts();

 if(loadBtn != null){
    loadBtn.addEventListener('click', ()=> {
        limit += 3;
        console.log(limit)
        loadShopProducts();
    
    });
 }






 function getAllCategories() {
          fetch('https://fakestoreapi.com/products/categories')
             .then(res => res.json())
             .then(category => {
                 category.map(category => {
                     selectCategory.innerHTML += `
                         <option  class='filter__option' value="${category}">${category}</option>
                     `
                 })
             });
 }
 getAllCategories();





 function getProductsByCategory(filterCategory){
     homeList.innerHTML = '';
   
    if(homeList.innerHTML !== null){
        fetch(`https://fakestoreapi.com/products/category/${filterCategory !== 'all' ? filterCategory : ''}`)
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
 }


 selectCategory.addEventListener('change', (e)=> {
    filterCategory = e.target.value;
    console.log(filterCategory);
    getProductsByCategory(filterCategory);
 });











