import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./App.css"; // 👈 Import the styles here

function App() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );
  }, []);

  const sendToServer = async () => {
    try {
      const response = await fetch("/scan-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: scanResult })
      });
      const result = await response.json();
      alert("Sent to backend: " + JSON.stringify(result));
    } catch (error) {
      alert("Error sending to server: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>EV QR Scanner</h1>

      {!scanResult ? (
        <div id="reader" className="scanner-box" />
      ) : (
        <div className="result-box">
          <h3>Scanned Data</h3>
          <pre className="json-output">{scanResult}</pre>
          <button onClick={sendToServer} className="send-button">
            Send to Server
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
