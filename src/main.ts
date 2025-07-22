import { generos } from "./db/generos"
import { Albums } from "./db/albums"
import { Playlists } from "./db/playlist"
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules' // Módulos necesarios para navegación y paginación

// -------------------------------
// Inicialización principal al cargar DOM
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
  menuMovil()
  generosMostrar()
  scrollSmooth()
  resaltarSeccionActual()
  animarGeneros()
  inicializarCarrusel()
  generarPlaylists()
  actualizarAnioActual()
  initDarkMode()
  animarTextos()
})


// -------------------------------
// Funciones de navegación y scroll
// -------------------------------

/**
 * Aplica scroll suave a todos los enlaces <a> del documento.
 */
function scrollSmooth() {
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement | null
      if (!target) return

      const sectionScroll = target.getAttribute('href')
      if (!sectionScroll) return

      const section = document.querySelector(sectionScroll)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

/**
 * Resalta el link de navegación correspondiente a la sección visible al hacer scroll.
 */
function resaltarSeccionActual() {
  document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section')
    const links = document.querySelectorAll('.navbar a')

    let actual = ''

    // Detectar la sección actual basada en scrollY
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        actual = section.id
      }
    })

    // Resaltar el link activo
    links.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === '#' + actual) {
        link.classList.add('active')
      }
    })
  })
}


// -------------------------------
// Funciones para mostrar contenido dinámico
// -------------------------------

/**
 * Genera las tarjetas para cada género musical usando datos importados.
 * Añade evento para girar tarjeta al hacer clic.
 */
function generosMostrar() {
  const contenedor = document.querySelector<HTMLDivElement>('#generos')
  if (!contenedor) return

  generos.forEach(genero => {
    const item = document.createElement('div')
    item.classList.add('cursor-pointer', '[perspective:1000px]', 'mb-4')

    const artistasHTML = genero.artistas.map(artista => `
      <li class="text-xs font-light">${artista}</li>
    `).join('')

    item.innerHTML = `
      <div class="tarjeta w-full aspect-[3.5/3] lg:aspect-[5/3] animar-scroll">
        <div class="tarjeta__inner w-full h-full relative">
          <div class="tarjeta__cara tarjeta__cara--frontal rounded-2xl absolute inset-0 w-full h-full">
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
            <div class="bg-rose-500 w-full h-full py-8 px-10">
              <p class="font-bold text-2xl">Artistas Favoritos</p>
              <ul class="grid grid-cols-2 mt-2">${artistasHTML}</ul>
            </div>
          </div>
        </div>
      </div>
    `

    contenedor.appendChild(item)

    // Evento para girar tarjeta
    item.addEventListener('click', () => {
      const card = item.querySelector('.tarjeta__inner')
      card?.classList.toggle('is-flipped')
    })
  })
}

/**
 * Anima las tarjetas de géneros al entrar en viewport con Intersection Observer.
 */
function animarGeneros() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0')
        entry.target.classList.add('animate__animated', 'animate__fadeInUp')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    observer.observe(tarjeta)
  })
}
/**
 * Anima el texto de la seccion Generos
 */
function animarTextos() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('opacity-0')) {
        entry.target.classList.remove('opacity-0')
        entry.target.classList.add('animate__animated', 'animate__fadeInUp')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll<HTMLElement>('.animar-scroll').forEach(elemento => {
    elemento.classList.add('opacity-0') // asegúrate que empiecen ocultos
    observer.observe(elemento)
  })
}



/**
 * Genera las tarjetas para las playlists dinámicamente.
 */
function generarPlaylists() {
  const contenedor = document.querySelector<HTMLDivElement>('#playlists')
  if (!contenedor) return

  Playlists.forEach(playlist => {
    const item = document.createElement('div')
    item.innerHTML = `
      <div class="relative w-full h-64 rounded-xl overflow-hidden animar-scroll">
        <img src="${playlist.portada}" alt="Portada playlist" class="absolute inset-0 w-full h-full object-cover" />
        <div class="relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 class="text-white font-bold text-3xl mb-2">${playlist.nombre}</h3>
          <a href="#" class="inline-block mt-2 px-4 py-2 rounded-xl text-white text-center font-bold cursor-pointer bg-black/40 backdrop-blur-sm hover:bg-black/60">
            Escuchar
          </a>
        </div>
      </div>
    `
    contenedor.appendChild(item)
  })
}

/**
 * Inicializa el carrusel Swiper con los álbumes.
 */
function inicializarCarrusel() {
  const contenedor = document.querySelector<HTMLDivElement>("#albums")
  if (!contenedor) return

  // Añade cada álbum al DOM
  Albums.forEach(album => {
    const item = document.createElement('div')
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
    contenedor.appendChild(item)
  })

  // Configura e inicializa Swiper
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
      clickable: true,
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


// -------------------------------
// Funciones para menú móvil
// -------------------------------

/**
 * Controla la apertura y cierre del menú móvil,
 * bloquea scroll cuando el menú está abierto.
 * También cierra menú al hacer clic en cualquier enlace dentro.
 */
function menuMovil() {
  const menuToggle : HTMLElement | null = document.getElementById('menu-toggle')
  const menuClose : HTMLElement | null = document.getElementById('menu-close')
  const mobileMenu : HTMLElement | null = document.getElementById('mobile-menu')

  if (!menuToggle || !menuClose || !mobileMenu) return

  function abrirMenu() {
    mobileMenu?.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }

  function cerrarMenu() {
    mobileMenu?.classList.add('hidden')
    document.body.style.overflow = ''
  }

  menuToggle.addEventListener('click', abrirMenu)
  menuClose.addEventListener('click', cerrarMenu)

  // Cerrar menú al hacer clic en cualquier enlace del menú móvil
  const enlaces = mobileMenu.querySelectorAll('a')
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', cerrarMenu)
  })
}


// -------------------------------
// Funciones utilitarias
// -------------------------------

/**
 * Actualiza el año actual en el footer.
 */
function actualizarAnioActual() {
  const anioElement = document.getElementById("anio")
  if (anioElement) {
    anioElement.textContent = new Date().getFullYear().toString()
  }
}


// -------------------------------
// Función modo oscuro
// -------------------------------

/**
 * Inicializa el modo oscuro.
 * - Detecta preferencia guardada o la del sistema.
 * - Cambia icono de luna/sol en botones.
 * - Guarda preferencia en localStorage.
 */
function initDarkMode() {
  const btnsDarkMode = document.querySelectorAll<HTMLButtonElement>('#btn-toggle-dark')

  // Determina modo inicial (guardado o sistema)
  const savedTheme = localStorage.getItem('theme')
  let isDark = false

  if (savedTheme === 'dark') {
    isDark = true
  } else if (savedTheme === 'light') {
    isDark = false
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  setDarkMode(isDark)

  btnsDarkMode.forEach(btn => {
    btn.addEventListener('click', () => {
      isDark = !document.body.classList.contains('dark')
      setDarkMode(isDark)
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
  })

  function setDarkMode(enable: boolean) {
    if (enable) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    updateIcons(enable)
  }

  function updateIcons(isDark: boolean) {
    btnsDarkMode.forEach(btn => {
      const icon = btn.querySelector('i')
      if (!icon) return

      if (isDark) {
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun', 'text-amber-500')
      } else {
        icon.classList.remove('fa-sun', 'text-amber-500')
        icon.classList.add('fa-moon')
      }
    })
  }
}
