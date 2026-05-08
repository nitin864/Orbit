import React from "react";

const ScreenWrapper = ({ children,bg}) => {
    
    const {top} = useSAfeAreaInsets();
    const paddingTop = top>0 ? top+5 : 30

    return (
        <View style={{flex: 1, backgroundColor: bg || 'white', paddingTop}}>
            {children}
        </View>
    );
};

export default ScreenWrapper;