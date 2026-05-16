import { StyleSheet } from 'react-native';
import React from 'react';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';
import { Image } from 'expo-image';

 
export const getUserImage = (imagePath) => {
    if (imagePath && typeof imagePath === 'string') {
        return { uri: imagePath };
    } else {
        return require('../assets/images/default.png');
    }
};

const Avatar = ({
    uri,
    size = hp(4.5),
    rounded = theme.radius.md,
    style = {},
}) => {
    return (
        <Image
            source={getUserImage(uri)}
            transition={100}
            style={[
                styles.avatar,
                { height: size, width: size, borderRadius: rounded },
                style,
            ]}
            contentFit="cover"
        />
    );
};

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        borderCurve: 'continuous',
        backgroundColor: theme.colors.gray?.[300] || '#e0e0e0',
        borderWidth: 1,
        borderColor: theme.colors.gray?.[400] || '#ccc',
    },
});