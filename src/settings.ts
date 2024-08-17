import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    MONGO_URL:process.env.MONGO_URL || 'mongodb+srv://admin:admin@blogerplatform.vkvms.mongodb.net/BlogsPosts?retryWrites=true&w=majority&appName=BlogerPlatform',
    MONGO_DB:process.env.MONGO_DB || 'BlogsPosts',
    BLOG_COLLECTION_NAME:process.env.BLOG_COLLECTION_NAME || 'Blogs',
    POST_COLLECTION_NAME:process.env.POST_COLLECTION_NAME || 'Posts',
}
console.log(process.env.MONGO_URL)
// console.log(process.env.ADMIN)