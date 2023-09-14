import React from 'react'
                    //มีการส่ง props และก็ต้องมีการรับ props
function FavPoke({ fav }) {
  return (
    <div>
        <h2>Your favorite Pokemons</h2>
        {/* ใช้ map เพราะเป็น Array */}
        {fav?.map((data, idx) => (
            <div key={idx}>
                <h3>{data?.name}</h3>
                <img src={data?.sprites?.other?.home?.front_default} alt={data?.name}/>
            </div>
        ))}
    </div>
  )
}

export default FavPoke