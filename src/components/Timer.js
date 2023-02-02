import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let intervalId
    if ( !props.tenzies){
       intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [props.tenzies]);

  return <div>Seconds: {seconds}</div>;
};

// export default Timer