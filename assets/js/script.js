document.addEventListener("DOMContentLoaded", () => {
    cargar();
});

const cargar = async () => {
    for (let i = 1; i <= 20; i++) {
        await dibujarPokemon(i);
    }
}

const dibujarPokemon = async (id) => {
        const pokemon = await obtenerPokemon(id);
        if (Object.keys(pokemon).length !== 0) {
            dibujarTarjetaSuccess(pokemon);
        } else {
            dibujarTarjetaError();
        }
}

const obtenerPokemon = async (id) => {
    let pokemon = {};
    try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon/"+id);
        if (res.status === 200) {
            pokemon.nombre = res.data.name;
            pokemon.imagen = res.data.sprites.other.dream_world.front_default;
        } else {
            console.log("error res obtenerPokemon "+id, res);
        }
    } catch (error) {
        console.log("error obtenerPokemon "+id, error);
    }
    return pokemon;
}

const dibujarTarjetaSuccess = (pokemon) => {
    const row = document.querySelector("main").querySelector(".row");
    const template = document.getElementById("success").content;
    const card = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    card.querySelector(".card-img-top").setAttribute("src", pokemon.imagen);
    card.querySelector(".card-img-top").setAttribute("alt", pokemon.nombre);
    card.querySelector(".card-title").innerHTML = pokemon.nombre;

    fragment.appendChild(card);
    row.appendChild(fragment);
}

const dibujarTarjetaError = () => {
    const row = document.querySelector("main").querySelector(".row");
    const template = document.getElementById("error").content;
    const card = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    card.querySelector(".card-title").innerHTML = "error";

    fragment.appendChild(card);
    row.appendChild(fragment);
}