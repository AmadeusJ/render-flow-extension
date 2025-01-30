/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

/**
 * Styled container for the DevTools panel.
 * Provides a dark-themed UI for better readability.
 */
const Container = styled.div`
  padding: 16px;
  background: #1e1e1e;
  color: white;
  min-height: 100vh;
`;

/**
 * Styled component for individual log items.
 * Each detected rendering event will be displayed inside this box.
 */
const LogItem = styled.div`
  background: #2a2a2a;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export default function Panel() {
  // State to store rendering event logs
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    /**
     * Listens for messages from the background script.
     * Captures "RENDER_EVENT" messages and updates the log list.
     */
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "RENDER_EVENT") {
        setLogs((prevLogs) => [...prevLogs, message.eventType]);
        console.log("HERE !!!!! message.eventType: ", message.eventType);
      }
    });
  }, []);

  return (
    <Container>
      {/* Header */}
      <h1
        css={css`
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 16px;
        `}
      >
        Render Flow Tracker
      </h1>

      {/* Logs Display */}
      <div>
        {logs.map((log, index) => (
          <LogItem key={index}>{log}</LogItem>
        ))}
      </div>
    </Container>
  );
}
