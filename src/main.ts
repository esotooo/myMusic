import { generos } from "./db/generos";
import { Albums } from "./db/albums";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';





document.addEventListener('DOMContentLoaded', function(){
  generosMostrar()
  scroll()
  resaltar()
  animarGeneros()
  inicializarCarrusel()
})




function scroll(){
  
  const links = document.querySelectorAll('a')
  links.forEach( link => {
      link.addEventListener('click', e => {
          e.preventDefault() //Eliminamos la accion por defecto
          const target = e.target as HTMLAnchorElement | null
          if(!target) return

          const sectionScroll = target.getAttribute('href')
          if(!sectionScroll) return

          const section = document.querySelector(sectionScroll)
          if(section){
            section.scrollIntoView({behavior: 'smooth'})
          }
      })
  })
}

function resaltar(){
  document.addEventListener('scroll', function(){
      const sections = document.querySelectorAll('section')
      const links = document.querySelectorAll('.navbar a')

      let actual = ''
      //Medimos la distancia de cada section y una vez lo pase se coloque el nuevo
      sections.forEach(section => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.clientHeight
          if(window.scrollY >= (sectionTop - sectionHeight / 3) ){
              actual = section.id
          }
      })
      //Una vez pasada la seccion, que el link activo se resalte de otro color 
      links.forEach(link => {
          link.classList.remove('active')
          if(link.getAttribute('href') === '#' +  actual){ 
              link.classList.add('active')
          }
      })
  })   
}

//Funcion para generar una tarjeta para cada genero
function generosMostrar() {
  const tarjeta = document.querySelector<HTMLDivElement>('#generos')
  if (!tarjeta) return

  generos.forEach(genero => {
    const item = document.createElement('DIV')
    item.classList.add(
      'cursor-pointer',
      '[perspective:1000px]',
      'mb-4'
    )

    const artistasHTML = genero.artistas.map(artista => `
      <li class="text-xs font-light">${artista}</li>
    `).join('')
    
    item.innerHTML = `
      <div class="tarjeta w-full aspect-[3.5/3] lg:aspect-[5/3]">
        <div class="tarjeta__inner w-full h-full relative">
          <div class="tarjeta__cara tarjeta__cara--frontal rounded-2xl absolute inset-0 w-full h-full">
            <!-- Cara frontal -->
            <div class="frontal--contenido p-15 w-full h-full">
              <div class="absolute inset-0 flex items-center justify-center">
                <img src="${genero.imagen}" alt="Icono genero" class="w-24 h-24 opacity-10 object-contain" loading="lazy" />
              </div>
              <div>
                <h3 class="text-lg font-black text-rose-500">${genero.titulo}</h3>
                <p class="text-md py-3">${genero.resumen}</p>
              </div>
            </div>
          </div>
          <div class="tarjeta__cara tarjeta__cara--trasera absolute inset-0 w-full h-full rounded-2xl">
            <!-- Cara trasera -->
            <div class="bg-rose-500 w-full h-full py-8 px-10">
              <p class="font-bold text-2xl">Artistas Favoritos</p>
              <ul class="grid grid-cols-2 mt-2">
                ${artistasHTML}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
    
    tarjeta.appendChild(item)

    item.addEventListener('click', () => {
      const card = item.querySelector('.tarjeta__inner')
      card?.classList.toggle('is-flipped')
    })
  })
}

//Funcion para animar la entrada de las tarjetas al hacer scroll
function animarGeneros() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0')
        entry.target.classList.add(
          'animate__animated',
          'animate__fadeInUp'
        )
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.5
  })

  document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    observer.observe(tarjeta)
  })
}


function inicializarCarrusel() {
  const tarjeta = document.querySelector<HTMLDivElement>("#albums")
  if (!tarjeta) return

  // Agregar los albums al DOM
  Albums.forEach(album => {
    const item = document.createElement('DIV')
    item.classList.add('swiper-slide')
    item.style.backgroundImage = `url('${album.imagen}')`
    item.innerHTML = `
      <div class="info">
        <span class="text-3xl font-extrabold text-white m-0">${album.nombre}</span>
        <span class="text-white font-bold italic text-lg m-0">${album.artista}</span>
        <span class="text-rose-500 text-md font-bold m-0">${album.año}</span>
      </div>
      
    `;
    tarjeta.appendChild(item)

    
  })


  // Inicializar Swiper
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    effect: "coverflow",
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1.5 },
      580: { slidesPerView: 2 },
      767: { slidesPerView: 3 },
      992: { slidesPerView: 3.5 },
      1200: { slidesPerView: 4 },
      1400: { slidesPerView: 4.5 },
    },
    
  })
}







