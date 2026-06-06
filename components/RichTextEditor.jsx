import { StyleSheet, Text, View } from "react-native";
import { RichToolbar, actions } from "react-native-pell-rich-editor";

const RichTextEditor = ({ editorRef }) => {
  return (
    <View style={styles.container}>
      <RichToolbar
  editor={editorRef}
  actions={[
    actions.heading1,
    actions.heading2,
    actions.heading3,

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
  iconMap={{
    [actions.heading1]: ({ tintColor }) => (
      <Text style={{ color: tintColor, fontWeight: "bold" }}>
        H1
      </Text>
    ),
    [actions.heading2]: ({ tintColor }) => (
      <Text style={{ color: tintColor, fontWeight: "bold" }}>
        H2
      </Text>
    ),
    [actions.heading3]: ({ tintColor }) => (
      <Text style={{ color: tintColor, fontWeight: "bold" }}>
        H3
      </Text>
    ),
  }}
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
    borderRadius: 10,
  },
  richbarContainer: {
    borderRadius: 10,
    paddingVertical: 8,
  },
});