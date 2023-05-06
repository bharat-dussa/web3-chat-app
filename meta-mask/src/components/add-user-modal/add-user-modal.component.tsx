import { Input, Modal } from "antd";
import React, { useState } from "react";
import { useAppStore } from "../../store/app-store";

type IAddUserModal = {
  isModalOpen: boolean;
  handleModalCancel: () => void;
};
const AddUserModal = ({ isModalOpen, handleModalCancel }: IAddUserModal) => {
  const [address, setAddress] = useState("");

  const { handleReceiverAddress } = useAppStore();

  const handleOk = () => {
    handleReceiverAddress(address);
  };


  return (
    <Modal
      title="Add New Chat"
      open={isModalOpen}
      onCancel={handleModalCancel}
      onOk={handleOk}
    >
      <Input
        name="walletAddress"
        onChange={(e) => setAddress(e.target.value)}
      />
    </Modal>
  );
};

export default AddUserModal;
