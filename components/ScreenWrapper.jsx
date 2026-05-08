import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ children, bg }) => {

    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: bg || 'white',
                paddingTop: top
            }}
        >
            {children}
        </View>
    );
};

export default ScreenWrapper;