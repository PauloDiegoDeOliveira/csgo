document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.querySelector(".cards-container");
    const searchInput = document.querySelector(".search");
    const botaoMostrarMais = document.querySelector(".mostrar-mais");
    const mensagem = document.querySelector(".mensagem");

    searchInput.addEventListener('input', searchSkins);
    botaoMostrarMais.addEventListener("click", mostrarMaisCards);

    const quantidadeCards = 20;
    let indexCard = 0;
    let allSkins = [];

    async function getAllSkins() {
        try {
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json");
            const skins = await response.json();
            return skins;
        } catch (error) {
            console.error("Erro ao buscar skins: ", error);
        }
    }

    function createCard(skin) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${skin.weapon}</h3>
            <h3>${skin.pattern}</h3>
            <img src="${skin.image}" alt="${skin.name}">   
            <p>Padrão: ${skin.pattern}</p>      
            <p>Raridade: ${skin.rarity}</p>`;
        return card;
    }

    function displaySkins(skins) {
        const contagemParaExibir = Math.min(indexCard + quantidadeCards, skins.length);
        console.log('Contagem para exibir', contagemParaExibir);

        for (let i = indexCard; i < contagemParaExibir; i++) {
            const card = createCard(skins[i]);
            cardsContainer.appendChild(card);
        }

        indexCard = contagemParaExibir;

        nenhumaSkinEncontrada(false);
    }

    function mostrarMaisCards() {
        displaySkins(allSkins);
    }

    function searchSkins(event) {
        cardsContainer.innerHTML = '';
        indexCard = 0;

        const pesquisaSkin = event.target.value.toLowerCase();
        const filtraSkins = allSkins.filter(skin => skin.name.toLowerCase().includes(pesquisaSkin));

        displaySkins(filtraSkins);

        if (filtraSkins.length === 0) {
            nenhumaSkinEncontrada(true);
            mostrarBotao(false);
        } else {
            mostrarBotao(true);
        }
    }

    function nenhumaSkinEncontrada(aviso) {
        mensagem.style.display = aviso ? "block" : "none";
    }

    function mostrarBotao(mostrar) {
        botaoMostrarMais.style.display = mostrar ? "block" : "none";
    }

    getAllSkins().then(skins => {
        allSkins = skins;
        displaySkins(skins);
    });
});



