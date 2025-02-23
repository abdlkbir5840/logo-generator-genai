import Lookup from '@/app/_data/Lookup'
import React from 'react'
import HeadingDesc from './HeadingDesc'

function LogoDesc({onHandleInputChange, formData}) {
  return (
    <div className="my-10">
    <HeadingDesc
      title={Lookup.LogoDescTitle}
      description={Lookup.LogoDescDesc}
    />
    <input
      type="text"
      placeholder={Lookup.LogoDescTitle}
      className="p-4 border rounded-lg mt-5 w-full"
      onChange={(e)=> onHandleInputChange(e.target.value)}
      value={formData?.desc}
    />
  </div>
  )
}

export default LogoDesc