// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/region/{region}
// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

function debounce(fn, ms){
    let timeout;
    return function(){
        const fnCall = () => {fn.apply(this, arguments)}
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, ms)
    }
}


const countryList = document.querySelector('.countries__row');
const regionSelect = document.querySelector('.filter__select-region');
const filterCountry = document.querySelector('.filter__country-field');
const searchClose = document.querySelector('.filter__country-close');


const getAllCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
       
            data.forEach(country => {
                if(countryList){
                    countryList.innerHTML += `
                        <div class="card card__country" id='${country.id}'>
                            <div class="card__top">
                                <img class='card__img card__country-img' src='${country.flags.png}' />
                            </div>
                            <div class='card__info'>
                                <div class='card__row'>
                                    <h3 class='card__title'>
                                        ${country.name.official}
                                    </h3>

                                    <p class='card__text'>
                                        <span>Flag:</span>
                                        ${country.flag}
                                    </p>
                                </div>
                                <p class='card__text'> 
                                    <span>Capital: </span>
                                    ${country.capital}
                                </p>

                                <p class='card__text'>
                                    <span>Region: </span>
                                    ${country.region}
                                </p>

                                <p class='card__text'>
                                    <span>Population</span>
                                    ${country.population}
                                </p>

                                <p class='card__text'>
                                    <span>Continent:</span>
                                    ${country.continents}
                                </p>
                                

                                
                            </div>
                        </div> 
                `
                }                
            });

             localStorage.setItem('countryList', JSON.stringify(data));
        })
        .catch(err=> console.log(err.message))

}
getAllCountries();


let filterRegion = '';
let searchCountry = '';

const getCountriesByRegion = () => {
     countryList.innerHTML = '';
     fetch(`https://restcountries.com/v3.1/region/${filterRegion !== 'all' ? filterRegion : ''}`)
         .then(res => res.json())
         .then(data => {     
             data.forEach(country => {
                if(countryList){
                    countryList.innerHTML += `
                        <div class="card card__country" id='${country.id}'>
                            <div class="card__top">
                                <img class='card__img card__country-img' src='${country.flags.png}' />
                            </div>
                            <div class='card__info'>
                                <div class='card__row'>
                                    <h3 class='card__title'>
                                        ${country.name.official}
                                    </h3>

                                    <p class='card__text'>
                                        <span>Flag:</span>
                                        ${country.flag}
                                    </p>
                                </div>
                                <p class='card__text'> 
                                    <span>Capital: </span>
                                    ${country.capital}
                                </p>

                                <p class='card__text'>
                                    <span>Region: </span>
                                    ${country.region}
                                </p>

                                <p class='card__text'>
                                    <span>Population</span>
                                    ${country.population}
                                </p>

                                <p class='card__text'>
                                    <span>Continent:</span>
                                    ${country.continents}
                                </p>
                                

                                
                            </div>
                        </div> 
                `
                }                
             });
             searchCountry='';
             localStorage.setItem('dataCounctries', JSON.stringify(data));
         })
         .catch(err=> console.log(err.message))
 }
 if(regionSelect !== null){
     regionSelect.addEventListener('change', (e)=>{
         filterRegion = e.target.value;
         sessionStorage.setItem('filterRegion', JSON.stringify(filterRegion));
         getCountriesByRegion();
     })
 }


 function getCountriesByTitle(searchCountry){
    countryList.innerHTML = '';
     fetch(`https://restcountries.com/v3.1/name/${searchCountry}`)
         .then(res => res.json())
         .then(data => {     
             data.forEach(country => {
                if(countryList){
                    countryList.innerHTML += `
                        <div class="card card__country" id='${country.id}'>
                            <div class="card__top">
                                <img class='card__img card__country-img' src='${country.flags.png}' />
                            </div>
                            <div class='card__info'>
                                <div class='card__row'>
                                    <h3 class='card__title'>
                                        ${country.name.official}
                                    </h3>

                                    <p class='card__text'>
                                        <span>Flag:</span>
                                        ${country.flag}
                                    </p>
                                </div>
                                <p class='card__text'> 
                                    <span>Capital: </span>
                                    ${country.capital}
                                </p>

                                <p class='card__text'>
                                    <span>Region: </span>
                                    ${country.region}
                                </p>

                                <p class='card__text'>
                                    <span>Population</span>
                                    ${country.population}
                                </p>

                                <p class='card__text'>
                                    <span>Continent:</span>
                                    ${country.continents}
                                </p>
                                

                                
                            </div>
                        </div> 
                `
                }                
             });
         })
         .catch(err=> console.log(err.message))
 }

 

if(filterCountry !== null){
    filterCountry.addEventListener('keyup', (e)=> {
       searchCountry = e.target.value;
       console.log(searchCountry);
       debounce(getCountriesByTitle(searchCountry), 10000);
   })

}

if(searchClose !== null){
    searchClose.addEventListener('click', (e)=> {
        console.log(e.target.value);
        searchCountry = '';
    })

}








