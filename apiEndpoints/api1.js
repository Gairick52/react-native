async function getPrice(crypto) {
  try {
    const response = await fetch(`https://api.example.com/prices/${crypto}`);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const sendTransaction = async (
  network,
  privateKey,
  receiverAddress,
  sendAmount
) => {
  // This is where you would make an API call to actually send the transaction
  // For example, you might use the Bitcoin API to construct and broadcast a transaction
  // Here, we're just simulating the API call with a timeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: "success",
        fee: 0.001,
      });
    }, 2000);
  });
};
