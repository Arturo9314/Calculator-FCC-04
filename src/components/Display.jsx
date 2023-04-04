import React from 'react'

export default function Display({expression, answer}) {
  
  return (
    <header>
        <h1 className='outputScreen' id='display'>{expression===''? 0: expression}</h1>
        <p className='formulaScreen' id='formula'>{answer===''? 0: answer}</p>
    </header>
  )
}
