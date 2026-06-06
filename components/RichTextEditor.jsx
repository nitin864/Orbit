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
                useContainer={true}
            />
        </View>
    );
};

export default RichTextEditor;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        overflow: "hidden",
        borderRadius: theme.radius.xl,
    },

    richbar: {
        backgroundColor: "#161B22",
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.08)",
        paddingHorizontal: 6,
        marginBottom: 40
    },

    richbarContainer: {
        paddingVertical: 10,
        paddingHorizontal: 4,
    },

    rich: {
        minHeight: 280,
        backgroundColor: "#0F1419",
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderColor: "rgba(29,155,240,0.25)",
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        overflow: "hidden",
    },

    contentStyle: {
        backgroundColor: "#0F1419",
        color: "#E7E9EA",
        caretColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        lineHeight: 26,
    },
});