import React from 'react'
import KeyButton from './KeyButton.js'

function Keyboard({onClick}){
    const symbols = ['AC', 'bs', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '=']
    return(
        
        <div className="calc-keyboard">
            {
                symbols.map((symbol, i)=>{
                    return (<KeyButton 
                                title={symbol} 
                                onClick={onClick} 
                                key={i}
                            />)
                })
            }
        </div>
    )
}

export default Keyboard