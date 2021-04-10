import React, { useReducer } from "react";
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const InstallAppFormSubmit = (props) => 
{
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { mac } = useParams();
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

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };

    sendPostRequest(data);

  };

  const sendPostRequest = async (data) => {
    try {
      console.log(JSON.stringify(data));
      
        const resp = await axios({
          method: 'post',
          url : 'http://0.0.0.0:5000/api/management',
          data: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
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


  console.log(props);

  return (
    <div>
      <Paper >
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
    </div>
  );
}

export default InstallAppFormSubmit;