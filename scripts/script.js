document.addEventListener("DOMContentLoaded", function () {
    const containerCartoes = document.querySelector(".cards-container");
    const entradaPesquisa = document.querySelector(".search");
    const botaoMostrarMais = document.querySelector(".mostrar-mais");
    const mensagem = document.querySelector(".mensagem");

    entradaPesquisa.addEventListener('input', pesquisarSkins);
    botaoMostrarMais.addEventListener("click", mostrarMaisCartoes);

    const quantidadeCartoes = 20;
    let indiceCartao = 0;
    let todasSkins = [];
    const api = "https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json";

    async function obterTodasSkins() {
        try {
            const resposta = await fetch(api);
            const skins = await resposta.json();
            return skins;
        } catch (erro) {
            console.error("Erro ao buscar skins: ", erro);
        }
    }

    function criarCartao(skin) {
        const cartao = document.createElement("div");
        cartao.classList.add("card");
        cartao.innerHTML = `
            <h3>${skin.weapon}</h3>
            <h3>${skin.pattern}</h3>
            <img src="${skin.image}" alt="${skin.name}">   
            <p>Padrão: ${skin.pattern}</p>      
            <p>Raridade: ${skin.rarity}</p>`;
        return cartao;
    }

    function exibirSkins(skins) {
        const contagemParaExibir = Math.min(indiceCartao + quantidadeCartoes, skins.length);
        console.log('Contagem para exibir', contagemParaExibir);

        for (let i = indiceCartao; i < contagemParaExibir; i++) {
            const cartao = criarCartao(skins[i]);
            containerCartoes.appendChild(cartao);
        }

        indiceCartao = contagemParaExibir;

        nenhumaSkinEncontrada(false);
    }

    function mostrarMaisCartoes() {
        exibirSkins(todasSkins);
    }

    function pesquisarSkins(evento) {
        containerCartoes.innerHTML = '';
        indiceCartao = 0;
        const pesquisaSkin = evento.target.value.toLowerCase();
        const skinsFiltradas = todasSkins.filter(skin => skin.name.toLowerCase().includes(pesquisaSkin));

        exibirSkins(skinsFiltradas);

        if (skinsFiltradas.length === 0) {
            nenhumaSkinEncontrada(true);
            mostrarBotao(false);
        } else {
            mostrarBotao(true);
        }
    }

    function nenhumaSkinEncontrada(valor) {
        mensagem.style.display = valor ? "block" : "none";
    }

    function mostrarBotao(valor) {
        botaoMostrarMais.style.display = valor ? "block" : "none";
    }

    obterTodasSkins().then(skins => {
        todasSkins = skins;
        exibirSkins(skins);
    });
});
