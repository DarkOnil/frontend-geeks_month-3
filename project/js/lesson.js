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

// Promise


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

const getCurrency = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json')
        xhr.setRequestHeader('Content-type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.response)
                resolve(data)
            } else {
                reject(new Error(`Failed to get converter data.`))
            }
        }

        xhr.onerror = () => {
            reject(new Error('Network error'))
        }

        xhr.send()
    })
}        

getCurrency()
    .then((data) => converter(data))
    .catch((error) => {
        console.log(error.message)
    })

// ===== CARD SWITCHER =====

const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

const MIN_CARD_ID = 1
const MAX_CARD_ID = 200

let currentCardId = MIN_CARD_ID

// Одна функция и на загрузку карточки, и на prev/next (DRY)
const loadCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(todo => {
            card.innerHTML = `
                <p>${todo.title}</p>
                <span>#${todo.id}</span>
            `
        })
        .catch(() => {
            card.innerHTML = `<p>Не удалось загрузить карточку</p>`
        })
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