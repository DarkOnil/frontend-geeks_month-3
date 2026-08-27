// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'flex'
    tabItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

// Manual click
tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                showTabContent(tabIndex)
                currentIndex = tabIndex
            }
        })
    }
}

// AUTO TAB SLIDER every 3 seconds
let currentIndex = 0

const autoTabSlider = () => {
    setInterval(() => {
        currentIndex++
        if (currentIndex > tabContentBlocks.length - 1) {
            currentIndex = 0
        }
        hideTabContent()
        showTabContent(currentIndex)
    }, 3000)
}

autoTabSlider()

// CONVERTER

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')

// async/await + try/catch

const converter = (data) => {
    const setValue = (input, value) => {
        input.value = value ? value.toFixed(2) : ''
    }

    somInput.oninput = () => {
        const usdValue = somInput.value / data.usd
        setValue(usdInput, usdValue)
        setValue(eurInput, usdValue * data.eur)
    }

    usdInput.oninput = () => {
        setValue(somInput, usdInput.value * data.usd)
        setValue(eurInput, usdInput.value * data.eur)
    }

    eurInput.oninput = () => {
        const usdValue = eurInput.value / data.eur
        setValue(usdInput, usdValue)
        setValue(somInput, usdValue * data.usd)
    }
}

const getCurrency = async () => {
    try {
        const response = await fetch('../data/converter.json')

        if (!response.ok) {
            throw new Error('Failed to get converter data.')
        }

        const data = await response.json()
        converter(data)
    } catch (error) {
        console.log(error.message)
    }
}

getCurrency()

// ===== CARD SWITCHER =====

const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

const MIN_CARD_ID = 1
const MAX_CARD_ID = 200

let currentCardId = MIN_CARD_ID

// Одна функция и на загрузку карточки, и на prev/next (DRY)
const loadCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)

        if (!response.ok) {
            throw new Error('Не удалось загрузить карточку')
        }

        const todo = await response.json()

        card.innerHTML = `
            <p>${todo.title}</p>
            <span>#${todo.id}</span>
        `
    } catch (error) {
        card.innerHTML = `<p>${error.message}</p>`
    }
}

btnNext.onclick = () => {
    currentCardId = currentCardId >= MAX_CARD_ID ? MIN_CARD_ID : currentCardId + 1
    loadCard(currentCardId)
}

btnPrev.onclick = () => {
    currentCardId = currentCardId <= MIN_CARD_ID ? MAX_CARD_ID : currentCardId - 1
    loadCard(currentCardId)
}


loadCard(currentCardId)

// WEATHER

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'dda3fa2c43759b402332f99a404688f7'

const searchInput = document.querySelector('#searchInput')
const searchButton = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

searchButton.onclick = async () => {
    if (searchInput.value === '') {
        city.innerHTML = 'Введите название города!'
        return
    }

    try {
        const response = await fetch(`${WEATHER_API}?q=${searchInput.value}&lang=ru&units=metric&appid=${API_KEY}`)
        const data = await response.json()

        if (data.cod === '404') {
            city.innerHTML = 'Город не найден!'
            temp.innerHTML = ''
            return
        }

        city.innerHTML = data.name
        temp.innerHTML = data.main.temp
        searchInput.value = ''
    } catch (error) {
        console.log('Ошибка при получении данных о погоде:', error)
    }
}

