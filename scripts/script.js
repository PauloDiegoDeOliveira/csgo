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
        cartao.classList.add("skeleton-loader");
        cartao.innerHTML = `
            <h3>${skin.weapon}</h3>
            <h3>${skin.pattern}</h3>
            <img alt="${skin.name}">   
            <p>Padrão: ${skin.pattern}</p>      
            <p>Raridade: ${skin.rarity}</p>`;

        const imagem = cartao.querySelector("img");
        imagem.addEventListener("load", () => {
            cartao.classList.remove("skeleton-loader");
        });
        imagem.src = skin.image;

        return cartao;
    }


    function exibirSkins(skins) {
        removerSkeletonLoaders();

        const contagemParaExibir = Math.min(indiceCartao + quantidadeCartoes, skins.length);

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

    function criarSkeletonLoader() {
        const skeleton = document.createElement("div");
        skeleton.classList.add("skeleton-loader");

        const titulo1 = document.createElement("div");
        titulo1.style.width = "80%";
        skeleton.appendChild(titulo1);

        const titulo2 = document.createElement("div");
        titulo2.style.width = "90%";
        skeleton.appendChild(titulo2);

        const imagem = document.createElement("img");
        skeleton.appendChild(imagem);

        const titulo3 = document.createElement("div");
        titulo3.style.width = "50%";
        skeleton.appendChild(titulo3);

        const titulo4 = document.createElement("div");
        titulo4.style.width = "80%";
        skeleton.appendChild(titulo4);

        return skeleton;
    }

    function exibirSkeletonLoaders(quantidade) {
        for (let i = 0; i < quantidade; i++) {
            const skeleton = criarSkeletonLoader();
            containerCartoes.appendChild(skeleton);
        }
    }

    function removerSkeletonLoaders() {
        const skeletonLoaders = document.querySelectorAll(".skeleton-loader");
        skeletonLoaders.forEach((skeleton) => skeleton.remove());
    }

    exibirSkeletonLoaders(quantidadeCartoes);

    obterTodasSkins().then(skins => {
        todasSkins = skins;
        exibirSkins(skins);
    });
});
