import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client";
import { useSnackbar } from 'notistack';

const Events = () => {
    const [response, setResponse] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
    useEffect(() => {
      const socket = io("http://127.0.0.1:5000");
      socket.on("notifications", data => {
  
        setResponse(data);
        enqueueSnackbar(data, {
          anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
          }
        });
      });
    }, []);
    
    return (null);
}

export default Events