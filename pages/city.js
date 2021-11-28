import React from 'react'

function city({cities}) {
  return (
    <div>
      {cities.map(city => <div>{city.url}</div>)}
    </div>
  )
}

export default city


export async function getServerSideProps(){
  const cities = await fetch("https://jsonkeeper.com/b/GNBK").then(
    (response)=>response.json()
  );
  return{
    props:{
      cities
    } 
    
  }
}
