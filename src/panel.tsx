// panel.tsx
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const Container = styled.div`
  padding: 16px;
  background: #1e1e1e;
  color: white;
  min-height: 100vh;
`;

const LogItem = styled.div`
  background: #2a2a2a;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export default function Panel() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "RENDER_EVENT") {
        setLogs((prevLogs) => [...prevLogs, message.data]);
      }
    });
  }, []);

  return (
    <Container>
      <h1
        css={css`
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 16px;
        `}
      >
        Render Flow Tracker
      </h1>
      <div>
        {logs.map((log, index) => (
          <LogItem key={index}>{log}</LogItem>
        ))}
      </div>
    </Container>
  );
}
