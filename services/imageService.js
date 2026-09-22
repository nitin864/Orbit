import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '../lib/supabse';

export const getUserImage = (imagePath) => {
  if (imagePath) {
    return { uri: imagePath };
  }

  return require('../assets/images/default.png');
};

export const uploadFile = async (
  folderName,
  fileUri,
  isImage = true
) => {
  try {
    const fileName = getFilePath(folderName, isImage);

    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileData = decode(fileBase64);

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, fileData, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/jpeg' : 'video/mp4',
      });

    if (error) {
      console.log('file upload error:', error);

      return {
        success: false,
        msg: 'Could not upload media',
      };
    }

    console.log('Upload data:', data);

    return {
      success: true,
      data: data.path,
    };
  } catch (error) {
    console.log('file upload error:', error);

    return {
      success: false,
      msg: 'Could not upload media',
    };
  }
};

export const getFilePath = (folderName, isImage) => {
  return `/${folderName}/${Date.now()}${isImage ? '.jpg' : '.mp4'}`;
};