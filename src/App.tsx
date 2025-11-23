import { useMachine } from "@xstate/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { createMachine } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: "Inactive" },
      after: { 2000: "Inactive" },
    },
  },
});

function App() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>XState Toggle Demo</h1>
      <div className="card">
        <button
          onClick={() => send({ type: "toggle" })}
          style={{
            backgroundColor: state.matches("Active") ? "#4CAF50" : "#f44336",
            color: "white",
            padding: "20px 40px",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Status: {state.value as string}
        </button>
        <p style={{ marginTop: "20px" }}>
          {state.matches("Active")
            ? "⏱️ Will auto-reset to Inactive in 2 seconds"
            : "Click to activate"}
        </p>
      </div>
      <p className="read-the-docs">
        Click the button to toggle between Active and Inactive states
      </p>
    </>
  );
}

export default App;
