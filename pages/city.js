import React from 'react'
import cities from './api/cities.json'

function city() {
  return (
    <div>
      {cities.map(city => <div>{city.url}</div>)}
    </div>
  )
}

export default city
 