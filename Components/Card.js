document.addEventListener("DOMContentLoaded", () => {
	const searchButton = document.getElementById("searchButton");
	const pokemonSearchInput = document.getElementById("pokemonSearch");
	const pokemonDisplay = document.getElementById("pokemonDisplay");

	searchButton.addEventListener("click", function () {
		const pokemonName = pokemonSearchInput.value.trim().toLowerCase();
		if (pokemonName) {
			fetchPokemonData(pokemonName);
		} else {
			pokemonDisplay.textContent = "Please enter a Pokémon name.";
		}
	});
});

async function fetchPokemonData(pokemonName) {
	try {
		const apiUrl = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`;
		const response = await axios.get(apiUrl);
		displayPokemonData(response.data);
	} catch (error) {
		console.error("There was an error fetching the Pokémon data:", error);
		pokemonDisplay.textContent = "Failed to retrieve Pokémon data. Please check the name and try again.";
	}
}

function displayPokemonData(pokemonData) {
	// Clear the display
	pokemonDisplay.innerHTML = "";

	// Create elements for the Pokémon's name, image, etc.
	const pokemonName = document.createElement("h2");
	pokemonName.textContent = pokemonData.name;
	const pokemonImage = document.createElement("img");
	pokemonImage.src = pokemonData.sprites.front_default;
	pokemonImage.alt = `Image of ${pokemonData.name}`;
	pokemonImage.classList.add("pokemon-image");

	const abilitiesList = document.createElement("ul");
	abilitiesList.classList.add("pokemon-abilities");
	pokemonData.abilities.forEach((ability) => {
		const listItem = document.createElement("li");
		listItem.textContent = ability.ability.name;
		abilitiesList.appendChild(listItem);
	});

	// Append the new elements to the display container
	pokemonDisplay.appendChild(pokemonName);
	pokemonDisplay.appendChild(pokemonImage);
	pokemonDisplay.appendChild(abilitiesList);
}
