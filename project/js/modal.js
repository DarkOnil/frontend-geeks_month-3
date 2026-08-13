

const modal = document.querySelector('.modal')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}


document.querySelector('#btn-get')?.addEventListener('click', openModal)


document.querySelector('.modal_close')?.addEventListener('click', closeModal)


modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

// Открытие через 10 секунд
setTimeout(() => {
    openModal()
}, 10000)


const scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        openModal()
        window.removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)