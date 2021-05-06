import React, { useReducer, useState, useEffect } from "react";
import { Box, Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import api from '../http-axios'

const InstallAppFormSubmit = (props) => 
{
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { mac } = useParams();
  const [Groups, setGroups] = useState([]);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      mac: mac,
      package: "",
      version: "",
      action: "",
    }
  );

  const [GroupInput, setGroupInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      mac: mac,
      name:''
    }
  );
  
  useEffect(() => {
    const getGroups = async () => {
      try {
        const data  = (await api.get('/api/groups')).data;
        console.log(data)
        const nameArr = data.map((item) => item.name);
        setGroups(nameArr)
      } catch(e) {
        console.log(e);
      }
    };
    getGroups();
  }, []);


  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };

    sendPostRequest(data['formInput']);

  };

  const sendPostRequest = async (data) => {
    try {
      console.log(JSON.stringify(data));
      
        const resp = await api.post('/api/management',
          JSON.stringify(data),
        )
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
};

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleGroupInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setGroupInput({ [name]: newValue });
  };

  const handleGroupSubmit = evt => {
    evt.preventDefault();

    let data = { GroupInput };
                 
    sendAddGroupRequest(data['GroupInput']);

  };


  const sendAddGroupRequest = async (data) => {
    try {
      console.log(JSON.stringify(data));
      
        const resp = await api.post('/api/addToGroup',
          JSON.stringify(data),
          )
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
};


  return (
    <div>

      <Grid container spacing={8} > 
             
      <Grid item xs={12} md = {6}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h4">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Package"
            id="margin-normal"
            name="package"
            defaultValue={formInput.TextField}
            helperText="enter name of the app/package"
            onChange={handleInput}
          />
          <TextField
            label="Version"
            id="margin-normal"
            name="version"
            defaultValue={formInput.name}
            helperText="enter version"
            onChange={handleInput}
          />
          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="label">Action</InputLabel>
            
            <Select
              native
              onChange={handleInput}
              label="action"
              inputProps={{
                name: 'action',
                id: 'label',
              }}
            >
              <option aria-label="None" value="" />
              <option value='install'>Install</option>
              <option value='update'>Update</option>
              <option value='remove'>Remove</option>
            </Select>
          </FormControl>
          
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit 
          </Button>
        </form>
      </Paper>
      
      </Grid>

      <Grid item xs={12} md = {6}><Paper className={classes.paper}>
      <Typography variant="h5" component="h4">
          Add to group
        </Typography>
        <form onSubmit={handleGroupSubmit}>
          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="label">Group</InputLabel>
            <Select
              native
              onChange={handleGroupInput}
              label="name"
              inputProps={{
                name: 'name',
                id: 'label',
              }}
            >
              <option aria-label="None" value="" />
              {Groups.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
               ))}
            </Select>
          </FormControl>
          
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
            Add 
          </Button>
        </form>
          
          </Paper>
         </Grid>   
      </Grid>
      <Box m={10} />
    </div>
  );
}

export default InstallAppFormSubmit;