const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) => fetch(getPokemonUrl(index + 1)).then(res => res.json()))

const generateHTML = pokemons => pokemons.reduce((acc, {name, id, types}) => {
    const png = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    const elementTypes = types.map(typeinfo => typeinfo.type.name)

    acc += `
    <li class='card ${elementTypes[0]}'>
      <img class ="card-image " alt="${name}" src="${png}" />
      <h2 class='card-title'>${id}. ${name}</h2>
      <p class='card-subtitle'>${elementTypes.join(' | ')}</p>
    </li>`

  return acc
  }, '')


const InsertPokemonIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"] ')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()
// colocando todas as promises em um array

// Metodo PROMISE.ALL() recebe um array de promises resolvidas
// Como tem um array de promise, então posso utilizar o metodo then de promisse
Promise.all(pokemonPromises).then(generateHTML).then(InsertPokemonIntoPage)
