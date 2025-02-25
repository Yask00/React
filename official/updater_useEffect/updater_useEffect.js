function ChatRoom({ roomId }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      const connection = createConnection();
      connection.connect();
      connection.on('message', (receivedMessage) => {
        setMessages(msgs => [...msgs, receivedMessage]);
      });
      return () => connection.disconnect();
    }, [roomId]); // ✅ All dependencies declared
    // ...
}