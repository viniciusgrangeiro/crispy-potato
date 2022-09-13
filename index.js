import chalk from 'chalk';
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null){
        // adiciona no array as chaves com os valores dos itens
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados.length === 0 ? 'Não há links no arquivo' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'))
}

// async / await
async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro);
    }
}


// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';

//     // criando promessas
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((erro) => trataErro(erro))
// }


// function pegaArquivo(caminhoArquivo) {
//     const encoding = 'utf-8'
//     // redFile é uma callback            // função
//     fs.readFile(caminhoArquivo, encoding, (erro, texto) => {
//         if(erro) {
//             trataErro(erro);
//         }
        
//         console.log(chalk.green(texto));
//     })
// }

export default pegaArquivo;