import React, { useCallback } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { useWalletStore } from "./stores/WalletStore";

// Create a component called SwitchNetwork that observes state changes in the walletStore
const SwitchNetwork = observer(() => {
  // Get walletStore
  const walletStore = useWalletStore();

  // Define a function to toggle between Bitcoin and Polygon networks
  const toggleNetwork = useCallback(() => {
    // If current network is Bitcoin, switch to Polygon; otherwise switch to Bitcoin
    const network = walletStore.network === "bitcoin" ? "polygon" : "bitcoin";
    walletStore.setNetwork(network);
  }, [walletStore]);

  // Render the component
  return (
    <View style={styles.container}>
      {/* Display the label /}
<Text style={styles.label}>Switch Network:</Text>
{/ Display the Switch component */}
      <Switch
        value={walletStore.network === "polygon"}
        onValueChange={toggleNetwork}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={walletStore.network === "polygon" ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
});

// Create styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
});

// Export the SwitchNetwork component
export default SwitchNetwork;
