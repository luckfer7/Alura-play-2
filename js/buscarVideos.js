import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js"; //aqui estamos importando a função que vai mostrar o video que digitarmos na barra de procura.

async function buscarVideo(evento) {
    evento.preventDefault();
    const dadosDePesquisa = document.querySelector(".pesquisar__input").value.toLowerCase(); 
    const busca = await conectaApi.buscaVideo(dadosDePesquisa);
    //selecionou o data-atributes e o enviou ao conectaApi, onde está a função de busca.

    // console.log(busca); //estava retornando todos os objetos do array.
    //pra aparecer no console o array que contem o video do termo que procuramos

    const videosFiltrados = busca.filter(video => video.titulo.toLowerCase().includes(dadosDePesquisa));
    //esse trecho de código foi cam a ajuda do chatgpt, na qual a função vai filtrar o array (busca.filter), se o video tiver o valor digitado no campo de procura (video => video.titulo.toLowerCase().includes(dadosDePesquisa))
    
    const lista = document.querySelector("[data-lista]");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild); //enquanto tiver filhos na lista, eu quero remover cada filho. Esse looping se repete até a lista ficar vazia. Agora criamos uma lista de items que eu quero pesquisar.
    }

    videosFiltrados.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))
    //aqui, para cada termo de busca pesquisado, ele vai incluir esse termo (video), (filho), na lista de videos. eles estão sendo anexados ao elemento pai, que é o ul (lista).

    if (videosFiltrados.length == 0) {
        lista.innerHTML=`<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`//aqui ela ta usando os videos da lista, ou seja, se não tiver VIDEOS com aquele termo, a mensagem retorna.
    } else if (dadosDePesquisa == "") {
        lista.innerHTML=`<h2 class="mensagem__titulo">O campo está vazio.</h2>`
        //aqui eu usei uma lógica diferente. Parti do que foi digitado no campo de pesquisa, não do que já esta na lista de videos. Portando, caso o campo esteja vazio, a mensagem retorna.
    }
} 

const botaoDePesquisa = document.querySelector(".pesquisar__botao");

botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento));
// quando clicar no botão de botaoDePesquisa, ele pegerá o valor no campo de pesquisa, buscara na api procurando a função buscaVideo, retornando isso filtrado.