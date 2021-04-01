import React from 'react'

function KeyButton({title, onClick}) {

    return (
        <button className="btn" value={title} onClick={onClick}>{
            title === 'bs'
                ? <img src="./img/bs.png" alt="" />
                : title
        }</button>
    )
}

export default KeyButton