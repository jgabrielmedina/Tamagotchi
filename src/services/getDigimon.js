import { ajax } from "../tools/ajax";


export const getDigimon = async (id) => {
    const optionsRequest = {
        method: 'GET',
   /*      url: `https://digimon-api.vercel.app/api/digimon`, */
        url: `https://www.digi-api.com/api/v1/digimon/${id}`,
    };

    
    return await ajax(optionsRequest)
}

