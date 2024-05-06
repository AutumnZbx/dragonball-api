import { getCharactersFetch } from "./request/getCharactersFetch.js";

getCharactersFetch()
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })