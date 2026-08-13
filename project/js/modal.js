// MODAL

const modal = document.querySelector('.modal')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

// Открытие по кнопке
document.querySelector('#btn-get')?.addEventListener('click', openModal)

// Закрытие по X
document.querySelector('.modal_close')?.addEventListener('click', closeModal)

// Закрытие при клике вне окна
modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

// Открытие через 10 секунд
setTimeout(() => {
    openModal()
}, 10000)

// Открытие при достижении конца страницы один раз
const scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        openModal()
        window.removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)