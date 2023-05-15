// Import necessary libraries
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/rootStore";
import { formatCurrency } from "../utils/helpers";
import bitcoinIcon from "../assets/images/bitcoin.png";
import usdtIcon from "../assets/images/usdt.png";

// Create a component called PriceDisplay that observes state changes in walletStore
const PriceDisplay = observer(() => {
  // Get walletStore and navigate from the root store and navigation hook respectively
  const { walletStore } = useStore();
  const { navigate } = useNavigation();

  // Fetch live prices on initial render and whenever walletStore changes
  useEffect(() => {
    walletStore.fetchLivePrice();
  }, [walletStore]);

  // Render the component
  return (
    <View style={styles.container}>
      {/* Display Bitcoin price */}
      <View style={styles.row}>
        <Image source={bitcoinIcon} style={styles.icon} />
        <Text style={styles.label}>Bitcoin Price:</Text>
        <Text style={styles.price}>
          {formatCurrency(walletStore.btcPrice, "USD")}
        </Text>
      </View>
      {/* Display USDT price if network is Polygon */}
      {walletStore.network === "polygon" && (
        <View style={styles.row}>
          <Image source={usdtIcon} style={styles.icon} />
          <Text style={styles.label}>USDT Price:</Text>
          <Text style={styles.price}>
            {formatCurrency(walletStore.usdtPrice, "USD")}
          </Text>
        </View>
      )}
      {/* Add a link to the price history screen */}
      <Text style={styles.link} onPress={() => navigate("PriceHistory")}>
        View Price History
      </Text>
    </View>
  );
});

// Create styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    flex: 1,
  },
  price: {
    fontSize: 18,
  },
  link: {
    color: "#007AFF",
    textAlign: "center",
  },
});

// Export the PriceDisplay component
export default PriceDisplay;
  