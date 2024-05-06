import { getCharactersFetch } from "./request/getCharactersFetch.js";

let currentPage = 1; //pagina actual
let loadedCharacters = []; //Array para ver que vamos a cargar
let isLoading = false;

let nombre = "";//Nombre a buscar en el input

const loadInitialCharactersCards = async ()  =>{
    const characters = await getCharactersFetch();
    createCharactersCards(characters);
}

export const createCharactersCards = async (characters) => {
    const personajesRow =document.getElementById(`personajesRow`);

    characters.map((character) =>{
        const{id,name,race,ki,description,image,maxKi,gender} = character;

        if (!loadedCharacters.includes(id)){
            loadedCharacters.push(id);

            const divRow = document.createElement(`div`);
            divRow.classList.add("col-xl-3");
            divRow.classList.add("col-lg-3");
            divRow.classList.add("col-md-3");
            divRow.classList.add("col-sm-12");
            divRow.classList.add("col-sx-12");

            const card = document.createElement(`div`);
            card.classList.add(`card`);
            card.classList.add(`mt-2`);
            card.classList.add(`mt-2`);

            const imgCard = document.createElement(`img`);
            imgCard.classList.add(`card-img-top`);
            imgCard.classList.add(`mt-2`);
            imgCard.classList.add(`mx-auto`);
            imgCard.classList.add(`w-75`);
            imgCard.src = image;

            const divBody = document.createElement(`div`);
            divBody.classList.add(`card-body`);
            divBody.classList.add(`text-center`);
            divBody.classList.add(`mx-auto`);

            const tituloC = document.createElement(`h5`);
            tituloC.classList.add(`card-text`);
            tituloC.textContent = name;

            const levelC = document.createElement(`p`);
            levelC.classList.add(`card-text`);
            levelC.textContent = ki;

            const btnVer = document.createElement(`button`);
            btnVer.classList.add(`btn`);
            btnVer.classList.add(`btn-primary`);
            btnVer.classList.add(`text-center`);
            btnVer.classList.add(`mx-auto`);

            btnVer.textContent = `Ver detalles`;
            btnVer.addEventListener("click",()=>{
                console.log("Hola");
            })

            divRow.appendChild(card);
            card.appendChild(imgCard);
            card.appendChild(divBody);

            divBody.appendChild(tituloC);
            divBody.appendChild(levelC);
            divBody.appendChild(btnVer);

            personajesRow.appendChild(divRow);
        }
    })
}

const loadInitialCharacters = async() =>{
    const characters = await getCharactersFetch();
    createCharactersCards(characters);
}


export const loadMoreCharacters = async()=>{
    if(isLoading)return;
    isLoading= true;

    currentPage++;
    const characters = await getCharactersFetch(currentPage);
    if (characters.length > 0){
        createCharactersCards(characters);
    } else {
        alert("No hay mas personajes por cargar");
    }
    isLoading = false;
}
window.onload = loadInitialCharacters;
 window.addEventListener(`scroll`,()=>{
    const{scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&!isLoading){
        loadMoreCharacters();
    }
})

loadInitialCharacters();











//getCharactersFetch()
//    .then((response)=>{
//        console.log(response);
//    })
//    .catch((error)=>{
//        console.log(error);
//    })

//getCharactersFetch()
//.then(response => console.log(response))
//.then(error => console.log(error))

