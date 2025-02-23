import React from 'react'

function HeadingDesc({title, description}) {
  return (
    <div>
      <h2 className='font-bold text-3xl text-primary'>{title}</h2>
      <h2 className='text-lg text-gray-500 mt-2'>{description}</h2>
    </div>
  )
}

export default HeadingDesc