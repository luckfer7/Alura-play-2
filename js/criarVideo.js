import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarVideo(evento) {
    evento.preventDefault(); //impede o carregamento da pag quando se clicar no submit
    const imagem = document.querySelector("[data-imagem]").value;
    const url = document.querySelector("[data-url]").value;
    const titulo = document.querySelector("[data-titulo]").value;
    //atribuimos o data atributes as variaveis e com o ".value" vamos pegar o valor que sera digitado dentro do campo. Esse valor será atraibuido à variável.
    const descricao = Math.floor(Math.random()* 10).toString(); //gera um aleatorio, o mathfloor pega o menor numeuro, depois transfrmar-lo em string para passar para ".. visualizações"

    try {
        await conectaApi.criaVideo(titulo, descricao, url, imagem);

        //caso o envio seja feito com sucesso, redirecioaremos a pag:
        window.location.href = "../pages/envio-concluido.html";
    } catch (e) {
        alert(e);
    }
    
}

//agora é preciso captar esses valores quando clicarmos no botão "enviar" a fim de enviar esses valores para o formulario e, assim, criando nosso novo video. 
formulario.addEventListener("submit", evento => criarVideo(evento));