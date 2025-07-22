import { generos } from "./db/generos";
import { Albums } from "./db/albums";
import { Playlists } from "./db/playlist";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; //Modulos necesarios para que navigation y pagination funcionen


document.addEventListener('DOMContentLoaded', function(){
  menuMovil()
  generosMostrar()
  scroll()
  resaltar()
  animarGeneros()
  inicializarCarrusel()
  generarPlaylists()
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
        <div class="flex gap-3 content-center">
          <span><a href="#" class="text-white text-3xl hover:text-rose-500"><i class="fa-brands fa-spotify"></i></a></span>
          <span><a href="#" class="text-white text-3xl hover:text-rose-500"><i class="fa-brands fa-apple"></i></a></span>
          <span><a href="#" class="text-white text-3xl hover:text-rose-500"><i class="fa-brands fa-deezer"></i></a></span>
          <span><a href="#" class="text-white text-3xl hover:text-rose-500"><i class="fa-brands fa-soundcloud"></i></a></span>
        </div>
      </div>
      
    `
    tarjeta.appendChild(item)
  })

  // Inicializar Swiper
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination], //Aqui declaramos ambos modulos
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
  swiper.update()
}


function generarPlaylists(){
  const tarjeta = document.querySelector<HTMLDivElement>("#playlists")
  if (!tarjeta) return

  Playlists.map(playlist => {
    const item = document.createElement('DIV')
    item.innerHTML = `
      <div class="relative w-full h-64 rounded-xl overflow-hidden">
        <!-- Imagen de fondo -->
        <img 
          src="${playlist.portada}" 
          alt="Portada playlist" 
          class="absolute inset-0 w-full h-full object-cover" 
        />

        <!-- Contenido encima -->
        <div class="relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 class="text-white font-bold text-3xl mb-2">${playlist.nombre}</h3>
          <a 
            href="#" 
            class="inline-block mt-2 px-4 py-2 rounded-xl text-white text-center font-bold cursor-pointer
             bg-black/40 backdrop-blur-sm">
            Escuchar
          </a>
        </div>
      </div>
    `
    tarjeta.appendChild(item)
  })
}

function menuMovil() {
  const menuToggle : HTMLElement | null = document.getElementById('menu-toggle')
  const menuClose : HTMLElement | null = document.getElementById('menu-close')
  const mobileMenu: HTMLElement | null = document.getElementById('mobile-menu')

  function abrirMenu() {
    if(!mobileMenu) return
    mobileMenu.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }

  function cerrarMenu() {
    if(!mobileMenu) return
    mobileMenu.classList.add('hidden')
    document.body.style.overflow = ''
  }

  if(!menuToggle || !menuClose || !mobileMenu) return
  menuToggle.addEventListener('click', abrirMenu)
  menuClose.addEventListener('click', cerrarMenu)

  // Cerrar menú al hacer clic en cualquier enlace del menú móvil (incluye redes sociales)
  const enlaces = mobileMenu.querySelectorAll('a')
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', cerrarMenu)
  })
}
