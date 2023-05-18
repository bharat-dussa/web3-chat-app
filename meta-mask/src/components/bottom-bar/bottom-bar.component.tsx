import { Input, Button } from "antd";
import { useState } from "react";
import { useAppStore } from "../../store/app-store";
import toast from "react-hot-toast";

export const BottomBar = () => {
  const { sendMessages, getUserDetails, getReceiverAddress } = useAppStore();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const user = getUserDetails();

    const receiverAddress = getReceiverAddress();

    if (message !== "") {
      sendMessages(
        user?._id as string,
        user?.address,
        receiverAddress,
        message
      );

      setMessage("");
    } else {
      toast("Message cannot be empty", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex mt-4 gap-4">
      <Input
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};
