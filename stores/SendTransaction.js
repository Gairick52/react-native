import React from "react";
import { observer, inject } from "mobx-react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// Inject walletStore and observe changes to re-render component
@inject("walletStore")
@observer
class SendTransaction extends React.Component {
  // Handle sending transaction
  handleSendTransaction = () => {
    const { receiverAddress, amount } = this.state;
    const { sendTransaction } = this.props.walletStore;
    sendTransaction(receiverAddress, amount);
    this.setState({ receiverAddress: "", amount: "" });
  };

  render() {
    // Destructure properties from walletStore
    const { network, receiverAddress, amount } = this.props.walletStore;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      inputContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
      },
      label: {
        fontWeight: "bold",
        marginRight: 10,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
      },
      buttonContainer: {
        marginTop: 20,
      },
      button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
      },
    });

    return (
      // Render the component
      <View style={styles.container}>
        <Text style={styles.heading}>
          Send {network === "bitcoin" ? "bitcoin" : "USDT"}
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Receiver Address:</Text>
          <TextInput
            style={styles.input}
            value={receiverAddress}
            placeholder="Receiver Address"
            onChangeText={(text) =>
              this.props.walletStore.setReceiverAddress(text)
            }
          />
        </View>
        {/* Display input field for receiver address */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder="Amount"
            onChangeText={(text) => this.props.walletStore.setAmount(text)}
          />
        </View>
        {/* Display send button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Send"
            onPress={this.handleSendTransaction}
            style={styles.button}
            disabled={!receiverAddress || !amount}
          />
        </View>
      </View>
    );
  }
}

export default SendTransaction;
