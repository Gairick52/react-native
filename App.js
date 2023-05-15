import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { getPrice } from "./apiEndpoints/api1";
import { formatCurrency } from "./utils/helper";

const App = observer(() => {
  const { walletStore } = useStore(); // Get the walletStore from the root store
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [polygonPrice, setPolygonPrice] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [transactionFee, setTransactionFee] = useState(0);
  const [importingWallet, setImportingWallet] = useState(false);
  const [walletImportError, setWalletImportError] = useState(null);

  // Fetch Bitcoin and Polygon prices on mount
  useEffect(() => {
    const fetchPrices = async () => {
      const bitcoinPrice = await getPrice("bitcoin");
      const polygonPrice = await getPrice("polygon");
      setBitcoinPrice(bitcoinPrice);
      setPolygonPrice(polygonPrice);
    };
    fetchPrices();
  }, []);

  // Event handlers
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

  const handleTransactionSend = async () => {
    try {
      const { status, fee } = await walletStore.sendTransaction();
      setTransactionStatus(status);
      setTransactionFee(fee);
    } catch (error) {
      console.error(error);
      setTransactionStatus("failed");
    }
  };

  const handleImportWallet = async (privateKey) => {
    try {
      await walletStore.importWallet(privateKey);
      setImportingWallet(false);
    } catch (error) {
      console.error(error);
      setWalletImportError(error.message);
    }
  };

  const handleCancelImport = () => {
    setImportingWallet(false);
  };

  const handleStartImport = () => {
    setImportingWallet(true);
    setWalletImportError(null);
  };

  const handleRefresh = async () => {
    const bitcoinPrice = await getPrice("bitcoin");
    const polygonPrice = await getPrice("polygon");
    setBitcoinPrice(bitcoinPrice);
    setPolygonPrice(polygonPrice);
  };

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
    priceContainer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    priceLabel: {
      fontWeight: "bold",
      marginRight: 10,
    },
    price: {
      fontWeight: "bold",
    },
    transactionStatus: {
      marginTop: 20,
      fontWeight: "bold",
    },
    transactionFee: {
      marginTop: 10,
      color: "#777",
    },
    blockExplorerLink: {
      marginTop: 20,
      color: "#007AFF",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          value={walletStore.sendAmount}
          onChangeText={handleSendAmountChange}
        />
      </View>

      {/* Button to send transaction */}
      <View style={styles.buttonContainer}>
        <Button
          title="Send Transaction"
          onPress={() => {
            walletStore.sendTransaction().then(({ status, fee }) => {
              setTransactionStatus(status);
              setTransactionFee(fee);
            });
          }}
          disabled={!walletStore.isValidTransaction}
        />
      </View>

      {/* Transaction status and fee */}
      <View>
        <Text>Transaction Status: {transactionStatus}</Text>
        <Text>Transaction Fee: {transactionFee}</Text>
      </View>
    </ScrollView>
  );
});

export default App;
