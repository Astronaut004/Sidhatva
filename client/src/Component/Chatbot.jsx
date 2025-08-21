import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [awaitingInput, setAwaitingInput] = useState(null);

  const sendQuery = async (endpoint, payload = {}) => {
    try {
      const res = await fetch(`http://localhost:5001/api/chat/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.data }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to server" },
      ]);
    }
  };

  const handleButtonClick = (type) => {
    setMessages((prev) => [...prev, { role: "user", text: type }]);

    if (type === "showSpecificUser") {
      sendQuery("list-users");
      setAwaitingInput("user");
    } else if (type === "showSpecificProduct") {
      sendQuery("list-products");
      setAwaitingInput("product");
    } else if (type === "showSpecificCategory") {
      sendQuery("list-categories");
      setAwaitingInput("category");
    } else {
      sendQuery(type);
    }
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value.trim();
    if (!id) return;

    setMessages((prev) => [...prev, { role: "user", text: id }]);

    if (awaitingInput === "user") {
      sendQuery("user-detail", { id });
    } else if (awaitingInput === "product") {
      sendQuery("product-detail", { id });
    } else if (awaitingInput === "category") {
      sendQuery("category-detail", { id });
    }

    setAwaitingInput(null);
    e.target.reset();
  };

  const renderMessage = (msg) => {
    // If bot message is an array of objects → display as table
    if (msg.role === "bot" && Array.isArray(msg.text) && msg.text.length > 0) {
      const keys = Object.keys(msg.text[0]);
      return (
        <table className="table-auto border-collapse border border-gray-400 my-2">
          <thead>
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  className="border border-gray-400 px-2 py-1 bg-gray-200"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {msg.text.map((row, i) => (
              <tr key={i}>
                {keys.map((key) => (
                  <td key={key} className="border border-gray-400 px-2 py-1">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // If bot message is an object → pretty print JSON
    if (msg.role === "bot" && typeof msg.text === "object") {
      return (
        <pre className="bg-gray-100 p-2 rounded border">
          {JSON.stringify(msg.text, null, 2)}
        </pre>
      );
    }

    // Otherwise, normal text
    return <span>{msg.text}</span>;
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-80 overflow-y-auto bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user" ? "text-blue-500 my-1" : "text-green-500 my-1"
            }
          >
            <b>{msg.role}:</b> {renderMessage(msg)}
          </div>
        ))}
      </div>

      {!awaitingInput && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showAllUsers")}
          >
            Show All Users
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showAllProducts")}
          >
            Show All Products
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showAllCategories")}
          >
            Show All Categories
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showSpecificUser")}
          >
            Specific User Detail
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showSpecificProduct")}
          >
            Specific Product Detail
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleButtonClick("showSpecificCategory")}
          >
            Specific Category Detail
          </button>
        </div>
      )}

      {awaitingInput && (
        <form className="mt-2 flex gap-2" onSubmit={handleIdSubmit}>
          <input
            name="id"
            placeholder={`Enter ${awaitingInput} ID or Name`}
            className="border p-2 flex-1"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
