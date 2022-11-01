import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";

import './App.css'

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const name = useRef('');

    useEffect(() => {
        name.current  = prompt("Say your name");
        subscribe()
        // eslint-disable-next-line
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    let config = {
        headers: {
            'Cache-Control': 'no-cache, no-transform'
        }
      }
      



    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        },config)
    }

  

    return (
        <>
        <div className="center">
            <div >
                <div className="form">
                    <span className='name'>{name.current}</span> 
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                </div>
               
            </div>

        </div>

            <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {name.current}
                            {' : '}
                            {mess.message}
                        </div>
                    )}
                </div>
                </>
    );
};

export default LongPulling;