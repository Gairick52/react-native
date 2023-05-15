import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Define the TransactionHistory component
const TransactionHistory = ({ walletStore }) => {
  // Fetch transactions when the component mounts or when the walletStore's transactions change
  useEffect(() => {
    walletStore.fetchTransactions();
  }, [walletStore.transactions]);

  // Render a transaction item
  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionStatus}>{item.status}</Text>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
      <Text style={styles.transactionAddress}>{item.receiverAddress}</Text>
      <Text style={styles.transactionLink}>{item.transactionLink}</Text>
      <Text style={styles.transactionFee}>{item.fee}</Text>
    </View>
  );

  // Render the component
  return (
    <View style={styles.container}>
      <FlatList
        data={walletStore.transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTransaction}
        contentContainerStyle={styles.transactionList}
      />
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  transactionList: {
    padding: 20,
  },
  transaction: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionStatus: {
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primary,
  },
  transactionAmount: {
    marginBottom: 5,
  },
  transactionAddress: {
    marginBottom: 5,
  },
  transactionLink: {
    marginBottom: 5,
  },
  transactionFee: {
    color: COLORS.gray,
  },
});

// Inject the walletStore and observe the component for state changes
export default inject("walletStore")(observer(TransactionHistory));
