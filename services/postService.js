import { supabase } from "../lib/supabse";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
  try {
    // Upload image/video
    if (post.file && typeof post.file === "object") {
      const isImage = post?.file?.type === "image";
      const folderName = isImage ? "postImages" : "postVideos";

      const fileResult = await uploadFile(
        folderName,
        post?.file?.uri,
        isImage
      );

      console.log("fileResult:", fileResult);

      if (fileResult.success) {
        post.file = fileResult.data;
      } else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("CreatePost Error:", error);

      return {
        success: false,
        msg: "Could not create your Post",
      };
    }

    console.log("Created post:", data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log("Error creating or updating post:", error);

    return {
      success: false,
      msg: error.message,
    };
  }
};

export const fetchPosts = async (limit=10) => {
  try {
     
    const {data, error} = await supabase
    .from('posts')
    .select(`
       *,
       user: users (id, name, image)
      `)
    .order('created_at',  {ascending: false})
    .limit(limit);

    if(error){
      console.log('fetchPosts error:', error)
      return {success: false, msg: 'Could not fetched the posts'}
    }

    return {success: true, data: data}
    
  } catch (error) {
    console.log("Could not fetched the posts:", error);

    return {
      success: false,
      msg: error.message,
    };
  }
};