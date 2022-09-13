import fetch from "node-fetch";

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try{
        
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const resposta = await fetch(url)
                    return resposta.status;
        }))
        return arrayStatus;
    } catch(erro){
        manejaErros(erro);
    }

}

function geraArrayURLs(arrayLinks){
    // loop para cada { chave: valor }
    // objeto -> [valor]
    // Object.values(objeto)

    // map -> para cada objeto do array   // join -> retira um objeto de um array e transforma ele em string
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join())
}

async function validaURLs(arrayLinks) {
    const links = geraArrayURLs(arrayLinks);
    const statusLinks = await checaStatus(links)

    // spread operator // sempre que uma arrow f retornar um objeto, deve ser adicionado () antes das {}
    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice] 
    }))
    return resultados;
}

export default validaURLs;