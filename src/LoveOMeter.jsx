import React, { useState } from 'react';
import loveImage from './assets/eueopen.jpg'; // Replace with your actual image path
import dontsee from './assets/closeeye.jpg'
import Love from './assets/Love.gif';
import Affection from './assets/Affection.gif';
import Enemy from './assets/Enemy.gif';
import sibling from './assets/sibling.gif';
import Marriage from './assets/sibling.gif';
import tension2 from './assets/tension.gif'

import { db } from './firebase'; // adjust the path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Navigate, useNavigate } from 'react-router';



const LoveOMeter = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [crushName, setCrushName] = useState('');

  const[last,setlast]=useState(true)

  const [Name1set, SetName1set] = useState('');
  const [Name2set, SetName2set] = useState('');
  const[tension,settesion]=useState(false)

  const [Flames, SetFlamesResult] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const [pass, setPass] = useState("")
  const[idontsee,setidontsee]=useState(false)

  const [five,setfive]=useState(false)

  const flamesLetters = ['F', 'L', 'A', 'M', 'E', 'S'];
  const flamesMap = {
    F: 'Friends',
    L: 'Love',
    A: 'Affection',
    M: 'Marriage',
    E: 'Enemy',
    S: 'Sibling',
  };

  const Flamesgif={
    'Friends': Love,
    'Love': Love,
    'Affection': Affection,
    'Marriage': Marriage,
    'Enemy': Enemy,
    'Sibling': sibling,
  }

  const flamesMessages = {
    'Friends': 'Just friends? Tough luck. Maybe next life, pal. 👀',
    'Love': 'Love? Lucky you. Don’t mess it up. 💘',
    'Affection': 'Affection? Basically a participation certificate in love. Well done, champ. 😅',
    'Marriage': 'Marriage? Good luck with the in-laws. 💍',
    'Enemy': 'Enemy detected. Run before it’s too late. 💀',
    'Sibling': 'Sibling? Bro, that’s awkward… 😳',
  };

  const handleInputChangeName1 = (e) => {
    SetName1set(e.target.value);
  };

  const handlefocus=(e)=>{
    setidontsee(true)
    console.log("focus")
  }
  const handleInputChangeName2 = (e) => {
    SetName2set(e.target.value);

  };
  const navigateToDatabase = () =>{
    
    navigate('/data/database');
  }
  const Setvaluefun = async () => {
    let namefinal1 = Name1set.toLowerCase().replace(/\s/g, '');
    let namefinal2 = Name2set.toLowerCase().replace(/\s/g, '');
    if (namefinal1 === "1234567890"){
      navigateToDatabase()
    }

    settesion(true)
    setfive(false)
    setlast(false)

    let name1Arr = namefinal1.split('');
    let name2Arr = namefinal2.split('');

    for (let i = 0; i < name1Arr.length; i++) {
      let char = name1Arr[i];
      let indexInName2 = name2Arr.indexOf(char);
      if (indexInName2 !== -1) {
        name1Arr.splice(i, 1);
        name2Arr.splice(indexInName2, 1);
        i--;
      }
    }

    const remainingChars = name1Arr.concat(name2Arr).join('');
    const count = remainingChars.length;

    let flamesArr = ['F', 'L', 'A', 'M', 'E', 'S'];
    while (flamesArr.length > 1) {
      let index = (count - 1) % flamesArr.length;
      flamesArr.splice(index, 1);
      flamesArr = flamesArr.slice(index).concat(flamesArr.slice(0, index));
    }

    const result = flamesMap[flamesArr[0]];



    try {
      await addDoc(collection(db, "loveRecords"), {
        yourName: Name1set,
        crushName: Name2set,
        flamesResult: result,
        timestamp: serverTimestamp()
      });
      console.log("Saved to Firestore!");
    } catch (error) {
      console.error("Error saving to Firestore: ", error);
    }

    

    // Animate FLAMES letters
    let i = 0;
    const interval = setInterval(() => {
      setHighlightIndex(i);
      i++;
      if (i > 5) {
        clearInterval(interval);
        setTimeout(() => {
          setfive(true)
          settesion(false)
          setHighlightIndex(-1);
          SetFlamesResult(result);
        }, 1000);
      }
    }, 1000);



  
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 py-[100px]">

      {/* Title */}
      <h1 className="text-3xl font-bold font-jetbrains text-[#ff7289] mb-[25px]">FlaMeUp</h1>

      {/* Image */}

      {last&& (!five  &&
      (idontsee ? <img src={dontsee} alt="love" className="w-[200px] h-[200px] mb-[70px]" />:<img src={loveImage} alt="love" className="w-[200px] h-[200px] mb-[70px]" />)
      )}
      
      {five && <img src={Flamesgif[Flames]} alt="love" className="w-[200px] h-[200px] mb-[70px]" /> }
      {tension && (<img src={tension2} alt="love" className="w-[200px] h-[200px] mb-[70px]" /> ) }

      {/* Funny Text */}
      <p className="text-[#CBA6F7] font-jetbrains text-center italic max-w-md mb-[50px]">
      {Flames ? flamesMessages[Flames] : "Strengthen that heart, champ. If it backfires, remember — 4 billion more.Just try, bruh"}
      </p>

      {/* Input Fields */}
      <div className="flex flex-col mb-5 md:flex-row gap-8 sm:gap-40">
        {/* Your Name Input */}
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleInputChangeName1(e);
          }}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-[#FFC0CB] px-2 py-1 placeholder:font-jetbrains placeholder-gray-400"
        />

        {/* Crush Name Input with Custom Placeholder */}
        <div className="relative w-full md:w-auto">
          {crushName === '' && (
            <div className="absolute left-2 top-1 font-jetbrains text-gray-400 pointer-events-none">
              <span>Your </span>
              <span className="text-[#FFC0CB]">crush</span>
              <span> name</span>
            </div>
          )}
          <input
            type="text"
            value={crushName}
            onFocus={handlefocus}
            onBlur={()=>{
              setidontsee(false)
              console.log("not focus focus")

            }}
            onChange={(e) => {
              setCrushName(e.target.value);
              handleInputChangeName2(e);
            }}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-[#FFC0CB] px-2 py-1 bg-transparent w-full"
          />
        </div>
      </div>

      {/* Button */}
      <div className="py-[50px] pt-[25px] sm:py-[80px] sm:pt-[50px]">
        <button
          onClick={Setvaluefun}
          className="bg-[#ff6e86] px-6 py-2 font-jetbrains font-bold rounded-r-full rounded-l-full shadow-xl text-gray-100 active:scale-95 ease-in-out transition-all duration-150"
        >
          Feel the <span className="">Pain</span>
        </button>
      </div>

      {/* FLAMES Reveal */}
      <div className="flex font-jetbrains gap-8  sm:gap-20 text-4xl font-semibold transition-all">
        {flamesLetters.map((letter, idx) => {
          // Determine if this letter is final result letter
          const isFinal = Flames && letter === Object.keys(flamesMap).find(key => flamesMap[key] === Flames);
          const isHighlighted = idx === highlightIndex;

          return (
            <span
              key={idx}
              className={`transition-all duration-300 ${
                isHighlighted || isFinal ? 'text-rose-500 scale-125' : 'text-[#FFC0CB] scale-100'
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>
       {/* <div className='w-full'>
       <input type="text" name="" id=""className='w-full  mt-8' onChange={(e)=>{
          setPass(e.target.value)
        }}/>
       </div> */}
    </div>
  );
};

export default LoveOMeter;
