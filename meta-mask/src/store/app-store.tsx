/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-imports */
// @ts-nocheck
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApiStore, useAuthStore } from "./use-api";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/api.util";
import Cookies from "js-cookie";
import { IInitialState, IUser } from "../utils/app.interface";
import { toast } from "react-hot-toast";

const initialState: IInitialState = {
  account: "",
  error: "",
  handleWalletConnection: (_username: string) => {},
  handleLogout: () => {},
  sendMessages: (
    _userId: string,
    _senderAddress: string,
    _receiverAddress: string,
    _message: string
  ) => {},
  getUserDetails: () => {
    return {} as IUser;
  },
  getOnetoOneMessages: (_address: string, _receiverAddress: string) => {},
  handleReceiverAddress: (_address: string) => {},
  getReceiverAddress: () => {
    return "";
  },
  isAuthenticated: false,
};

const { ethereum } =
  typeof window !== "undefined"
    ? window
    : ({ ethereum: undefined } as typeof window & { ethereum?: any });

export const AppContext = createContext(initialState);

export const useAppStore = () => useContext(AppContext);

const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState();

  const router = useRouter();

  const { postApiData, fetchApiData } = useApiStore();

  const { setToken } = useAuthStore();

  const checkTokenExpired = () => {
    const token = Cookies.get("token");
    if (!token) {
      // token not found, log out user
      // logout();
      return;
    }

    const expires = new Date(token.expires);
    console.log("expires:", expires);
    if (expires < new Date()) {
      // token has expired, clear cookie and log out user
      Cookies.remove("token");
      // logout();
    }
  };
  checkTokenExpired();

  const checkEtherumExists = () => {
    if (!ethereum) {
      setError("Please install metamask");

      toast("Please install metamask");

      return false;
    }
    return true;
  };

  const handleWalletConnection = async (username: string) => {
    if (checkEtherumExists()) {
      try {
        if (username) {
          try {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });

            const existingAddress = Cookies.get("token");

            const payload = {
              username: username,
              address: accounts[0],
            };

            const res = await postApiData("login", payload);
            localStorage.setItem("user", JSON.stringify(res.user));
            setAccount(accounts[0]);

            setToken(accounts[0]);

            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", true);
            router.push(ROUTES.CHATS);
          } catch (error) {
            setError(error?.message);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const sendMessages = async (
    userId: string,
    senderAddress: string,
    receiverAddress: string,
    message: string
  ) => {
    try {
      await postApiData("send-message", {
        userId,
        senderAddress,
        receiverAddress,
        message,
      });
    } catch (err) {
      console.log("err:", err);
    }
  };

  const getUserDetails = () => {
    if (typeof window !== "undefined") {
      const item = JSON?.parse(localStorage.getItem("user") as string);

      return item as IUser;
    }
  };

  const getOnetoOneMessages = async (
    address: string,
    receiverAddress: string
  ) => {
    try {
      const response = await fetchApiData(
        `get-message/${address}-${receiverAddress}-channel`
      );

      return response?.messages;
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleLogout = async () => {
    try {
      Cookies.remove("token", { path: "/" });
      localStorage.removeItem("receiverAddress");
      localStorage.removeItem("isAuthenticated");
      router.replace(ROUTES.HOME);
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleReceiverAddress = (address: string) => {
    localStorage.setItem("receiverAddress", JSON.stringify(address));
  };

  const getReceiverAddress = () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = JSON.parse(
        localStorage.getItem("receiverAddress") as string
      );

      return item;
    }
  };

  const storeContext = useMemo(
    () => ({
      handleWalletConnection,
      handleLogout,
      account,
      error,
      sendMessages,
      getUserDetails,
      getOnetoOneMessages,
      handleReceiverAddress,
      getReceiverAddress,
      isAuthenticated,
    }),
    []
  );

  useEffect(() => {
    window?.ethereum?.on("accountsChanged", async function (accounts) {
      // Time to reload your interface with accounts[0]!
      const payload = {
        username: "",
        address: accounts[0],
      };

      const res = await postApiData("login", payload);
      localStorage.setItem("user", JSON.stringify(res.user));
      setAccount(accounts[0]);

      setToken(accounts[0]);

      router.reload();
    });
  }, []);

  useEffect(() => {
    const isTokenPresent = Cookies.get("token");
    console.log("isTokenPresent:", isTokenPresent);
    console.log("router.pathname:", router.pathname);

    if (!isTokenPresent && router.pathname === "/chats") {
      router.push("/sign-up/");
    }
  });

  return (
    <AppContext.Provider value={storeContext}>{children}</AppContext.Provider>
  );
};

export default AppStoreProvider;
