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
    root: {
      marginBottom: 16
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    centered: {
      display: 'flex',
      alignItems: 'center'
    },
    flex: {
      flex: '1'
    },
    padded: {
      padding: 16
    },
    marginRight: {
      marginRight: 8
    }
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

      <Grid container spacing={4} className={classes.root}>   
        <Grid item xs={12} xl = {6}>
          <Paper className={classes.padded}>
            <Typography variant="h5" component="h4">
              {props.formName}
            </Typography>
            <Typography component="p">{props.formDescription}</Typography>

            <form onSubmit={handleSubmit} className={classes.centered}>
              <TextField
                label="Package"
                id="margin-normal"
                name="package"
                defaultValue={formInput.TextField}
                helperText="enter name of the app/package"
                onChange={handleInput}
                className={`${classes.flex} ${classes.marginRight}`}
              />
              <TextField
                label="Version"
                id="margin-normal"
                name="version"
                defaultValue={formInput.name}
                helperText="enter version"
                onChange={handleInput}
                className={classes.flex}
              />
              
              <FormControl variant="outlined" className={`${classes.formControl} ${classes.flex}`}>
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
      
      <Grid item xs={12} md = {6}>
        <Paper className={classes.padded}>
            <Typography variant="h5" component="h4">
              Upload script
            </Typography>
          <GroupScriptUpload/>
          
          </Paper>
      </Grid>  
      
      </Grid>
      <Box m={3} />
    </div>
  );
}

export default ManageApp;