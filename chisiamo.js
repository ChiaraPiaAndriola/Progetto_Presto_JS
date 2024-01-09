let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.links');
let logo = document.querySelector('#logo');
let containerfluid = document.querySelector('#containerfluid');
let hamburger = document.querySelector('#hamburger');
let personeCard = document.querySelector('#personeCard');


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



let opener = document.querySelector('#opener')
let circle = document.querySelector('#circle')



let persone = [
    {name: 'Francesca', description: 'Si occupa di fiori', url:'https://picsum.photos/101'},
    {name: 'Giulia', description: 'Si occupa dei semi', url:'https://picsum.photos/102'},
    {name: 'Eleonora', description: 'Si occupa dei vasi', url:'https://picsum.photos/103'},
    {name: 'Anastasia', description: 'Si occupa delle piante', url:'https://picsum.photos/104'}
]



persone.forEach((persona)=>{
    let div = document.createElement('div')
    div.classList.add('moved');
    div.style.backgroundImage= `url(${persona.url})`
    circle.appendChild(div)
})


let movedDivs = document.querySelectorAll('.moved')
let cardImg = document.querySelector('#cardImg');
let cardTitle = document.querySelector('#cardTitle');
let cardDescription = document.querySelector('#cardDescription');

let check = true
opener.addEventListener('click', ()=>{
    if (check==true) {
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((div, i)=>{
            let angle = (360/movedDivs.length)*i;
            div.style.transform= `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`
        })
        check = false
    }else{
        opener.style.transform = 'rotate(0deg)';
        movedDivs.forEach((div, i)=>{
            
            div.style.transform= `rotate(0deg) translate(0px)`
            
        })
        check = true
        personeCard.classList.add('d-none')
    }   
})


movedDivs.forEach( (moved, i ) => {
    moved.addEventListener("click", ()=>{
        personeCard.classList.toggle('d-none')
        cardImg.src = persone[i].url;
        cardTitle.innerHTML = persone[i].name ;
        cardDescription.innerHTML = persone[i].description;
    })
    
})






