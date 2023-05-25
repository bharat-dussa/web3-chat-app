import React, { useEffect, useState } from "react";
import { Avatar, Button, Layout, Menu, MenuProps, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RightBubble } from "../../elements/chat-bubble.element";
import { useAppStore } from "../../store/app-store";
import AddUserModal from "../../components/add-user-modal/add-user-modal.component";
import { BottomBar } from "../../components/bottom-bar/bottom-bar.component";
import { IMessage, IUser } from "../../utils/app.interface";

const { Header, Content, Sider } = Layout;

const index = () => {
  const [user, setUser] = useState<IUser>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { getReceiverAddress, getOnetoOneMessages } =
    useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { handleLogout } = useAppStore();
  const receiverAddress = getReceiverAddress();

  const handleNewChat = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [UserOutlined].map(() => ({
    key: String(getReceiverAddress()),
    icon: React.createElement(Avatar),
    label: getReceiverAddress(),
  }));

  const handleMenuItemClick = async () => {
    if (user) {
      const res = await getOnetoOneMessages(
        user?.address,
        receiverAddress as unknown as string
      );

      setMessages(res as unknown as IMessage[]);
    }
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push(ROUTES.HOME);
  //   }
  // }, [r]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = JSON.parse(localStorage.getItem("user") as string);

      setUser(item);
    }
  }, []);

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
                  <RightBubble
                    message={message?.message}
                    date={(message).date || (message).createdAt as Date}
                  />
                ))}
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
