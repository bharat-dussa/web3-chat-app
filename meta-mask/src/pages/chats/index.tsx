import React, { useEffect, useState } from "react";

import { Avatar, Button, Input, Layout, Menu, MenuProps, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RightBubble } from "../../elements/chat-bubble.element";
import { useAppStore } from "../../store/app-store";
import AddUserModal from "../../components/add-user-modal/add-user-modal.component";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/api.util";

const { Header, Content, Sider } = Layout;

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

const index = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    getUserDetails,
    getReceiverAddress,
    getOnetoOneMessages,
    isAuthenticated,
  } = useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const user = getUserDetails();
  const { handleLogout } = useAppStore();
  const receiverAddress = getReceiverAddress();

  const handleNewChat = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [UserOutlined].map((icon, index) => ({
    key: String(getReceiverAddress()),
    icon: React.createElement(Avatar),
    label: getReceiverAddress(),
  }));

  const handleMenuItemClick = async (item) => {
    const res = await getOnetoOneMessages(
      user.address,
      receiverAddress as unknown as string
    );
    setMessages(res);
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push(ROUTES.HOME);
  //   }
  // }, [r]);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="text-center mb-8">
          <div
            style={{
              height: 32,
              margin: 16,
            }}
            className="text-white"
          >
            Meta Chat
          </div>
          <div className="flex flex-col gap-4 m-4">
            <Button className="text-white" onClick={handleNewChat}>
              Add new chat
            </Button>
            <Button className="text-white" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <AddUserModal
          isModalOpen={isModalOpen}
          handleModalCancel={handleModalCancel}
          handleModalOpen={(value) => setIsModalOpen(value)}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          selectedKeys={[String(getReceiverAddress())]}
          items={items}
          onClick={handleMenuItemClick}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: "0 4", background: colorBgContainer }}>
          <div className="flex items-center gap-2 fixed">
            <Avatar>B</Avatar>
            <p className="text-black">
              {user?.username} ({user?.address})
            </p>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 2,
              textAlign: "center",
              height: 600,
              maxHeight: 600,
              overflowY: "scroll",
              background: colorBgContainer,
            }}
          >
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5">
                {messages?.map((message) => (
                  <RightBubble message={message?.message} />
                ))}

                {/* <LeftBubble /> */}
              </div>
            </div>
          </div>
          <BottomBar />
        </Content>
      </Layout>
    </Layout>
  );
};

export default index;
