import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const MyConfettiComponent = (props) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti((val)=>{
         return props.showIt
    });
  }, [props.showIt]);

  return (
    <div>
      {showConfetti ? (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      ) : null}
    </div>
  );
};

export default MyConfettiComponent;