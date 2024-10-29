import React from "react";

interface message {
  message: string;
}

const Error = ({ message }: message) => {
  return (
    <div>
      {message ? (
        <div className="bg-red-400 rounded p-5 m-2">
          <h1 className="text-white">{message}</h1>
        </div>
      ) : null}
    </div>
  );
};

export default Error;
