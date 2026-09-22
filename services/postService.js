import { supabase } from "../lib/supabse";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {

 

    try{
        
        //upload image
        if(post.file && typeof  post.file == "object"){
            let isImage = post?.file?.type == "image";
            let folderName = isImage? 'postImages' : "postVideos" ; 
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
            if(fileResult.success) post.file = fileResult.data;
            else{
                return fileResult;
            }
        }

        const {data, error} = await supabase
        .from('posts')
        .upsert(post)
        .select()
        .single();

        if(error){
            console.log('CreatePost Error', error);
            return {success: false, msg: 'Could not create your Post'}

        }

        return {success: true, data: data};

        

    }catch(error){
        console.log('Error creating or updating post: ', error);
        return {success: false, msg: error.message}
    }
}