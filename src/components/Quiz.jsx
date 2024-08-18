import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../assets/data'

function Quiz() {
  let [index,setIndex] = useState(0);
  let [question ,setQuestion] = useState(data[index]);
  let [lock,setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result,setResult] = useState(false);

  let options1 = useRef(null);
  let options2 = useRef(null);
  let options3 = useRef(null);
  let options4 = useRef(null);

  let option_array = [options1,options2,options3,options4];
  
  
  
  const checkAns =(e, correctAnswer)=>{
    if (lock===false) {

      if (question.correctAnswer===correctAnswer) {
       
        e.target.classList.add("correct");
        setLock(true)
        setScore(prev=>prev+1);
      }
      else{
        
        e.target.classList.add("wrong");
        
        setLock(true)
        option_array[question.correctAnswer-1 ].current.classList.add("correct")
      }
    }
   
  }
  const next = () =>{
     if (lock === true)
     {    
       if(index === data.length -1)
       {
          setResult(true);
          return 0;
       }
       setIndex(++index);
       setQuestion(data[index]);
       setLock(false);
        option_array.map((Option)=>{
          Option.current.classList.remove("wrong");
          Option.current.classList.remove("correct");
          return null;
        })
     }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }
  return (
    <div className='container' >
<h1>Quiz App</h1>
    {result? <></> :<>
      <h2>{index+1}.{question.question}</h2>
    <ul>
        <li ref={options1} onClick={(e) =>checkAns(e,1)}>{question.options1}</li>
        <li ref={options2} onClick={(e) =>{checkAns(e,2)}}>{question.options2}</li>
        <li ref={options3} onClick={(e) =>{checkAns(e,3)}}>{question.options3}</li>
        <li ref={options4} onClick={(e) =>{checkAns(e,4)}}>{question.options4}</li>
    </ul>
    <button onClick={next}>Next</button>
    <div className='index'>{index+1} of {data.length} Qustions</div>
</>}
   { result?<>
    <h2>Your Scored {score} out of {data.length}</h2>
    <button onClick={reset}>Reset</button>
   </> :<></>}
   
    </div>
  )
}

export default Quiz