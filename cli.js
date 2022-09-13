import chalk from 'chalk';
import pegaArquivo from './index.js';
import validaURLs from './http-validacao.js';

// armazena tudo oq é digitado no terminal em um array
// exemplo: node[0] index.js[1] /arquivos/arquivo1[2] valida[3]
const caminho = process.argv

async function processaTexto(caminhoDeArquivo) {
    const resultado = await pegaArquivo(caminhoDeArquivo[2]);

    // checa se o usuario escreveu validar no console
    if(caminho[3] === 'validar') {
        console.log(chalk.yellow('Links validados'), await validaURLs(resultado));
    } else {
        console.log(chalk.yellow('lista de links'), resultado);

    }
}

processaTexto(caminho);