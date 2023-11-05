import React, { useState } from 'react';
import axios from 'axios';
import './Prompt.css';

const Prompt = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const fetchResponseFromChatGPT = async (input) => {
    try {
        const response = await axios.get(`http://localhost:2000/answer?prompt=${input}`);
        console.log("HELLO WWFEFWFFFWEF");
        setOutputText(response.data.message.content);  // Set the response data as the output text
        console.log(outputText);
    } catch (error) {
        console.error('Error sending GET request:', error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      fetchResponseFromChatGPT(inputText);
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
        <div className="prompt-output">
          {outputText}
        </div>
    </div>
  );
};

export default Prompt;
