import useSpeechRecognition from "./useSpeechRecognition";

type Props = {
  onCommand: (text: string) => void;
};

export default function VoiceAssistant({ onCommand }: Props) {
  const { text, listening, startListening } = useSpeechRecognition();

  return (
    <div style={{ marginTop: 20 }}>
      <h3> Voice Assistant</h3>

      <button onClick={startListening}>
        {listening ? "Listening..." : "Start Voice"}
      </button>

      <p><b>Heard:</b> {text}</p>

      <button onClick={() => onCommand(text)}>
        Send to AI
      </button>
    </div>
  );
}