import React from 'react';
import HomeNavBar from "./HomeNav.js";
import SpeechToTextConverter from "./SpeechToTextConverter.js";
import Prompt from './Prompt.js';

const Home = () => {
    return (
        <div className='Home'>
            <HomeNavBar />
            {/* <SpeechToTextConverter />  */}
            <Prompt />
        </div>
    );
}
 
export default Home;