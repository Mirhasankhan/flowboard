import { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  type: string;
  [key: string]: any;
}

export const useChatSocket = (token: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const activeRoomRef = useRef<string | null>(null);
  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  const connect = useCallback(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://api.passit.smtsigma.com:5006?x-token=${token}`);

    // const ws = new WebSocket(`ws://api.passit.smtsigma.com:5006?x-token=${token}`);

    ws.onopen = () => {
      console.log("✅ Connected to chat server");
      setIsReady(true);
    };

    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);

      switch (data.type) {
        case "member-conversation":
          setConversations(data.conversations);
          break;

        case "past-messages":
          setMessages(data.messages);
          setActiveRoom(data.roomId);
          break;

        case "member-new-message":
          if (data.roomId === activeRoomRef.current) {
            setMessages((prev) => {
              const filtered = prev.filter(
                (m) => !(m.isTemp && m.content === data.message.content)
              );
              return [data.message, ...filtered];
            });
          }
          break;

        case "error":
          console.error("❌", data.message);
          break;

        default:
          console.log("⚠️ Unknown event:", data);
      }
    };

    ws.onclose = () => {
      console.log("🔌 Disconnected from chat server, reconnecting in 5s...");
      setIsReady(false);
      setTimeout(connect, 5000);
    };

    setSocket(ws);
  }, [token]);

  useEffect(() => {
    connect();
    return () => {
      socket?.close();
    };
  }, [token]);

  const subscribeToUser = (receiverId: string) => {
    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "member-subscribe", receiverId }));
      setActiveRoom(receiverId);
    } else {
      const handleOpen = () => {
        socket.send(JSON.stringify({ type: "member-subscribe", receiverId }));
        setActiveRoom(receiverId);
        socket.removeEventListener("open", handleOpen);
      };
      socket.addEventListener("open", handleOpen);
    }
  };

  const sendMessage = (receiverId: string, content: string, fileUrl?: string) => {
    if (!activeRoomRef.current) return;

    const tempMessage = {
      tempId: uuidv4(),
      senderId: "self",
      content,
      fileUrl,
      isTemp: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [tempMessage, ...prev]);

    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "member-send-message", receiverId, content, fileUrl }));
    }
  };

  return { socket, conversations, messages, activeRoom, subscribeToUser, sendMessage, isReady };
};
