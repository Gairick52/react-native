import { createContext, useContext } from "react";
import WalletStore from ".stores/walletStore";

export class RootStore {
  walletStore = new WalletStore();
}

export const rootStore = new RootStore();

const RootStoreContext = createContext(rootStore);

export const useStore = () => {
  return useContext(RootStoreContext);
};
