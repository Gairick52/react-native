// Format currency function
export const formatCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(value);
};

// Validate private key function
export const validatePrivateKey = (privateKey) => {
  // Implement private key validation logic here
  if (privateKey.length !== 64) {
    throw new Error("Invalid private key");
  }
};

// Validate receiver address function
export const validateReceiverAddress = (receiverAddress) => {
  // Implement receiver address validation logic here
  if (receiverAddress.length !== 42) {
    throw new Error("Invalid receiver address");
  }
};

// Display error message function
export const displayErrorMessage = (errorMessage) => {
  // Implement error message display logic here
  alert(errorMessage);
};
