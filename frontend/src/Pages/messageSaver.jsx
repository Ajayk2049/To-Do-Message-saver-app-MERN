import { useState, useEffect } from "react";

const MessageSaver = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch messages");
      setMessage(data);
    } catch (err) {
      console.error(err);
      window.alert("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const storeMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/messages/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to store message");

      setInput("");
      fetchMessages(); // Refresh list
    } catch (err) {
      console.error(err);
      window.alert("Error storing message");
    }
  };

  const submitHandle = (e) => {
    if (e.key === "Enter") {
      storeMessage();
    }
  };

  const handleDeleteOne = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/delete-one/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete message");
      fetchMessages();
    } catch (err) {
      console.error(err);
      window.alert("Error deleting message");
    }
  };

  const deleteMessages = async () => {
    if (message.length === 0) {
      window.alert("No messages to delete");
      return;
    }

    const confirmed = window.confirm("Delete all messages?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:5000/api/messages/delete-all", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete all messages");

      setMessage([]);
      window.alert("Messages deleted");
    } catch (err) {
      console.error(err);
      window.alert("Error deleting messages");
    }
  };

  const startEdit = (msg) => {
    setEditingID(msg._id);
    setEditedMessage(msg.message);
  };

  const cancelEdit = () => {
    setEditingID(null);
    setEditedMessage("");
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: editedMessage }),
      });

      if (!res.ok) throw new Error("Failed to update message");

      fetchMessages();
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Error saving message");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-36">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6">Message Saver</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Message"
              className="border border-gray-400 px-4 py-2 rounded w-64"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={submitHandle}
            />
            <button
              className="bg-[#6D8CB7] hover:bg-[#8EA5C7] text-white px-4 py-2 rounded ml-2 transition-all"
              onClick={storeMessage}
            >
              Submit
            </button>
            <button
              className="bg-[#FF5555] hover:bg-[#FF8080] text-white px-4 py-2 rounded ml-2 transition-all"
              onClick={deleteMessages}
            >
              Delete all
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-9">
        <div className="border border-gray-400 rounded p-4 w-[25rem] h-[20rem] overflow-y-auto">
          <ul className="list-none">
            {message.map((msg, index) => (
              <li
                key={msg._id}
                className="group relative p-3 bg-white mb-3 w-[15rem] rounded-xl font-bold text-lg hover:bg-[#CDDCD8] transition-colors"
              >
                {editingID === msg._id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="px-2 py-1 rounded border"
                    />
                    <button
                      className="px-2 py-1 text-green-700 hover:text-green-900"
                      onClick={() => saveEdit(msg._id)}
                    >
                      💾
                    </button>
                    <button
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                      onClick={cancelEdit}
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <>
                    {index + 1}. {msg.message}
                    <button
                      className="absolute right-3 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteOne(msg._id)}
                    >
                      🗑️
                    </button>
                    <button
                      className="absolute right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => startEdit(msg)}
                    >
                      ✏️
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageSaver;
