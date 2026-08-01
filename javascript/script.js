const pokeBtn = document.getElementById("pokeballBtn");
const display = document.getElementById("display");
const displayTeam = document.getElementById("displayTeam");
let clickCount = 0;
let count = 0;
const h1 = document.getElementById("h1");


async function pokemon(){
    try{
        count++;
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

        container.classList.add("pokeContainer");

        pokeImage.src = pokemonImage;
        pokeName.textContent = pokemonName;

        container.appendChild(pokeImage);
        container.appendChild(pokeName);
        display.appendChild(container);
        container.addEventListener("click", pokemonPick);
        if(count===6){
            h1.textContent = "Pick A Pokemon To Add To Your Team.";
        }
        else if(count===42){
            h1.textContent = "Is Your Team Stronger Than This Team?";
            clickCount = 0;
        }
        else if(count>=48){
            pokeBtn.removeEventListener("click", multiPokemon);
            restart();
        }
        
        function pokemonPick(){
            clickCount++;
            if(clickCount>=7){
                return;
            }
            else if(clickCount===6){
                h1.textContent = "Now It's Time For A Battle.";
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




function restart(){
    count = 0;
    pokeBtn.addEventListener("click", multiPokemon);
    h1.textContent = "Pick A New Team";
    displayTeam.innerHTML = "";
}