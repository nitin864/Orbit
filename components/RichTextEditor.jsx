import { StyleSheet, View } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { theme } from "../constants/theme";

const RichTextEditor = ({ editorRef, onChange }) => {
    return (
        <View style={styles.container}>
            <RichToolbar
                editor={editorRef}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.setStrikethrough,

                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.checkboxList,

                    actions.insertLink,
                    actions.insertImage,
                    actions.insertVideo,

                    actions.undo,
                    actions.redo,
                    actions.removeFormat,
                ]}
                style={styles.richbar}
                flatContainerStyle={styles.richbarContainer}
                selectedIconTint={theme.colors.primary}
                disabled={false}
            />

            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                editorStyle={styles.contentStyle}
                placeholder="Share your orbit with the world..."
                initialHeight={150}
                onChange={onChange}
            />
        </View>
    );
};

export default RichTextEditor;

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
    },
    richbar: {
        borderTopRightRadius: theme.radius.xl,
        borderTopLeftRadius: theme.radius.xl,
        backgroundColor: theme.colors.darkLight,
    },
    richbarContainer: {
        borderRadius: 10,
        paddingVertical: 8,
    },
    rich:{
        backgroundColor: theme.colors.darkLight,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,   
    },
    contentStyle: {
        color: theme.colors.text,
        fontSize: 16,
    },
});