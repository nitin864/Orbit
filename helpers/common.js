

import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const wp = percentage => {
    return (parseFloat(percentage) * width) / 100
}

export const hp = percentage => {
    return (parseFloat(percentage) * height) / 100
}