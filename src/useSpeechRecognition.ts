import { useState } from "react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

export default function useSpeechRecognition() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = async () => {
    const available = await SpeechRecognition.available();

    if (!available.available) {
      alert("Speech not available");
      return;
    }

    await SpeechRecognition.requestPermissions();

    setListening(true);

    await SpeechRecognition.start({
      language: "en-US",
      maxResults: 1,
    });

    SpeechRecognition.addListener("partialResults", (data: any) => {
      if (data.matches?.length) {
        setText(data.matches[0]);
      }
    });

    SpeechRecognition.addListener("listeningState", (state: any) => {
      if (state.status === "stopped") {
        setListening(false);
      }
    });
  };

  return { text, listening, startListening };
}