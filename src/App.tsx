import { useState } from "react";
import VoiceAssistant from "./VoiceAssistant";
import { aatEngine } from "./aatEngine";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

export default function App() {
  const [responses, setResponses] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<string[]>([]);

  const speak = async (text: string) => {
    // remove [emotion] tags before speaking
    const clean = text.replace(/\[.*?\]/g, "");

    await TextToSpeech.speak({
      text: clean,
      lang: "en-US",
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const processCommand = async (text: string) => {
    // 🔥 AUTO BOOK LOGIC
    const lower = text.toLowerCase();

    if (
      lower.includes("book") &&
      lower.includes("appointment")
    ) {
      const appointment = `Appointment booked on ${new Date().toLocaleString()}`;

      setAppointments((prev) => [...prev, appointment]);

      const reply = "[happy] Your appointment has been booked successfully!";
      setResponses((prev) => [...prev, reply]);

      await speak(reply);
      return;
    }

    // 🧠 AI RESPONSE
    const result = await aatEngine.process(text);

    setResponses((prev) => [...prev, result]);

    // 🔊 SPEAK RESPONSE
    await speak(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Aura AI Assistant</h1>

      <VoiceAssistant onCommand={processCommand} />

      <h2>AI Responses</h2>
      <ul>
        {responses.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <h2>Appointments</h2>
      <ul>
        {appointments.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}