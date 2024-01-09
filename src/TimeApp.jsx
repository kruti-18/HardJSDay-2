import React, { useState, useEffect } from "react";


const TimeApp = () => {
    const [seconds, setSeconds] = useState(0);

    const updateTimer = (newSeconds) => {
        setSeconds(newSeconds);
        localStorage.setItem("timer", JSON.stringify(newSeconds));
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          // Tab is visible, resume the timer
          const storedTimer = JSON.parse(localStorage.getItem("timer"));
          if (storedTimer !== null) {
            setSeconds(storedTimer);
          }
        } else {
          // Tab is not visible, no need to update the timer state
        }
      };

    //   const storedTimer = JSON.parse(localStorage.getItem("timer"));
    //   if (storedTimer !== null) {
    //     setSeconds(storedTimer);
    //   }

   
  
    useEffect(() => {
      const timerInterval = setInterval(() => {
        updateTimer(seconds + 1);
      }, 1000);
  
      const storedTimer = JSON.parse(localStorage.getItem("timer"));
      if (storedTimer !== null) {
        setSeconds(storedTimer);
      }

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', () => {
        // Save the current timer value before unloading the page
        localStorage.setItem("timer", JSON.stringify(seconds));
      });
  
  
      return () => {clearInterval(timerInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    }, [seconds]);



    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-400">
        <div className="border-[6px] border-red-900 rounded-xl w-[40%] h-[30%] flex justify-center flex-col text-center bg-white">
            <h1 className="text-4xl font-bold mb-8 uppercase">Timer</h1>
            <p className="text-2xl">{`Time elapsed: ${seconds} seconds`}</p>
        </div>
        
      </div>
    );
  };
export default TimeApp