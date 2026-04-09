import { useState } from "react";
import VoiceAssistant from "./VoiceAssistant";
import { aatEngine } from "./aatEngine";

export default function App() {
  const [responses, setResponses] = useState<string[]>([]);

  const processCommand = async (text: string) => {
    const result = await aatEngine.process(text);
    setResponses(prev => [...prev, result]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Aura AI Assistant</h1>

      <VoiceAssistant onCommand={processCommand} />

      <h2>Responses</h2>
      <ul>
        {responses.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}