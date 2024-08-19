import {Db, Collection, MongoClient} from "mongodb"
import {BlogDbModel} from '../../types/db/blog-db.model'
import {PostDbModel} from '../../types/db/post-db.model'
import {SETTINGS} from "../../../settings";




// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const dbMongo: Db = client.db(SETTINGS.MONGO_DB);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbModel> = dbMongo.collection<BlogDbModel>(SETTINGS.BLOG_COLLECTION_NAME)

export const postCollection: Collection<PostDbModel> = dbMongo.collection<PostDbModel>(SETTINGS.POST_COLLECTION_NAME)

// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}