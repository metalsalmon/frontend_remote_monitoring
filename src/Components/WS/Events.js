import React, {useEffect, useState, useContext} from 'react';
import { io } from "socket.io-client";
import { useSnackbar } from 'notistack';
import { Context } from "../Context";

const Events = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [context, setContext] = useContext(Context);
  
    useEffect(() => {
      const socket = io("http://127.0.0.1:5000");
      socket.on("notifications", data => {
        setContext(data);
        if(data != ''){
          enqueueSnackbar(data, {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }
          });

        }
      });
    }, []);
    
    return (null);
}

export default Events