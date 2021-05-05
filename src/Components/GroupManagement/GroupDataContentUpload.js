import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles, TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import axios from 'axios';
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

const GroupDataContentUpload = (props) => {
  const [DataPath, setDataPath] = useState('')
  const [fileUrl, setFileUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const uploadInput = useRef(null);
  const { group } = useParams();


  const handleUpload = async e => {
    e.preventDefault();
    setProgress(0);

    const data = new FormData();
    data.append('type', 'data')
    data.append('packageName', props.packageName)
    data.append('path', DataPath);
    data.append('file', uploadInput.current?.files[0]);
    
    const onUploadProgress = progressEvent => {
      setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total));
      console.log(Math.round((100 * progressEvent.loaded) / progressEvent.total));
    }

    const response = await axios.post('/api/groupUpload/' + group, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    setFileUrl(`http://localhost:5000/${response.file}`);
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
        <TextField value={DataPath} onChange={(e) => setDataPath(e.target.value)} label="data path" />
        <button>Upload</button>
      </div>
    </form>
  );
}

export default GroupDataContentUpload;