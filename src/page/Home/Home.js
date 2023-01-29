import React from 'react'

// Link component
import Carousel from '../../Components/Carousel/Carousel';
import Film from '../../Components/Flim/Film';
import Promotion from '../../Components/Promotion/Promotion';

export default function Home() {

  return (
    <div className='container'>
      <Carousel/>
      <Film/>
      <Promotion/>
    </div>
  )
}
