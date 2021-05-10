import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, withStyles, TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import api from '../http-axios'
import { useParams } from 'react-router';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  }
}))(LinearProgress);

const ConfigUpload = (props) => {
  const [configPath, setConfigPath] = useState('')
  const [progress, setProgress] = useState(0);
  const uploadInput = useRef(null);
  const { mac } = useParams();

  const handleUpload = async e => {
    e.preventDefault();
    setProgress(0);

    const data = new FormData();
    data.append('type', 'config')
    data.append('packageName', props.packageName)
    data.append('path', configPath);
    data.append('file', uploadInput.current?.files[0]);
    
    const onUploadProgress = progressEvent => {
      setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total));
      console.log(Math.round((100 * progressEvent.loaded) / progressEvent.total));
    }

    const response = await api.post('/api/upload/' + mac, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  return (
    <form onSubmit={handleUpload}>
      <div>
            <Box width="30%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
      </div>
      <div>
        <input ref={uploadInput} type="file" />
      </div>
      <br />
      
      <div>
        <TextField value={configPath} onChange={(e) => setConfigPath(e.target.value)} label="config path" />
        <button>Upload</button>
      </div>
    </form>
  );
}

export default ConfigUpload;