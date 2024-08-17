import {CreateBlogInputModel} from "../../features/blogs/types/input/create-blog-input.type";
import {CreatePostInputModel} from "../../features/posts/types/input/create-post-input.type";



export type FieldNamesType = keyof CreateBlogInputModel | keyof CreatePostInputModel;
// const f: FieldsType = 'some' // error
export type errorsMessagesType = {message: string, field: FieldNamesType}
export type OutputErrorsType = {
    errorsMessages: errorsMessagesType[]
}