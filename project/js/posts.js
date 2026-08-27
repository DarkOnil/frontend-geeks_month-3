// ===== POSTS PAGE: КАРТОЧКИ ИЗ jsonplaceholder.typicode.com/posts =====

const postsList = document.querySelector('#posts-list')
const postsStatus = document.querySelector('#posts-status')

const IMAGE_URL = 'https://picsum.photos/300/200'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=16'

const renderPosts = (posts) => {
    postsList.innerHTML = posts.map((post) => `
        <div class="post_card">
            <div class="post_photo">
                <img src="${IMAGE_URL}" alt="${post.title}">
            </div>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).join('')
}

const getPosts = async () => {
    try {
        const response = await fetch(POSTS_URL)

        if (!response.ok) {
            throw new Error('Не удалось загрузить посты')
        }

        const posts = await response.json()

        renderPosts(posts)
        postsStatus.style.display = 'none'
    } catch (error) {
        postsStatus.innerHTML = error.message
    }
}

getPosts()
