import React, { useState } from 'react';
import axios from 'axios';
import './Prompt.css';

const Prompt = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       setShowOutput(true);
//       fetchResponseFromChatGPT(inputText);
//     }
//   };

  const fetchResponseFromChatGPT = async (input) => {
    try {
      const response = await axios.post('YOUR_CHATGPT_ENDPOINT', {
        messages: [{ role: 'system', content: 'You: ' + input }],
      });

      const reply = response.data.choices[0].message.content.replace('AI:', '').trim();
      setOutputText(reply);
    } catch (error) {
      console.error('Error fetching response from ChatGPT:', error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      setShowOutput(true);
      fetchResponseFromChatGPT(inputText);
      
      try {
        // Send a GET request to localhost:2000 with the input text
        await axios.get(`http://localhost:2000?prompt=${inputText}`);
      } catch (error) {
        console.error('Error sending GET request:', error);
      }
    }
  };

  return (
    <div className="prompt-container">
      <h1>What can we do for you?</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="prompt-input"
        />
      </div>
      {showOutput && (
        <div className="prompt-output">
          {outputText.split('').map((char, index) => (
            <span key={index} className="output-char">
              {char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prompt;
