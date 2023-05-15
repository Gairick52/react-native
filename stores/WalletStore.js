import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";

import * as api from "./apiEndpoints/api";

class WalletStore {
  @observable network = "Bitcoin";
  @observable privateKey = "";
  @observable receiverAddress = "";
  @observable sendAmount = 0;
  @observable transactionHistory = [];

  @computed get isValidTransaction() {
    // Check that all fields are filled out
    return (
      this.network !== "" &&
      this.privateKey !== "" &&
      this.receiverAddress !== "" &&
      this.sendAmount !== 0
    );
  }

  @action setNetwork = (network) => {
    this.network = network;
  };

  @action setPrivateKey = (privateKey) => {
    this.privateKey = privateKey;
  };

  @action setReceiverAddress = (receiverAddress) => {
    this.receiverAddress = receiverAddress;
  };

  @action setSendAmount = (sendAmount) => {
    this.sendAmount = sendAmount;
  };

  @action sendTransaction = async () => {
    // Call API to send transaction
    const { status, fee } = await api.sendTransaction(
      this.network,
      this.privateKey,
      this.receiverAddress,
      this.sendAmount
    );
    // Add transaction to history
    this.transactionHistory.push({
      network: this.network,
      receiverAddress: this.receiverAddress,
      amount: this.sendAmount,
      fee,
      status,
    });
    // Reset form fields
    this.network = "";
    this.privateKey = "";
    this.receiverAddress = "";
    this.sendAmount = 0;
    return { status, fee };
  };
}

const walletStore = new WalletStore();

// Create App component
const App = observer(() => {
  // Handler functions for input changes
  const handleNetworkChange = (network) => {
    walletStore.setNetwork(network);
  };

  const handlePrivateKeyChange = (privateKey) => {
    walletStore.setPrivateKey(privateKey);
  };

  const handleReceiverAddressChange = (receiverAddress) => {
    walletStore.setReceiverAddress(receiverAddress);
  };

  const handleSendAmountChange = (sendAmount) => {
    walletStore.setSendAmount(sendAmount);
  };

  // Create styles for the component
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
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

  // Render the component
  return (
    <View style={styles.container}>
      {/* Input field for network */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Network:</Text>
        <TextInput
          style={styles.input}
          value={walletStore.network}
          onChangeText={handleNetworkChange}
        />
      </View>

      {/* Input field for private key */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Private Key:</Text>
        <TextInput
          style={styles.input}
          value={walletStore.privateKey}
          onChangeText={handlePrivateKeyChange}
        />
      </View>
      {/* Input field for receiver address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Receiver Address:</Text>
        <TextInput
          style={styles.input}
          value={walletStore.receiverAddress}
          onChangeText={handleReceiverAddressChange}
        />
      </View>

      {/* Input field for send amount */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Send Amount:</Text>
        <TextInput
          style={styles.input}
          value={walletStore.sendAmount.toString()}
          onChangeText={handleSendAmountChange}
        />
      </View>

      {/* Send transaction button */}
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Send Transaction"
          onPress={walletStore.sendTransaction}
          disabled={!walletStore.isValidTransaction}
        />
      </View>
    </View>
  );
});

export default WalletStore;
