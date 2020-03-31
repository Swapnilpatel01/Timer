import React, { useState, useEffect } from "react";
import "./Timer.css";
function Timer() {
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const toggle = () => {
    setPlaying(!playing);

    if(document.getElementById("resetSec").value > 0 || document.getElementById("resetMin").value > 0 || 
      document.getElementById("resetHour").value > 0) {
      setPlaying(true)
    }

    if(document.getElementById("resetSec").value === '' && document.getElementById("resetMin").value === '' && 
      document.getElementById("resetHour").value === '' || document.getElementById("resetSec").value === 0 && 
      document.getElementById("resetMin").value === 0 && document.getElementById("resetHour").value === 0) {
        alert('Please enter in your time')
        setPlaying(false)
    }

    if(document.getElementById("resetHour").value > 0 && document.getElementById("resetMin").value === 0 && 
      document.getElementById("resetSec").value === 0 || (document.getElementById("resetSec").value === 0 && 
      document.getElementById("resetHour").value === 0 && document.getElementById("resetHour").value > 1)) {
       setPlaying(true)
    }
  };

  const handleDelay = event => {
    setDelay(event.target.value);
  };

  const handleChange = event => {
    setCount(event.target.value);
    if(!event.target.value) {
      setCount(count)
    }

    if(event.target.value > 60) {
      event.target.value = 59
      setCount(59)
    }

    if(event.target.value === 0) {
      event.target.value = ''
      setCount(0)
    }

  };

  const handleChange2 = event => {
    setCount2(event.target.value);
    if(!event.target.value) {
      setCount2(count2)
    }

    if(event.target.value > 60) {
      event.target.value = 59
      setCount2(59)
    }

    if(event.target.value === 0) {
      event.target.value = ''
      setCount2(0)
      
    }
  };

  const handleChange3 = event => {
    setCount3(event.target.value);
    if(!event.target.value) {
      setCount3(count3)
    }

    if(event.target.value > 24) {
      event.target.value = 24
      setCount3(24)
    }

    if(event.target.value === 0) {
      event.target.value = ''
      setCount3(0)
      
    }
  };

  const reset = () => {
    document.getElementById("resetHour").value = '';
    document.getElementById("resetMin").value = '';
    document.getElementById("resetSec").value = '';
    setCount(0);
    setCount2(0);
    setCount3(0);
    setPlaying(false);
    setDelay(1000);
  };
 

  const reset2 = () => {
    setCount(59);
  };

  const reset3 = () => {
    setCount2(59);
  };

  const reset4 = () => {
    setCount(0);
    setCount2(0);
    setCount3(0);
    setPlaying(false);
    setDelay(1000);
  };
  
  useEffect(() => {
    let interval = 0;
    
    if (playing) {
      interval = setInterval(() => {
        setCount(count => count - 1);
        
        if (count2 > 0 && count === 0) {
            reset2();
            setCount2(count => count - 1);
        }

        if (count3 > 0 && count2 === 0 && count === 0) {
            reset2();
            reset3();
            setCount3(count => count - 1);
        }

        if (count3 === 0 && count2 === 0 && count === 0) {
            reset4()
        }
        
      }, delay);
    } else if (!playing && count !==0) {
         clearInterval(interval)
     }
    return () => {
      clearInterval(interval);
    };
  }, [playing, count]);


  const handleChange5 = event => {
    if(!event.target.value) {
      return "0" + count3
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="header-1">Timer</h1>
      </div>
      <p className="time">
        {handleChange5}
        {count3 < 10 ? "0" + count3 : count3}:
        {count2 < 10 ? "0" + count2 : count2}:
        {count < 10 ? "0" + count : count}
      </p>

      <p className="delay">Delay (Milliseconds):</p>
      <input
        className="delay-input"
        type="number"
        min="0"
        value={delay}
        onChange={handleDelay}
      ></input>

      <p className="delay">Enter In Time:</p>  
      <input
        className="time-input"
        type="number"
        min="0"
        onChange={handleChange3}
        id="resetHour"
        placeholder="Hour(s)"
      ></input>

      <input
        className="time-input"
        type="number"
        min="0"
        onChange={handleChange2}
        id="resetMin"
        placeholder="Minute(s)"
        pattern="\d*"
        maxLength="2"
      ></input>

      <input
        className="time-input"
        type="number"
        min="0"
        onChange={handleChange}
        id="resetSec"
        placeholder="Second(s)"
        pattern="\d*"
        maxLength="2"
      ></input>
       <h5 className="header-2">(Empty = 0)</h5>

      <div className="btns">
        <button className="button" onClick={toggle}>
          {playing ? "Stop" : "Start"}
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
