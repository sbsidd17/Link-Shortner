import React from 'react'
import "./GradientBtn.css"

function GradientBtn({name}) {
  return (
    <button className="px-5 py-2 md:px-10 md:py-4 rounded-md text-gray-50 custom-gradient">{name}</button>
  )
}

export default GradientBtn