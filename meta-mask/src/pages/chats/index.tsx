import React, { useState } from "react";

import {
  Avatar,
  Button,
  Col,
  Input,
  Layout,
  Menu,
  MenuProps,
  Row,
  theme,
} from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { LeftBubble, RightBubble } from "../../elements/chat-bubble.element";
import { useAuthStore } from "../../store/use-api";
import { useAppStore } from "../../store/app-store";
import AddUserModal from "../../components/add-user-modal/add-user-modal.component";

export const BottomBar = () => {
  const { sendMessages, getUserDetails, getReceiverAddress } = useAppStore();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const user = getUserDetails();

    const receiverAddress = getReceiverAddress();
    
    sendMessages(user._id, user.address, receiverAddress, message);
  };

  return (
    <div className="flex mt-4 gap-4">
      <Input placeholder="Type something..." onChange={(e) => setMessage(e.target.value)}/>
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};

const index = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { getUserDetails, getReceiverAddress, getOnetoOneMessages } =
    useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  console.log("messages:", messages);

  const user = getUserDetails();

  const handleNewChat = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const receiverAddress = getReceiverAddress();

  const { Header, Content, Footer, Sider } = Layout;

  const items: MenuProps["items"] = [UserOutlined].map((icon, index) => ({
    key: String(index + 1),
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
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Button className="text-white" onClick={handleNewChat}>
            Add new chat
          </Button>
        </div>
        <AddUserModal
          isModalOpen={isModalOpen}
          handleModalCancel={handleModalCancel}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
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
