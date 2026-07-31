const pokeBtn = document.getElementById("pokeballBtn");
const display = document.getElementById("display");
const displayTeam = document.getElementById("displayTeam");
let clickCount = 0;


async function pokemon(){
    try{
        const randomNum = Math.floor(Math.random()* 1025)+1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        if(!response.ok){
            throw new Error("Could not retrieve data.");
        }
        const data = await response.json();
        const pokemonImage = data.sprites.front_default;
        const pokemonName = data.name;

        const container = document.createElement("div");
        const pokeImage = document.createElement("img");
        const pokeName = document.createElement("p");

        pokeImage.src = pokemonImage;
        pokeName.textContent = pokemonName;

        container.appendChild(pokeImage);
        container.appendChild(pokeName);
        display.appendChild(container);
        container.addEventListener("click", pokemonPick);
        function pokemonPick(){
            clickCount++;
            if(clickCount>=7){
                return;
            }
            console.log(container.innerText);
            display.innerHTML = "";
            
            displayTeam.appendChild(container);
        }

    }
    catch(error){
        console.log(error);
    }
}

function multiPokemon(){
    display.innerHTML = "";
    for(let i=0;i<=5;i++){
        pokemon();
    }
}

pokeBtn.addEventListener("click", multiPokemon);




