import React from "react";

type Bubble = { message: string };
export const RightBubble = ({ message }: Bubble) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
        {message}
      </div>
    </div>
  );
};

export const LeftBubble = ({ message }: Bubble) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {message}
      </div>
    </div>
  );
};
