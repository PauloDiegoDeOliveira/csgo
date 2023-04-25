// Adicione um evento 'DOMContentLoaded' ao objeto 'document' para garantir que o código seja executado após o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o elemento com a classe 'cards-container' e armazena na constante 'cardsContainer'
    const cardsContainer = document.querySelector(".cards-container");

    async function getSkins() {
        try {
            // Faz uma solicitação à API e armazena a resposta na constante 'response'
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json");
            // Converte a resposta da API em um objeto JSON e armazena os dados na constante 'skins'
            const skins = await response.json();
            // Retorna o objeto JSON com as informações das skins
            return skins;
        } catch (error) {
            console.error("Erro ao buscar skins: ", error);
        }
    }

    // Função para criar um card com informações da skin
    function createCard(skin) {
        // Cria um novo elemento 'div' e armazena na constante 'card'
        const card = document.createElement("div");
        // Adiciona a classe 'card' ao elemento 'card'
        card.classList.add("card");
        // Preenche o conteúdo do card com informações da skin 
        card.innerHTML = `
            <h3>${skin.name}</h3>
            <img src="${skin.image}" alt="${skin.name}" width="100%">       
            <p>Arma: ${skin.weapon}</p>
            <p>Padrão: ${skin.pattern}</p>      
            <p>Raridade: ${skin.rarity}</p>`;
        // Retorna o card com as informações da skin
        return card;
    }

    // Função para exibir os cards das skins no elemento 'cardsContainer'
    function displaySkins(skins) {
        // Limpa o conteúdo de 'cardsContainer'
        cardsContainer.innerHTML = "";

        // Itera sobre cada skin e cria um card com a função 'createCard(skin)'
        skins.forEach(skin => {
            // Cria um card para a skin atual
            const card = createCard(skin);
            // Adiciona o card criado ao elemento 'cardsContainer'
            cardsContainer.appendChild(card);
        });
    }

    // Cria um array vazio para armazenar as skins
    let allSkins = [];
    // Chama a função 'getSkins()' e lida com a resposta usando a função '.then()'
    getSkins().then(skins => {
        // Armazena as skins no array 'allSkins'
        allSkins = skins;
        // Exibe os cards das skins utilizando a função 'displaySkins(skins)'
        displaySkins(skins);
    });
});
