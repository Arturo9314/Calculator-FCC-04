import React from 'react'

export default function CalculatorBtn({id, value, onKeyClick}) {

  const handleClick = ()=>{
    onKeyClick(value)
  }
  
  return (
    <button onClick={handleClick} className='calculatorbtn' id={id} >{value}</button>
  )
}
