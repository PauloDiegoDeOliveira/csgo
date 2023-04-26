// Adicione um evento 'DOMContentLoaded' ao objeto 'document' para garantir que o código seja executado após o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o elemento com a classe 'cards-container' e armazena na constante 'cardsContainer'
    const cardsContainer = document.querySelector(".cards-container");
    const searchInput = document.querySelector(".search");

    async function getSkins() {
        try {
            // Faz uma solicitação à API e armazena a resposta na constante 'response'
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json");
            // Converte a resposta da API em um objeto JSON e armazena os dados na constante 'skins'
            const skins = await response.json();
            // Retorna o objeto JSON com as informações das skins
            console.log(skins);
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
            <h3>${skin.weapon}</h3>
            <h3>${skin.pattern}</h3>
            <img src="${skin.image}" alt="${skin.name}">   
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

    // Filtra o array 'allSkins' de acordo com o termo de busca e exibe os cards das skins filtradas
    function searchSkins(event) {
        // Converte o termo de busca digitado em letras minúsculas
        const termoPesquisa = event.target.value.toLowerCase();
        console.log('termo de pesquisa', termoPesquisa);
        // Filtra o array 'allSkins' comparando o termo de busca com o nome de cada skin (convertido para letras minúsculas)
        const filtroSkins = allSkins.filter(skin =>
            skin.name.toLowerCase().includes(termoPesquisa)
        );
        console.log('Filtro das Skins', filtroSkins);
        // Chama a função 'displaySkins(filteredSkins)' para exibir os cards das skins filtradas
        displaySkins(filtroSkins);
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

    // Adiciona um evento de 'input' ao elemento 'searchInput' para chamar a função 'searchSkins' sempre que o usuário digitar um termo de pesquisa
    searchInput.addEventListener('input', searchSkins);
    console.log('Search Input', searchInput);
});



