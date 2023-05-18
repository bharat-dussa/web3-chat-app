import React from "react";

type Bubble = { message: string, date: Date };

const formatDate = (isoDate: Date) => {
  const date = new Date(isoDate);

  const formatter = new Intl.DateTimeFormat('en-US');

  return formatter.format(date);;
}

export const RightBubble = ({ message, date }: Bubble) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="text-left mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
        {message}
        <p className="text-[0.6rem] bg-stone-800 p-1 rounded-full	mt-1">{formatDate(date)}</p>
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
