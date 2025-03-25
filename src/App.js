import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

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
    const response = await fetch("http://localhost:8000/scan-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: scanResult })
    });
    const result = await response.json();
    alert("Sent to backend: " + JSON.stringify(result));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>QR Scanner App</h2>
      {!scanResult ? (
        <div id="reader" />
      ) : (
        <div>
          <p><strong>Scanned Data:</strong> {scanResult}</p>
          <button onClick={sendToServer}>Send to Server</button>
        </div>
      )}
    </div>
  );
}

export default App;
