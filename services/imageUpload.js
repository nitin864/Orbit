import * as FileSystem from 'expo-file-system/legacy'
import { supabase } from '../lib/supabse'

export const uploadImageToSupabase = async (uri, userId, existingImageUrl) => {
  const existingPath = existingImageUrl
    ? existingImageUrl.split('/storage/v1/object/public/uploads/')[1]
    : null

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  })

  const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filePath = `avatars/${userId}_${Date.now()}.${ext}`
  const contentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`

  if (existingPath) {
    await supabase.storage.from('uploads').remove([existingPath])
  }

  const byteCharacters = atob(base64)
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }

  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(filePath, byteArray, {
      contentType,
      upsert: true,
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from('uploads').getPublicUrl(filePath)
  return data.publicUrl
}