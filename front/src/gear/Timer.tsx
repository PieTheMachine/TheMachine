import { useState } from 'react';
import '../root.css';
import './timer.css';

import alarm from '../assets/alarm.wav';


useState
function Timer() {
    let loaded = false;

    const audio = new Audio(alarm);

    let TheTime = 5;//the wanted timer = 90 m
    let TheTimeInSeconds = TheTime * 60;
    let TimerTextElement = document.getElementById('⏳TimerText');

    let PlayPuse = false;

    setInterval(CountDown,1000);//calls the function every second

    function CountDown(){
        if(TimerTextElement){
        TimerTextElement.innerText = "90m";
        }
        if(loaded == true){
            if(PlayPuse){
                const Minuets = Math.floor(TheTimeInSeconds/60);
                const Seconds = TheTimeInSeconds%60;
                let stringSeconds = '';
                let stringMinuets = '';
                
                if(Minuets < 10){
                    stringMinuets = "0"+Minuets;
                }else{
                    stringMinuets = Minuets.toString();
                }
                
                
                if(Seconds<10){
                    stringSeconds = "0"+Seconds;
                }else{
                    stringSeconds = Seconds.toString();
                }

                if(TimerTextElement){
                    TimerTextElement.innerText = stringMinuets + ":" + stringSeconds;
                }

                
                if(Seconds<0 && TheTimeInSeconds < 0){
                    console.log("BREAK!");
                    audio.play();
                    if(TimerTextElement){
                        TimerTextElement.innerText = "00:00";
                    }
                    
                }else{
                    TheTimeInSeconds--;
                }
            }
        }
    }
    function Loaded(){
        loaded = true;
        TimerTextElement = document.getElementById('⏳TimerText');
        return ;
    }
    function ResetTimer(){
        TheTimeInSeconds = TheTime * 60;
        PlayPuse = true;
    }

   
    function PlayStope(){
        PlayPuse = !PlayPuse;
    }
    return (
        <div className='⌛Timer 💪flex 💪C'>
            <h1  id='⏳TimerText' className='🧊GradientText'>Timer{setTimeout(Loaded,1000)}</h1>
            <div className='💪flex'>
                <button onClick={ResetTimer}>Restart</button>
                 <button onClick={PlayStope}>Puse/Play</button>
                 
            </div>
        </div>
    )
    
}

export default Timer;