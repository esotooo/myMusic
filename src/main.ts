import { generos } from "./db/generos";

document.addEventListener('DOMContentLoaded', function(){
  generosMostrar()
  scroll()
  resaltar()
})



function scroll(){
  const links = document.querySelectorAll('.navbar a')
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

function generosMostrar(){
  const tarjeta = document.querySelector<HTMLDivElement>('#generos')
  if (!tarjeta) return;
  
  generos.forEach( genero => {
    const item = document.createElement('DIV')
    item.innerHTML = `
      <div class="relative h-full bg-gray-300 py-10 px-4 rounded-lg cursor-pointer slide">
        <div class="absolute flex items-center justify-center w-full h-ful py-1 px-0">
          <img src="${genero.imagen}" alt="Icono genero" class="w-25 h-25 opacity-10" loading="lazy">
        </div>
        <div class="relative">
          <h3 class="text-lg font-black text-rose-500">${genero.titulo}</h3>
          <p class="text-md py-3">${genero.resumen}</p>
        </div>
      </div>
    `
  tarjeta.appendChild(item)
  })
}