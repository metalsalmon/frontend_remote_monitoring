import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Typography, withStyles, TextField, Button } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import api from '../http-axios'
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: 16,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  flex: {
    flex: '1'
  },
  padded: {
    padding: 16,
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
  },
}))(LinearProgress);

const ConfigUpload = (props) => {
  const classes = useStyles();

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
      <Grid container className={classes.padded}>
        <Grid item xs={12}>
          <BorderLinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
        </Grid>

        <Grid item xs={12} className={classes.marginBottom}>
          <TextField value={configPath} onChange={(e) => setConfigPath(e.target.value)} label="config path" />
        </Grid>
        
        <Grid item xs={12} className={classes.flexContainer}>
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

export default ConfigUpload;