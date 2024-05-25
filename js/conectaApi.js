// import { json } from "server/reply";

async function listaVideos () {
    const conexao = await fetch ("http://localhost:3000/videos");
    const conexaoConvertida = await conexao.json(); //constante que armazena o array e o converte, com o json(), para um novo array que sera posteriormente exibido na tela

    return conexaoConvertida;
}

async function criaVideo(titulo, descricao, url, imagem) {
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "content-type": "application/json" //estamos especificando o tipo de conteúdo que esta sendo enviado.
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
            //aqui estamos enviando o corpo da requisição (o body) e dentro das chaves estamos enviando um objeto
        })
    });
    if (!conexao.ok) {
        throw new Error ("Não foi possível enviar o vídeo");
        //se a conexao não estiver ok, ele vai jogar esse erro. MAs precisamos receber esse erro em algum lugar. Será no arquivo criarvideo.
    }

    //para se fazer outro tipo de requisição, o post, temos que que colocar entre chaves e fazer todas as configurações entre as chaves.

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function buscaVideo (termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

export const conectaApi = {
    listaVideos,
    criaVideo,
    buscaVideo
}
