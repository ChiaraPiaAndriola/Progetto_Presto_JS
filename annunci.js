let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.links');
let logo = document.querySelector('#logo');
let containerfluid = document.querySelector('#containerfluid');
let hamburger = document.querySelector('#hamburger');
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let cardWrapper = document.querySelector('#cardWrapper');
let swiperWrapper = document.querySelector('.swiper-wrapper');

// navbar  

// links.forEach((el)=>{
//     el.addEventListener('mouseenter', ()=>{
//         el.classList.remove('text-f')
//         el.classList.add('text-w')
//     })

//     el.addEventListener('mouseleave', ()=>{
//         el.classList.remove('text-w')
//         el.classList.add('text-f')
//     })

// })

window.addEventListener("scroll", ()=>{
    if (window.scrollY > 0){
        navbar.style.height='100px'
        navbar.classList.remove('bg-f')
        navbar.classList.add('bg-b')
        containerfluid.classList.remove('bg-f')
        containerfluid.classList.add('bg-b')

        links.forEach((el)=>{
            el.classList.remove('text-upper-navbar');
                el.classList.add('text-navbar');
            // el.classList.remove('text-w')
            // el.classList.add('text-f')
            // el.addEventListener('mouseenter', ()=>{
            //     el.classList.remove('text-f')
            //     el.classList.add('text-w')
            // })
            // el.addEventListener('mouseleave', ()=>{
            //     el.classList.remove('text-w')
            //     el.classList.add('text-f')
            // })
        })

    } else {
        navbar.style.height= '66px';
        navbar.classList.remove('bg-b');
        navbar.classList.add('bg-f');
        containerfluid.classList.remove('bg-b');
        containerfluid.classList.add('bg-f');

        links.forEach((el)=>{
            el.classList.remove('text-navbar');
                el.classList.add('text-upper-navbar');
            // el.classList.remove('text-f')
            // el.classList.add('text-w')
            // el.addEventListener('mouseenter', ()=>{
            //     el.classList.remove('text-w')
            //     el.classList.add('text-b')
            // })
            // el.addEventListener('mouseleave', ()=>{
            //     el.classList.remove('text-b')
            //     el.classList.add('text-w')
            // })
        })
    }
})    

hamburger.addEventListener('click', ()=>{
    logo.classList.toggle('logoRotate');
})






fetch('./annunci.json')
.then((response)=> response.json() )
.then((data)=>{
    // data è l'elenco generale
    data.sort((a,b)=>+a.price- +b.price)
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');
    let inputRange = document.querySelector('#inputRange');
    let numberPrice = document.querySelector('#numberPrice');
    let wordInput = document.querySelector('#wordInput')

    

    function setRadios() {
        let categories = data.map((annuncio)=> annuncio.category);
        // console.log(categories);

        // let uniqueCategories = [];

        // categories.forEach((categoria)=>{
        //     if(!uniqueCategories.includes(categoria)){
        //         uniqueCategories.push(categoria)
        //     }
        // })
        // console.log(uniqueCategories);
        
        // esiste un modo più veloce per fare questo cioè
        let uniqueCategories = Array.from(new Set(categories))  // il Set non ammette ripetizioni
     
        // console.log(uniqueCategories);
        
        
        uniqueCategories.forEach((el)=>{
            let div = document.createElement('div')
            div.classList.add("form-check");
            div.innerHTML=`
            <input class="form-check-input" type="radio" name="categories" id="${el}">
            <label class="form-check-label" for="${el}">
            ${el}
            </label>
            `
            radioWrapper.appendChild(div)
        })

    }
    setRadios();

    

    function showCards(array) {
    cardsWrapper.innerHTML='';
    array.forEach((annuncio)=>{
        let div = document.createElement('div')
        div.classList.add('ann-card', 'mx-4', 'text-w')
        div.innerHTML=`
        <p class="h3">${annuncio.name}</p>
        <p class="lead">${annuncio.category}</p>
        <p class="lead">${annuncio.price}€</p>
        `
        cardsWrapper.appendChild(div)
    })
    }




    // catturo sotto invocazione della funzione setRadios perchè vengono creati a questo punto
    let radios = document.querySelectorAll('.form-check-input');
    // console.log(radios);

    function filterByCategory(array) {

        let checked = Array.from(radios).find((button)=> button.checked)
        let categoria = checked.id;
        // console.log(categoria);
        if (categoria == 'All') {
            // showCards(array)
            return array
        }else{
            let filtered = array.filter((annuncio)=> annuncio.category == categoria);
            // console.log(filtered);
            // showCards(filtered)
            return filtered
        }



       
    }
    
    radios.forEach((button)=>{
        button.addEventListener('click', ()=>{
            // filterByCategory();
            globalFilter();
            
        })
    })

    function setInputPrice(){
        let prices = data.map(annuncio => +annuncio.price)
        // console.log(prices);
        let maxPrice = Math.ceil(Math.max(...prices))   //arrotondiamo x eccesso la somma di tutti i prezzi
        // console.log(maxPrice);

        inputRange.max = maxPrice;
        inputRange.value = maxPrice;
        numberPrice.innerHTML= `${maxPrice} €`
    }
    setInputPrice()


    function filterByPrice(array) {
        let filtered = array.filter((annuncio)=>{
            return Number(annuncio.price) <= Number(inputRange.value)
            
        })
        // showCards(filtered)
        return filtered
    }

    inputRange.addEventListener('input', ()=>{
        // filterByPrice();
        globalFilter();
        numberPrice.innerHTML= inputRange.value;
    })
    

   

 showCards(data)

// funzione per filtro parola

    function filterByWord(array) {
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))
        // showCards(filtered)
        return filtered
    }

    // evento per filtrare parola
    wordInput.addEventListener('input', ()=>{
        // filterByWord(wordInput.value)
        globalFilter(wordInput.value)
    })
    
    // ora vogliamo concatenare le 3 funzioni

    function globalFilter() {
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice)
        showCards(filteredByWord)
    }
    globalFilter();
   




})



