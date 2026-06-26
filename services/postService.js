export const createOrUpdatePost = async (post) => {

    try{
        

    }catch(error){
        console.log('Error creating or updating post: ', error);
        return {success: false, msg: error.message}
    }
}