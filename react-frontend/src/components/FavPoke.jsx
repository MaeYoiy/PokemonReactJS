import React from 'react'
import LikePoke from './LikePoke'

                    //มีการส่ง props และก็ต้องมีการรับ props
function FavPoke({ fav }) {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        
        {/* ใช้ map เพราะเป็น Array */}
        {fav?.map((data, idx) => (
            <div key={idx}>
                <h3>{data?.name}</h3>
                <img src={data?.sprites?.other?.home?.front_default} alt={data?.name}/>
                <LikePoke/>
            </div>
        ))}
    </div>
  )
}

export default FavPoke