# Sound By Edwin

**Sounds By Edwin** es una página web de portafolio dedicada a mostrar mis gustos musicales personales. No contiene música propia, sino una curaduría visual y funcional de géneros, álbumes y playlists que me gustan, ideal para mostrar habilidades en frontend y manejo de datos dinámicos.

---

## Demo

https://my-music-sepia.vercel.app/

---

## Descripción del Proyecto

Sounds By Edwin es un sitio web responsivo que presenta:

- Sección de géneros musicales con tarjetas animadas y flip al hacer clic.
- Carrusel de álbumes destacados usando Swiper.js con efecto coverflow.
- Sección de playlists con enlaces para escuchar directamente en Apple Music.
- Modo oscuro con detección de preferencia y persistencia en localStorage.
- Menú móvil con animaciones, bloqueo de scroll y navegación suave.
- Animaciones al hacer scroll usando Animate.css e Intersection Observer.
- Uso de íconos de Font Awesome para redes sociales y controles.
- Código modular en TypeScript para manejar datos de géneros, álbumes y playlists.
- Diseño moderno con Tailwind CSS.

El proyecto está pensado como portafolio personal para mostrar habilidades en:

- HTML, CSS (Tailwind), JavaScript / TypeScript
- Uso de librerías externas (Swiper.js, Animate.css, Font Awesome)
- Manipulación dinámica del DOM
- Interactividad y animaciones modernas
- Diseño responsivo y accesible

---

## Tecnologías Usadas

- **HTML5**
- **CSS3** con [Tailwind CSS](https://tailwindcss.com/)
- **TypeScript** (compilado a JavaScript)
- [Swiper.js](https://swiperjs.com/) para carrusel interactivo
- [Animate.css](https://animate.style/) para animaciones CSS
- [Font Awesome](https://fontawesome.com/) para iconos
- API de Intersection Observer para animaciones al scroll

---

## Instalación y Uso

1. Clona esta repositorio:
```bash
git clone https://github.com/tuusuario/soundsbyedwin.git
cd soundsbyedwin
```
2. Instala dependencias si usas bundler o gestor (opcional):
```bash
npm install
```

3. Inicial el servidor
```bash
npm run dev
```

4. Abre la URL que te indica la terminal (por lo general http://localhost:3000) en tu navegador para ver el proyecto.

---

## Cómo Funciona

- Los datos de géneros, álbumes y playlists están almacenados en archivos TypeScript (`db/generos.ts`, `db/albums.ts`, `db/playlist.ts`) como arreglos de objetos.
- El script principal (`src/main.ts`) los importa y genera dinámicamente el contenido HTML para cada sección.
- El carrusel de álbumes usa Swiper.js con configuración personalizada para efecto coverflow y responsividad.
- El menú móvil se controla con JavaScript para abrir, cerrar y bloquear el scroll.
- Las animaciones de entrada se gestionan con Intersection Observer y Animate.css.
- El modo oscuro se activa con un botón que detecta y guarda la preferencia del usuario en `localStorage`.
- Los enlaces a playlists abren Apple Music en una nueva pestaña.

---

## Capturas

---

## Autor

---

## Licencia
Este proyecto es solo para fines personales y portafolio. No contiene música original ni material con copyright.

## Enlaces de Interés
- **Portafolio:** [https://esportafolio.netlify.app/](https://esportafolio.netlify.app/)  
- **Repositorios GitHub:** [https://github.com/esotooo?tab=repositories](https://github.com/esotooo?tab=repositories)  
