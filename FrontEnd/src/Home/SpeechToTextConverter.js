import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Speech() {
  const [message, setMessage] = useState('');

  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript(),
    },
    {
      command: 'shut up',
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!'),
    },
  ];

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, transcript, finalTranscript]);

  const listenContinuously = () => {
    SpeechRecognition.startListening({
    //   continuous: true,
    //   language: 'en-GB',
    });
  };

//   if (!SpeechRecognition.browserSupportsSpeechRecognition) {
//     return <span>Browser does not support speech recognition</span>;
//   }

  return (
    <div>
      <div>
        <span>
          listening: {listening ? 'on' : 'off'}
        </span>
        <div>
          <button type="button" onClick={resetTranscript}>Reset</button>
          <button type="button" onClick={listenContinuously}>Listen</button>
          <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
        </div>
      </div>
      <div>{message}</div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
}
