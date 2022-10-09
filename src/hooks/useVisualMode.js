import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(transition) {
    setMode(transition);
    setHistory([...history, transition]);
  }
  
  const back = function() {
    
    if(history.length > 1) {      
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return { mode, transition, back };
}