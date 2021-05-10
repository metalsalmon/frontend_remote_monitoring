import React, { useReducer, useState } from "react";
import { Box, Button, TextField, Paper, Typography, InputLabel, Select, FormControl } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import api from '../../http-axios'
import GroupScriptUpload from './GroupScriptUpload'

const ManageApp = (props) => 
{
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { group } = useParams();
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
      group: group,
      package: "",
      version: "",
      action: "",
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };

    sendPostRequest(data['formInput']);

  };

  const sendPostRequest = async (data) => {
    try {
      console.log(JSON.stringify(data));
      
        const resp = await api.post('/api/groupManagement',
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
      
      <Grid item xs={12} md = {4}><Paper className={classes.paper}>
          <h3>upload script</h3>
          <GroupScriptUpload/>
          
          </Paper>
      </Grid>  
      
      <Box m={10} />
      
      </Grid>
      <Box m={10} />
    </div>
  );
}

export default ManageApp;