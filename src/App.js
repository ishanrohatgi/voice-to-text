import './App.css';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faMicrophoneSlash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function App() {
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition();

  React.useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };

  const handleStopListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
  };

  const handleReset = ()=> {

    resetTranscript();
    
  }

  const handleCopyTranscript = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript)
        .then(() => {
          console.log('Transcript copied to clipboard:', transcript);
        })
        .catch((error) => {
          console.error('Failed to copy transcript to clipboard:', error);
        });
    }
    
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Speech recognition is not supported in this browser.</div>;
  }

  return (
    <div className="App">
      <div className="top-bar">
        <h1>Voice to Text</h1>
      </div>
      { transcript && 
        <div className="content">{transcript}</div>
      }

      <div className="button-area">
        <button className="start-button" onClick={handleStartListening}  disabled={listening}>
          <FontAwesomeIcon icon={faMicrophone} size="2x" />
        </button>
        <button className="stop-button" onClick={handleStopListening} disabled={!listening}>
          <FontAwesomeIcon icon={faMicrophoneSlash} size="2x" />
        </button><button className="refresh-button" onClick={handleReset} disabled={!transcript}>
          <FontAwesomeIcon icon={faRefresh} size="2x" />
        </button>
        <button className="copy-button" onClick={handleCopyTranscript} disabled={!transcript}>
          <FontAwesomeIcon icon={faCopy} size="2x" />
        </button>
      </div>
    </div>
  );
}

export default App;
