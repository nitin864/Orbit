import { StyleSheet, View } from "react-native";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { theme } from "../constants/theme";

const RichTextEditor = ({ editorRef, onChange }) => {
    return (
        <View style={styles.container}>
            {/* Toolbar */}
            <View style={styles.toolbarWrapper}>
                <RichToolbar
                    editor={editorRef}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.setStrikethrough,
                        actions.code,
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
                    iconTint="#94A3B8"
                    selectedIconTint={theme.colors.primary}
                />
            </View>

            {/* Editor */}
            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                placeholder="✨ Share your orbit with the world..."
                placeholderColor="#71767B"
                initialHeight={250}
                useContainer={true}
                onChange={onChange}
                editorStyle={{
                    backgroundColor: "#0F1419",
                    color: "#E7E9EA",
                    placeholderColor: "#71767B",
                    cssText: `
                        body {
                            background-color: #0F1419;
                            color: #E7E9EA;
                            font-size: 16px;
                            line-height: 26px;
                            padding: 12px;
                            margin: 0;
                        }

                        .placeholder {
                            color: #71767B !important;
                        }
                    `,
                }}
            />
        </View>
    );
};

export default RichTextEditor;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },

    toolbarWrapper: {
        marginBottom: 14,
        borderRadius: 999,
        overflow: "hidden",

        backgroundColor: "#161B22",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",

        elevation: 5,
    },

    richbar: {
        backgroundColor: "#161B22",
        borderRadius: 999,
        paddingHorizontal: 6,
    },

    richbarContainer: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        gap: 5
    },

    rich: {
        minHeight: 300,
        backgroundColor: "#0F1419",
        borderWidth: 1,
        borderColor: "rgba(29,155,240,0.18)",

        borderRadius: 24,
        overflow: "hidden",
    },

});