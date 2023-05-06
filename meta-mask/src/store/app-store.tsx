/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-imports */
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
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const initialState = {
  account: "",
  error: "",
  handleWalletConnection: (username: string) => {},
  handleLogout: () => {},
  sendMessages: (
    userId: string,
    senderAddress: string,
    receiverAddress: string,
    message: string
  ) => {},
  getUserDetails: () => {},
  getOnetoOneMessages: (address: string, receiverAddress: string) => {},
  handleReceiverAddress: (address: string) => {},
  getReceiverAddress: () => {},
};

const { ethereum } =
  typeof window !== "undefined"
    ? window
    : ({ ethereum: undefined } as Window & { ethereum?: any });

export const AppContext = createContext(initialState);

export const useAppStore = () => useContext(AppContext);

const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const { postApiData, data, fetchApiData } = useApiStore();

  const { setToken } = useAuthStore();

  const checkEtherumExists = () => {
    if (!ethereum) {
      setError("Please install metamask");

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
            setCookie("token", accounts[0], {
              path: "/",
              maxAge: 1800, // Expires after 1hr
              sameSite: true,
            });
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

      return item;
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
      console.log("response:", response);

      return response?.messages;
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleLogout = async () => {
    try {
      Cookies.remove("token", { path: "/" });
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
    }),
    []
  );

  useEffect(() => {
    window?.ethereum.on("accountsChanged", async function (accounts) {
      console.log("accounts:", accounts);
      // Time to reload your interface with accounts[0]!
      const payload = {
        username: "",
        address: accounts[0],
      };

      const res = await postApiData("login", payload);
      localStorage.setItem("user", JSON.stringify(res.user));
      setAccount(accounts[0]);
      setCookie("token", accounts[0], {
        path: "/",
        maxAge: 1800,
        sameSite: true,
      });
    });
  }, []);

  useEffect(() => {
    setToken(data?.address);
  }, [data]);

  return (
    <AppContext.Provider value={storeContext}>{children}</AppContext.Provider>
  );
};

export default AppStoreProvider;
