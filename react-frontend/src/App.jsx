import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)
  const [poke, setPoke] = useState(""); //ค่าเริ่มต้นเป็น String เปล่า
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //useEffect = fectch data จากภายนอก react เช่น fetch data จาก api
  //โดย useEffect ให้มันรันเพียงครั้งแรกครั้งเดียว
  //มีการยิ่ง request ไปที่ api ควรมีการใช้ abortController มีการส่ง signal มีการ return ในการเคลีย cancel request
  useEffect(() => {

    let abortController = new AbortController(); //ใช้ในการ cancel requset เพื่อไม่ให้มันเรียกซ้ำ

    //function loadPoke 
    const loadPoke = async () => {
      try {

        setLoading(true);

        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`, { //ใช้ await เพราะเป็น async
          signal: abortController.signal
        });

        //function setPoke เพื่อ set state ให้กับ Poke
        setPoke(response.data); //ข้อดีของการใช้ axios คือจะมีการแปลงข้อมูลเป็น javascript object ให้เราอยู่แล้ว เราไม่ต้องเขียน ".json" ต่อ data เลย
        setError(""); //ถ้า fetch ได้แล้วจะ set error ให้เป็น String ว่าง

      } catch(error) {
        setError("Something went wrong!!!", error);

      } finally {
        setLoading(false);

      }

    }

    loadPoke(); //เรียกใช้ function loadPoke
    
    return () => abortController.abort(); //return ตึง abortController มาและใช้ method abort

  }, []) // [] = empty array dependency ซึ่งถ้าไม่ใส่มันก็จะรันตลอด อาจจะทำให้ program เรา crash ได้

  console.log(poke);

  return (
    <>
     {/* ถ้า state poke มีค่าเป็น true มันจะเข้าถึงชื่อของมัน */}
     <h1>{poke?.name}</h1> 
     <img src={poke?.sprites.other.home.front_default} alt={poke?.name} />

     {/* ability เป็น Array ซึ่งเราไม่สามารถเข้าถึงข้อมูลได้ โดยที่ทำแบบด้านบน (เข้าถึงชื่อกับรูปภาพ) 
     เราจะเข้าถึงโดยมีการ search แบบ map ด้วยการใช้ loop */}
     <ul>
      {/* map รับค่า 2 parameter คือ abil, indx  */}
      {poke?.abilities.map((abil, indx) => (
        // รูปแบบการ serch จะเป็น abilities.0.ability.name
        <li key={indx}>{abil.ability.name}</li>
      ))}
     </ul>
    </>
  )
}

export default App
