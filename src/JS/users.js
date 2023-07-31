//https://jsonplaceholder.typicode.com/users

function debounce(fn, ms){
    let timeout;
    return function(){
        const fnCall = () => {fn.apply(this, arguments)}
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, ms)
    }
}

const userList = document.querySelector('.user__row');
const btnUsers = document.querySelector('.load__users');
const searchFieldUser = document.querySelector('.filter__user-field');

let limitUser = 6;
let userSearch = '';

function loadUsers(){
    if(userList){
        userList.innerHTML = '';
        fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limitUser+'&'}${userSearch.length ? 'name_like='+userSearch+'&' : ''}`)
            .then(res => res.json())
            .then(data => {
                if(userList.innerHTML !== null){
                    data.forEach(item => {
                        userList.innerHTML += `
                            <div class="card card__user" id='${item.id}'>
                                <div class="card__top">
                                    <h3 class='card__title'>${item.name}</h3>
                                    <p class='card__text'>
                                        <span>UserName: </span>
                                        ${item.username}
                                    </p>
                                    <p class='card__text'>
                                        <span>Phone</span>
                                        ${item.phone}
                                    </p> 
                                        <p class='card__text'>
                                        <span>Website:</span>
                                        ${item.website}
                                    </p> 
        
                                </div>
                                <div class='card__info'>
                                    <h3 class='card__title'>${item.company.name}</h3>
                                    <p class='card__desc'>${item.company.catchPhrase}</p>
                                    
                                </div>
                            </div> 
                        `
                    });
    
                    localStorage.setItem('dataUsers', JSON.stringify(data));
                }
            })
            .catch(err => console.log(err.message))

    }
}
loadUsers();

if(btnUsers){
    btnUsers.addEventListener('click', ()=> {
        limitUser += 4;
        loadUsers();
    
    });

}

if(searchFieldUser){
    searchFieldUser.addEventListener('keyup', (e)=> {
        userSearch = e.target.value;
        debounce(loadUsers(), 500000);
    })

}





