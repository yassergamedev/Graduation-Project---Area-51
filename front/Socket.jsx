import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';



function Socket()

  
{
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
      }, []);
    return <>
    hey
    </>
}

export default Socket