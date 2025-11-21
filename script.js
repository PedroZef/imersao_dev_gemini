let dados = []
const cardContainer = document.querySelector('.card-container')
const campoBusca = document.querySelector('input')

async function carregarDados() {
    try {
        const resposta = await fetch('data.json')
        dados = await resposta.json()
        renderizarCards(dados)
    } catch (error) {
        console.error("Erro ao carregar dados:", error)
    }
}

function renderizarCards(items) {
    cardContainer.innerHTML = ''
    if (items.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>'
        return
    }
    items.forEach(item => {
        const card = document.createElement('article')
        card.classList.add('card')
        card.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${item.ano}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(card)
    })
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase()
    const resultados = dados.filter(item =>
        item.nome.toLowerCase().includes(termoBusca)
    )
    renderizarCards(resultados)
}

campoBusca.addEventListener('input', iniciarBusca)

document.addEventListener('DOMContentLoaded', carregarDados)
