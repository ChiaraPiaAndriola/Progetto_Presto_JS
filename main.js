
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
    //         el.classList.remove('text-f');
    //         el.classList.add('text-w');
    //     })

    //     el.addEventListener('mouseleave', ()=>{
    //         el.classList.remove('text-w');
    //         el.classList.add('text-f');
    //     })

    // })



    window.addEventListener("scroll", ()=>{
        if (window.scrollY > 0){
            navbar.style.height='100px';
            navbar.classList.remove('bg-f');
            navbar.classList.add('bg-b');
            containerfluid.classList.remove('bg-f');
            containerfluid.classList.add('bg-b');

            links.forEach((el)=>{
                el.classList.remove('text-upper-navbar');
                el.classList.add('text-navbar');
                // el.classList.remove('text-w');
                // el.classList.add('text-f');
                // el.addEventListener('mouseenter', ()=>{
                //     el.classList.remove('text-f');
                //     el.classList.add('text-w');
                // })
                // el.addEventListener('mouseleave', ()=>{
                //     el.classList.remove('text-w');
                //     el.classList.add('text-f');
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
                // el.classList.remove('text-f');
                // el.classList.add('text-w');
                // el.addEventListener('mouseenter', ()=>{
                //     el.classList.remove('text-w');
                //     el.classList.add('text-b');
                // })

                // el.addEventListener('mouseleave', ()=>{
                //     el.classList.remove('text-b');
                //     el.classList.add('text-w');
                // })
            })
    
        }
    })    

    hamburger.addEventListener('click', ()=>{
        logo.classList.toggle('logoRotate');
    })
    


function createInterval(total, finalNumber, time){
    let counter = 0
    let interval = setInterval(()=>{
        if (counter<total){
            counter++
            finalNumber.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, time )
}
// createInterval(500, firstNumber, 10);
// createInterval(100, secondNumber, 50);
// createInterval(10, thirdNumber, 500);

let check = true;
let observer = new IntersectionObserver((entries=>{
    entries.forEach((el)=>{
        if(el.isIntersecting && check==true){
            createInterval(500, firstNumber, 10);
            createInterval(100, secondNumber, 50);
            createInterval(10, thirdNumber, 500);
            check=false;
            setTimeout(()=>{
                check=true;
            }, 3000)
        }
    })
}))
observer.observe(thirdNumber);

// card

let announcements = [
    {name : "Margherite", prezzo : "20 €", img: "https://cdn.pixabay.com/photo/2016/04/22/16/17/daisies-1346049_1280.jpg"},
    {name : "Girasoli",prezzo : "30 €", img: "https://cdn.pixabay.com/photo/2022/09/18/16/10/sunflowers-7463437_1280.jpg"},
    {name : "Rose", prezzo : "30€", img: "https://cdn.pixabay.com/photo/2018/03/10/20/05/flower-3215149_1280.jpg"},
    {name : "Tulipani", prezzo : "25 € ", img: "https://cdn.pixabay.com/photo/2018/02/15/18/28/flower-3155965_1280.jpg"},
    {name : "Ortensie", prezzo : "20 €", img: "https://cdn.pixabay.com/photo/2022/05/19/15/53/hydrangeas-7207660_1280.jpg"},
    {name : "Orchidea", prezzo : "35 €", img: "https://cdn.pixabay.com/photo/2015/01/10/14/32/orchids-595242_1280.jpg"},
]

announcements.forEach((annuncio)=>{
    let div = document.createElement('div')
    div.classList.add("col-12", "col-md-4", "py-3")
    div.innerHTML = `
    <div class="card">
            <img src="${annuncio.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-f">${annuncio.name}</h5>
              <p class="card-text text-f">${annuncio.prezzo}</p>
              <a href="#" class="btn bg-f text-w">Acquista</a>
            </div>
    `;
    cardWrapper.appendChild(div)
})


// recensioni

let recensioni = [
    {nome : "Ginevra", commento: "Arrivati subito!", vote: 3},
    {nome : "Paolo", commento: "Molto belli", vote: 4},
    {nome : "Daniela", commento: "Sono arrivati appassiti!", vote: 0},
    {nome : "Roberta", commento: "Bei colori!", vote: 2},
    {nome : "Asia", commento: "Spedizione super veloce!", vote: 3},
    {nome : "Mirko", commento: "Sono piaciuti un sacco alla mia ragazza", vote: 4},
]

recensioni.forEach((recensione)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide', 'd-flex', 'align-items-center', 'justify-content-center');
    div.innerHTML= `
    <div class="review-card">
    <p class="lead mt-3">${recensione.nome}</p>
    <p class="text-center mb-3">${recensione.commento}</p>
     <div class="d-flex mt-2">
      ${createStar(recensione.vote)}  
     </div>
    </div>
    `
    swiperWrapper.appendChild(div)
})

// FUNZIONE CREA STELLE
function createStar(fullStars) {
    let final = '';

// funzione crea stelle piene
        //ricordarsi che fullStars equivale al voto, quindi se l'utente mette 0 al voto, il primo ciclo non se lo guarda proprio perché la i parte da 0 e quindi 0 è minore di 0? no! ergo va al secondo ciclo che mi genera le stelle vuote
    for(let i = 0; i <= fullStars; i ++){
    final = final + `<i class="fa-solid fa-star"></i>`;
    }

// funzione crea stelle vuote
        // 5 stelle totali, meno le stelle piene che ho già trovato su, ad  esempio 5 - 2 stelle piene, mi avanzano 3 stelle vuote, è lì che questo nuovo ciclo si deve fermare e mi deve generare le restanti stelle vacanti
        for(let i = 0; i < 4 - fullStars; i++ ){
            final = final + `<i class="fa-regular fa-star"></i>`
        }
    // mi devo ricordare di ritornare il valore di final, altrimenti avrò in console un undefined
    return final;
}


// swiper
const swiper = new Swiper('.swiper',
 {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

