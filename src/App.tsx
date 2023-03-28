import { useState } from "react";
import { Router } from "./Router";

function App() {
  if (import.meta.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  return <Router />;
}

export default App;
