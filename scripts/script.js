// Adicione um evento 'DOMContentLoaded' ao objeto 'document' para garantir que o código seja executado após o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.querySelector(".cards-container"); // Seleciona o elemento com a classe 'cards-container' e armazena na constante 'cardsContainer'

    const searchInput = document.querySelector(".search");
    searchInput.addEventListener('input', searchSkins); // Adiciona um evento de 'input' ao elemento 'searchInput' para chamar a função 'searchSkins' sempre que o usuário digitar um termo de pesquisa
    console.log('Search Input', searchInput);

    const botaoMostrarMais = document.querySelector(".mostrar-mais");
    botaoMostrarMais.addEventListener("click", mostrarMaisCards);

    const quantidadeCards = 20;
    let indexCard = 0;
    let allSkins = [];

    async function getSkins() {
        try {
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json"); // Faz uma solicitação à API e armazena a resposta na constante 'response'
            const skins = await response.json(); // Converte a resposta da API em um objeto JSON e armazena os dados na constante 'skins'
            return skins; // Retorna o objeto JSON com as informações das skins
        } catch (error) {
            console.error("Erro ao buscar skins: ", error);
        }
    }

    // Função para criar um card com informações da skin
    function createCard(skin) {
        const card = document.createElement("div"); // Cria um novo elemento 'div' e armazena na constante 'card'
        card.classList.add("card"); // Adiciona a classe 'card' ao elemento 'card'
        // Preenche o conteúdo do card com informações da skin 
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
    }

    function mostrarMaisCards() {
        displaySkins(allSkins);
    }

    function searchSkins(event) {
        cardsContainer.innerHTML = ''; // Limpa o container de cards antes de exibir os cards filtrados

        indexCard = 0; // Redefine o indexCard para 0 antes de realizar a busca       

        const termoPesquisa = event.target.value.toLowerCase();  // Converte o termo de busca digitado em letras minúsculas
        console.log('termo de pesquisa', termoPesquisa);

        // Filtra o array 'allSkins' comparando o termo de busca com o nome de cada skin (convertido para letras minúsculas)
        const filtroSkins = allSkins.filter(skin =>
            skin.name.toLowerCase().includes(termoPesquisa)
        );
        console.log('Filtro das Skins', filtroSkins);

        displaySkins(filtroSkins);  // Chama a função 'displaySkins(filteredSkins)' para exibir os cards das skins filtradas

        if (filtroSkins.length === 0) {
            nenhumaSkinEncontrada();
            mostrarBotao(false);
        } else {

            mostrarBotao(true);
        }
    }

    function nenhumaSkinEncontrada() {
        const mensagem = document.createElement("div"); // Cria um novo elemento 'div' e armazena na constante 'message'
        mensagem.classList.add("skinNaoEncontrada"); // Adiciona a classe 'no-skins-found' ao elemento 'message'
        mensagem.textContent = "Nenhuma skin encontrada.";

        cardsContainer.appendChild(mensagem); // Adiciona a mensagem ao 'cardsContainer'
    }

    function mostrarBotao(mostrar) {
        if (mostrar) {
            botaoMostrarMais.style.display = "block";
        } else {
            botaoMostrarMais.style.display = "none";
        }
    }

    // Chama a função 'getSkins()' e lida com a resposta usando a função '.then()'
    getSkins().then(skins => {
        allSkins = skins;  // Armazena as skins no array 'allSkins'
        displaySkins(skins); // Exibe os cards das skins utilizando a função 'displaySkins(skins)'
    });
});



