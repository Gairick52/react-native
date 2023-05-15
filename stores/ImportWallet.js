import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { observable, computed, action } from "mobx";
import * as api from "./apiEndpoints/api";

const Wallet = observer(
  class Wallet {
    @observable network = "bitcoin";
    @observable privateKey = "";
    @observable receiverAddress = "";
    @observable sendAmount = 0;
    @observable transactionHistory = [];
    @observable walletInfo = null; // will hold wallet info retrieved from API
    @observable priceInfo = null; // will hold price info retrieved from API

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

    // action to send a transaction using the API
    @action sendTransaction = async () => {
      // Call API to send transaction
      const endpoint = api.getEndpoint(this.network, "sendTransaction"); // get endpoint based on network
      const { status, fee } = await api.sendTransaction(
        endpoint,
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

    // action to get wallet information from the API
    @action getWalletInfo = async () => {
      const endpoint = api.getEndpoint(this.network, "walletInfo"); // get endpoint based on network
      const result = await api.getWalletInfo(endpoint);
      this.walletInfo = result;
    };

    // action to get price information from the API
    @action getPriceInfo = async () => {
      const endpoint = api.getEndpoint(this.network, "priceInfo"); // get endpoint based on network
      const result = await api.getPriceInfo(endpoint);
      this.priceInfo = result;
    };

    // verify receiver address format based on network
    @computed get isReceiverAddressValid() {
      const addressFormat = api.getAddressFormat(this.network);
      const regex = new RegExp(addressFormat);
      return regex.test(this.receiverAddress);
    }
  }
);

const App = observer(() => {
  const [satoshiAmount, setSatoshiAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const balance = 50000;

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    if (amount < 0) {
      setError("Amount cannot be negative");
    } else if (amount > balance) {
      setError("Amount cannot be greater than your balance");
    } else {
      setError(null);
      setSatoshiAmount(amount);
    }
  };

  const handleFeeChange = (event) => {
    const fee = event.target.value;
    setFee(fee);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // simulate a delay for API call
    setTimeout(() => {
      const newBalance = balance - satoshiAmount - fee;
      setRemainingBalance(newBalance);
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="App">
      <h1>Bitcoin Wallet</h1>
      <div className="balance">Balance: {balance} satoshis</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (in satoshis):</label>
          <input
            type="number"
            id="amount"
            value={satoshiAmount}
            onChange={handleAmountChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Transaction Fee (in satoshis):</label>
          <input
            type="number"
            id="fee"
            value={fee}
            onChange={handleFeeChange}
            className="form-control"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
        {success && <div className="success">Transaction successful!</div>}
        {remainingBalance !== 0 && (
          <div className="remaining-balance">
            Remaining balance: {remainingBalance} satoshis
          </div>
        )}
      </form>
    </div>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  remainingBalanceText: {
    fontSize: 18,
  },
});
export default ImportWallet;
