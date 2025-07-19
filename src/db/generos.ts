type genero = {
    id: number
    titulo: string
    resumen: string
    imagen: string
    artistas: string[]
}

export const generos : genero[] = [
    {
        "id": 1,
        "titulo": "Rock Clásico",
        "resumen": "Melodías atemporales con guitarras, baterías y letras que marcan generaciones. Energía, rebeldía y sentimiento.",
        "imagen": "./img/guitarra.png",
        "artistas": ["The Beatles", "Rod Stewart", "Pink Floyd", "Fleetwood Mac", "Billy Joel", "Phil Collins", "Michael Jackson", "Prince"]
    },
    {
        "id": 2,
        "titulo": "Indie / Alternativo",
        "resumen": "Sonidos frescos, creativos y diferentes a lo convencional. Melancolía, atmósferas y autenticidad.",
        "imagen": "./img/luna.png",
        "artistas": ["Tame Impala", "Yumi Zouma", "Roosevelt", "Claire", "The Neighbourhood", "Empire of the Sun", "Arctic Monkeys", "The Strokes", "Oasis", "Radiohead", "The Smiths", "The Cure", "Paramore", "Franz Ferdinand"]
    },
    {
        "id": 3,
        "titulo": "City Pop / Jazz",
        "resumen": "Elegancia y suavidad con influencia del funk y pop de los 80s. Ideal para ambientes relajados y nostálgicos.",
        "imagen": "./img/saxofon.png",
        "artistas": ["Bobby Caldwell", "Blu Swing"]
    },
    {
        "id": 4,
        "titulo": "Pop / Dance",
        "resumen": "Ritmos pegajosos y melodías alegres pensadas para hacerte bailar y sentir.",
        "imagen": "./img/boladisco.png",
        "artistas": ["Michael Jackson", "Prince", "The Weeknd", "Phil Collins", "Empire of the Sun"]
    },
    {
        "id": 5,
        "titulo": "Electrónica / EDM / House",
        "resumen": "Beats repetitivos, melodías envolventes y energía para la pista de baile o para perderse en el sonido.",
        "imagen": "./img/dj.png",
        "artistas": ["Avicii", "Calvin Harris", "Martin Garrix", "Kygo", "Zedd", "Galantis", "SG Lewis", "Roosevelt", "Empire of the Sun"]
    },
    {
        "id": 6,
        "titulo": "Urbano / Reguetón",
        "resumen": "Ritmos latinos, letras directas y una energía contagiosa que invita a moverse.",
        "imagen": "./img/llama.webp",
        "artistas": ["Bad Bunny", "Arcángel", "Rauw Alejandro", "The Weeknd"]
    },
    {
        "id": 7,
        "titulo": "Ska / Fusión",
        "resumen": "Ritmos alegres con metales, guitarras y una mezcla vibrante de géneros que animan cualquier momento.",
        "imagen": "./img/trompeta.png",
        "artistas": ["Malacates Trébol Shop", "Tijuana Love", "Glass Collective"]
    },
    {
        "id": 8,
        "titulo": "Post-Punk / New Wave",
        "resumen": "Melodías oscuras o frenéticas, con un aire nostálgico y letras intensas, propias de los 80s y 90s.",
        "imagen": "./img/gafas.png",
        "artistas": ["The Cure", "Radiohead", "The Smiths", "Franz Ferdinand", "Paramore", "Oasis"]
    },
]