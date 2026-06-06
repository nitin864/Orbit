import { StyleSheet, View } from 'react-native'
import { RichToolbar, actions } from 'react-native-pell-rich-editor'

const RichTextEditor = ({
    editorRef,
    onChange,
}) => {
    return (
        <View style={{ minHeight: 285 }}>
            <RichToolbar
                actions={[
                    actions.insertImage,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.keyboard,
                    actions.setStrikethrough,
                    actions.setUnderline,
                    actions.removeFormat,
                    actions.insertVideo,
                    actions.checkboxList,
                    actions.undo,
                    actions.redo,
                ]}
                styles={styles.richbar}
                flatContainer={styles.richbarContainer}
                editor={editorRef}
                disable={false}
            />

        </View>
    )
}

export default RichTextEditor

const styles = StyleSheet.create({})