import { Input, Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppStore } from "../../store/app-store";

export const BottomBar = () => {
    const { sendMessages, getUserDetails, getReceiverAddress } = useAppStore();
    const [message, setMessage] = useState("");
    const router = useRouter();
  
    const handleSubmit = () => {
      const user = getUserDetails();
  
      const receiverAddress = getReceiverAddress();
  
      sendMessages(user._id, user.address, receiverAddress, message);
  
      setMessage("");
      router.reload(); // webscoket is not implemented so it's need to be reload
    };
  
    return (
      <div className="flex mt-4 gap-4">
        <Input
          placeholder="Type something..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    );
  };