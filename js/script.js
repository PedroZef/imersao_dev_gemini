let dados = []
const cardContainer = document.querySelector('.card-container')
const campoBusca = document.querySelector('input')

async function carregarDados() {
    // Exibe um indicador de carregamento
    cardContainer.innerHTML = '<p>Carregando...</p>'

    try {
        const resposta = await fetch('data.json')

        // Verifica se a requisição foi bem-sucedida
        if (!resposta.ok) {
            throw new Error(`Erro de HTTP: ${resposta.status}`)
        }

        dados = await resposta.json()
        // Limpa o container antes de renderizar os cards
        cardContainer.innerHTML = ''
    } catch (error) {
        console.error('Falha ao carregar dados:', error)
        // Exibe uma mensagem de erro amigável para o usuário
        cardContainer.innerHTML = `<p class="erro">Ops! Não foi possível carregar as informações. Tente novamente mais tarde.</p>`
    }
}

function renderizarCards(items) {
    cardContainer.innerHTML = ''
    if (items.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>'
        return
    }
    items.forEach((item) => {
        const card = document.createElement('article')
        card.classList.add('card')
        card.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${item.ano || item.data_criacao}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(card)
    })
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase()
    if (termoBusca.trim() === '') {
        cardContainer.innerHTML = ''
        return
    }
    const resultados = dados.filter((item) =>
        item.nome.toLowerCase().includes(termoBusca)
    )
    renderizarCards(resultados)
    console.log(
        `Foram encontrados ${resultados.length} resultados para "${termoBusca}".`
    )
}

campoBusca.addEventListener('input', iniciarBusca)

document.addEventListener('DOMContentLoaded', () => {
    carregarDados()
    configurarTema()
})

function configurarTema() {
    const botaoTema = document.getElementById('botao-tema')
    const body = document.body

    const temaSalvo = localStorage.getItem('tema')
    if (temaSalvo === 'light') {
        body.classList.add('light-mode')
        botaoTema.textContent = '☀️'
    } else {
        body.classList.remove('light-mode')
        botaoTema.textContent = '🌙'
    }

    botaoTema.addEventListener('click', () => {
        body.classList.toggle('light-mode')
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('tema', 'light')
            botaoTema.textContent = '☀️'
        } else {
            localStorage.setItem('tema', 'dark')
            botaoTema.textContent = '🌙'
        }
    })
}
