// MODAL

const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal_close')
const btnGet = document.querySelector('#btn-get')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

// Open by button click
btnGet?.addEventListener('click', openModal)

// Close by X button
modalCloseBtn?.addEventListener('click', closeModal)

// Close by click outside modal content
modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

// 3: Open modal 10 seconds after page load
setTimeout(() => {
    openModal()
}, 10000)

// 2: Open modal once when scrolled to the bottom of the page
const scrollHandler = () => {
    // Check if user reached the bottom
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        openModal()
        // Remove listener so it triggers only once
        window.removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)
