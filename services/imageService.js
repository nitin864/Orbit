 
export const getUserImage = (imagePath) => {
    if (imagePath) {
        return { uri: imagePath };            
    } else {
        return require('../assets/images/default.png');  
    }
};

export const uploadFile = async (folderName, fileUri, isImage = true) => {
  try {
    const fileName = getFilePath(folderName, isImage);

    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imageData = decode(fileBase64); // array buffer

    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(fileName, imageData, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/*' : 'video/*',
      });

    if (error) {
      console.log('file upload error: ', error);
      return {
        success: false,
        msg: 'Could not upload media',
      };
    }

    console.log('data: ', data);

    return {
      success: true,
      data: data.path,
    };
  } catch (error) {
    console.log('file upload error: ', error);

    return {
      success: false,
      msg: 'Could not upload media',
    };
  }
};

export const getFilePath = (folderName, isImage) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};