import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

//components
import FavPoke from './components/favPoke'

function App() {
  // const [count, setCount] = useState(0)
  const [poke, setPoke] = useState(""); //ค่าเริ่มต้นเป็น String เปล่า
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);

  //state for favorite pokemon
  const [fav, setFav] = useState([]) //Array เพราะเราต้องการเก็บตัวที่เป็น Array

  //useEffect = fectch data จากภายนอก react เช่น fetch data จาก api
  //โดย useEffect ให้มันรันเพียงครั้งแรกครั้งเดียว
  //มีการยิ่ง request ไปที่ api ควรมีการใช้ abortController มีการส่ง signal มีการ return ในการเคลีย cancel request
  useEffect(() => {

    let abortController = new AbortController(); //ใช้ในการ cancel requset เพื่อไม่ให้มันเรียกซ้ำ

    //function loadPoke 
    const loadPoke = async () => {
      try {

        setLoading(true);
                                                                          //เป็นการทำแบบ Dynamic
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, { //ใช้ await เพราะเป็น async
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

  }, [number]) // [] = empty array dependency ซึ่งถ้าไม่ใส่มันก็จะรันตลอด อาจจะทำให้ program เรา crash ได้
              //พอมีการกดที่ function nextPoke หรือ prePoke ค่าของ number จะมีการเปลี่ยนแปลงและทำให้ function loadPoke นั้น มีค่าของ number ที่ update แล้ว

  console.log(poke);

  //function for Button Next and Previous
  const prevPoke = () => {
    //number return number-1
    setNumber((number) => number - 1)

  }

  // const nextPoke = () => {
  //   // setNumber(number + 1)
  //   setNumber((number) => number + 1)

  // }

  function nextPoke() {
    setNumber(number + 1)
  }

  console.log("Pokemon id :", number);

  //function for Add to favorite
  const addFav = () => {
                          // "..." เป็นการส่ง state ตัวเก่า พร้อมกับ update state ตัวใหม่ 
    setFav((oldState) => [...oldState, poke]) //oldState คือ poke state ตัวเก่า และ poke คือ poke state ตัวใหม่
  }

  console.log("Your favorite poke :", fav);

  return (
    <div className='max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        
        <div>
          {loading ? 
            <ReactLoading thpe='spin' color='purple' height={'20%'} width={'20%'} />
            :
            <>
              {/* ถ้า state poke มีค่าเป็น true มันจะเข้าถึงชื่อของมัน */}
              {/* "?" เป็นการ check ว่ามีมั้ย */}
              <h1>{poke?.name}</h1> 
              <button onClick={addFav}>Add to favorite</button> <br/>
              <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />

              {/* ability เป็น Array ซึ่งเราไม่สามารถเข้าถึงข้อมูลได้ โดยที่ทำแบบด้านบน (เข้าถึงชื่อกับรูปภาพ) 
              เราจะเข้าถึงโดยมีการ search แบบ map ด้วยการใช้ loop */}
              <ul>
                {/* map รับค่า 2 parameter คือ abil, indx  */}
                {poke?.abilities?.map((abil, indx) => (
                  // รูปแบบการ serch จะเป็น abilities.0.ability.name
                  <li key={indx}>{abil.ability?.name}</li>
                ))}
              </ul>
              <button onClick={prevPoke}>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </>
          }
          
        </div>

        <div>
          <h2>Your favorite Pokemons</h2>
          {/* ส่งค่า props "fav" ไปที่ component/favPoke.jsx */}
          {fav.length > 0 ? <FavPoke fav={fav}/> : <div className='flex h-full justify-center items-center...'>No favorite Pokemons</div>}
        </div>
      </div>
    </div>
  )
}

export default App
