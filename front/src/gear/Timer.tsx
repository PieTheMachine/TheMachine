import { useEffect, useState } from 'react';
import '../root.css';
import './timer.css';

import alarm from '../assets/alarm.wav';


useState
function Timer() {
    const [Loadedd,setLoadedd] = useState(false);
    const audio = new Audio(alarm);

    //let TheTime = 1;//the wanted timer = 90 m
    const [TheTime,setTheTime] = useState(15);
    //let TheTimeInSeconds = TheTime * 60;
    const [TheTimeInSeconds,setTheTimeInSeconds] =useState(TheTime * 60);
    let TimerTextElement = document.getElementById('⏳TimerText');

    const [PlayPuse,setPlayPuse] = useState(false);

   // setInterval(CountDown,1000);//calls the function every second
    useEffect(()=>{
        const Interval = setInterval(()=>{
            CountDown();
        },1000)
        return () => clearInterval(Interval);
    })

    function CountDown(){
        //for restart
        setTheTime(15);
        if(Loadedd === true){

            if(PlayPuse){
                const Minuets = Math.floor(TheTimeInSeconds/60);
                const Seconds = TheTimeInSeconds % 60;


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

                    audio.play();
                    if(TimerTextElement){
                        TimerTextElement.innerText = "00:00";
                    }
                    
                }else{
                    
                    setTheTimeInSeconds(TheTimeInSeconds => TheTimeInSeconds - 1)
                }
            }
        }
    }
    function Loaded(){
        
        TimerTextElement = document.getElementById('⏳TimerText');
        if(TimerTextElement && !Loadedd){
            
            setTheTimeInSeconds(TheTime * 60);
            TimerTextElement.innerText = TheTimeInSeconds.toString();
        }
        
        setLoadedd(true);
        return ;
    }
    function ResetTimer(){
        setTheTimeInSeconds(TheTime * 60);
        
        setPlayPuse(true);
    }

   
    function PlayStope(){
        setPlayPuse(!PlayPuse);
    }
    function ClassName(){
        let HiddenClass = "";
        if(Show){
            HiddenClass = "";
        }else{
            HiddenClass = "HideInSize";
        }
        return "⌛Timer 💪flex 💪C " + HiddenClass;
    }
    const [Show,setShow] = useState(false)
    return (

        <div>
            <div className={ClassName()}>
                <h1  id='⏳TimerText' className='🧊GradientText'>Timer{setTimeout(Loaded,1000)}</h1>
                <div className='💪flex'>
                    <button className='✅submit' onClick={ResetTimer}>Restart</button>
                    <button className='✅submit' onClick={PlayStope}>Puse/Play</button>
                </div>
            </div>
            <button onClick={()=>setShow(!Show)} className='⌛Timer🎈HideShow'><p>⌛</p></button>
        </div>
        
    )
    
}

export default Timer;