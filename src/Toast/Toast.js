import './Toast.css'
import React from 'react'
import ReactDOM from 'react-dom'

function Toast(message) {
    //const [showe, setShowe] = React.useState(false)
    const toastNode = document.querySelector('#toast')
    const toast = ReactDOM.render(<RenderMessage message={message}/>, toastNode)

    setTimeout(() =>{
        ReactDOM.unmountComponentAtNode(toastNode)
        console.info('remove toast', toast)
    }, 3000)

}

export default Toast

function RenderMessage({message}){
    return(
        <div className="toast hide">{message}</div>
    )
}