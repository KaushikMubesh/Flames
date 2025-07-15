import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
const DataBaseUi = () => {

  const [userData, setUserData] = useState([]);  

  useEffect(() => {
    const collectionRef = collection(db, "loveRecords");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userDataArray = querySnapshot.docs
      .map(doc => doc.data())
      .filter((data, index, self) =>
        index === self.findIndex(
          (d) =>
            (d.yourName === data.yourName && d.crushName === data.crushName && d.yourName !== 'Sundharavaradhan') ||
            (d.yourName === data.crushName && d.crushName === data.yourName)
        )
      );

      setUserData(userDataArray);
      console.log("Updated userData:", userDataArray); 
    });

    return () => unsubscribe();
  }, []);

  console.log("Rendered userData:", userData); 

  return (
    <div className='w-screen min-h-screen py-[50px] px-3 tracking-tighter bg-[#FFF7F3]' >    
            <div className='max-w-xl mx-auto h-full flex flex-col justify-start items-center'>
                    <div>
                      <h1 className='text-4xl tracking-[-3px] text-[#ff7289] mb-[25px]'>
                        CrushBase.
                      </h1>
                    </div>
                    <div className='w-full border-[1px] border-[#BE5985] rounded-lg '>
                        <div className='w-full flex flex-col justify-start items-center relative'>
                        <div className='row-title text-3xl w-full grid grid-cols-3  bg-[#AC1754] text-[#F7A8C4] rounded-t-lg sticky top-0'>
                            <div className='your-name col-span-1   px-2 flex justify-center items-center'>  
                                  Your Name
                            </div>
                            <div className='crush-name col-span-1   px-2 flex justify-center items-center'>  
                                  Crush Name
                            </div>
                            <div className='flames col-span-1 px-2 flex justify-center items-center'>  
                                  Flames
                            </div>
                        </div>
                        {
                          userData.map((data,index)=> {
                            return (
                              <div className='w-full row grid grid-cols-3 border-t-[1px] border-[#BE5985]  ' id={index}>
                            <div className='your-name col-span-1 border-r-[1px] border-[#BE5985]  px-2 flex justify-center items-center'>  
                                  {data.yourName}
                            </div>
                            <div className='crush-name col-span-1  border-r-[1px] border-[#BE5985] px-2 flex justify-center items-center'>  
                                  {data.crushName}
                            </div>
                            <div className='flames col-span-1 px-2 flex justify-center items-center'>  
                                  {data.flamesResult}
                            </div>
                        </div>
                            )
                          }

                          )
                        }
                        </div>
                    </div>

            </div>
    </div>
  )
}

export default DataBaseUi