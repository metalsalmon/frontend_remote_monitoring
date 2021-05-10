import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, withStyles, TextField, Button, Grid  } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import api from '../../http-axios'
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'flex',
    alignItems: 'center'
  },
  flex: {
    flex: '1'
  }
}));

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

const GroupScriptUpload = () => {
  const classes = useStyles();
  
  const [DataPath, setDataPath] = useState('')
  const [progress, setProgress] = useState(0);
  const uploadInput = useRef(null);
  const { group } = useParams();


  const handleUpload = async e => {
    e.preventDefault();
    setProgress(0);

    const data = new FormData();
    data.append('type', 'script')
    data.append('path', DataPath);
    data.append('file', uploadInput.current?.files[0]);
    
    const onUploadProgress = progressEvent => {
      setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total));
      console.log(Math.round((100 * progressEvent.loaded) / progressEvent.total));
    }

    const response = await api.post('/api/groupUpload/' + group, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  return (
    <form onSubmit={handleUpload}>
      <Grid container>    
        <Grid item xs={12}>
          <Box mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} className={classes.centered}>
          <input ref={uploadInput} type="file" className={classes.flex}/>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default GroupScriptUpload;