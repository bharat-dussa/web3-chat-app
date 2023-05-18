export interface IChannel {
  channelRef: string;
  channelRef2: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  username: string;
  address: string;
  bio?: string;
  myChannels?: Array<IChannel>;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export interface IMessage {
  channelId: string;
  message: string;
  sender: string;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInitialState {
  account: string;
  error: string;
  handleWalletConnection: (username: string) => void;
  handleLogout: () => void;
  sendMessages: (
    userId: string,
    senderAddress: string,
    receiverAddress: string,
    message: string
  ) => void;
  getUserDetails: () => IUser;
  getOnetoOneMessages: (address: string, receiverAddress: string) => void;
  handleReceiverAddress: (address: string) => void;
  getReceiverAddress: () => string;
  isAuthenticated: boolean;
}
