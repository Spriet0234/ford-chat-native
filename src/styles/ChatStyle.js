import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingTop: 40,
      backgroundColor: "white",
    },
    chatContainer: {
      flex: 1,
      padding: 0,
      margin: 10,
      backgroundColor: "#fff",
      marginBottom: 0,
    },
    chatList: {},
    touchOpacityStyle : {
      backgroundColor: "white",
      color: "#00095B",
      borderRadius: 5,
      padding: 10,
      marginBottom: 0,
      borderColor: "#00095B",
      borderWidth: 1,
    },
    message: (isUser) => ({
      flexDirection: "row",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 10,
      padding: 10,
    }),
    messageContent: (isUser) => ({
      backgroundColor: isUser ? "#1D74F5" : "#00095B",
      borderTopLeftRadius: isUser ? 20 : 3,
      borderBottomLeftRadius: isUser ? 20 : 30,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      maxWidth: "70%",
    }),
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 20,
      backgroundColor: "#00095B",
      marginBottom: 0,
    },
    inputWithButton: {
      flexDirection: "row",
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#eee",
      alignItems: "center",
      paddingRight: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: 16,
    },
    sendButton: {
      padding: 10,
      color: "#ccc",
    },
    img2: {
      width: 100,
      height: 50,
    },
    botImage: {
      height: 38,
      width: 38,
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    optionButton: {
      marginRight: 10,
      backgroundColor: "#E7EBF2",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  });

  export default styles;