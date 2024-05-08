// // ChatPanel.tsx
// import React, { FormEvent, useState } from "react";

// type TMessage = {
//   userId: string;
//   message: string | undefined;
// };

// type ChatPanelProps = {
//   messages: TMessage[];
//   userId: string;
//   onMessageSend: (message: string) => void;
// };

// export const ChatPanel = ({ messages, userId, onMessageSend }: ChatPanelProps) => {
//   const [input, setInput] = useState("");

//   function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     if (input.trim()) {
//       onMessageSend(input.trim());
//       setInput("");
//     }
//   }

//   function convertToYouThem(message: TMessage) {
//     return message.userId === userId ? "You" : "Them";
//   }

//   return (
//     <div className="chat-panel">
//       <ul>
//         {messages.map((message, idx) => (
//           <li key={idx}>
//             {convertToYouThem(message)} - {message.message}
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// };
import React, { FormEvent, useState } from "react";

export type TMessage = {
  userId: string;
  message?: string; // Optional message to maintain compatibility
};

type ChatPanelProps = {
  messages: TMessage[];
  userId: string;
  onMessageSend: (message: string) => void;
};

export const ChatPanel = ({ messages, userId, onMessageSend }: ChatPanelProps) => {
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      onMessageSend(input.trim());
      setInput("");
    }
  }

  function convertToYouThem(message: TMessage) {
    return message.userId === userId ? "You" : "Them";
  }

  return (
    <div
      className="chat-panel"
      style={{
        backgroundColor: "#1c1c1c",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {messages.map((message, idx) => (
          <li
            key={idx}
            style={{
              margin: "5px 0",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#2b2b2b",
            }}
          >
            <strong>{convertToYouThem(message)}:</strong> {message.message}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            backgroundColor: "#2b2b2b",
            color: "#ffffff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
