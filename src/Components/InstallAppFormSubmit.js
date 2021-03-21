import React, { useReducer } from "react";
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from 'axios';

const InstallAppFormSubmit = (props) => {

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      package: "",
      version: "",
      action: "install",
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
          <InputLabel id="label">action</InputLabel>
          <Select labelId="label" id="select" value="Install" onChange={handleInput} defaultValue={formInput.install} name="action">
            <MenuItem value="install">Install</MenuItem>
            <MenuItem value="remove">Remove</MenuItem>
            <MenuItem value="update">Update</MenuItem>
          </Select>
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