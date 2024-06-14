function Message({ message }) {
  return (
    <div
      className={`message_container ${
        message.error ? "error-message" : "success-message"
      }`}
    >
      {message.error || message.success}
    </div>
  );
}

export default Message;
