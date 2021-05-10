import {useEffect, useContext} from 'react';
import { io } from "socket.io-client";
import { useSnackbar } from 'notistack';
import { Context } from "../Context";
import configData from "../../config.json";

const Events = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [context, setContext] = useContext(Context);
  
    useEffect(() => {
      const socket = io(configData.SERVER_IP);
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