import React, { useReducer } from "react";
import { Button, TextField, Paper, Typography, InputLabel, Select, FormControl } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import api from '../http-axios'
import Checkbox from '@material-ui/core/Checkbox';

const DownloadAgentForm = (props) => 
{

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
      alignItems: 'center',
      justifyContent: 'center'
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
      ip: "",
      username: "",
      sudoPass: "",
      sshPass: "",
      os: ""
    }
  );
  const [checked, setChecked] = React.useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
    if(checked){
      sendPostRequest(data['formInput']);
    }
    else{
      sendDeleteRequest(data['formInput']);  
    }

  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const sendPostRequest = async (data) => {
    try {
      console.log(JSON.stringify(data));
      
        const resp = await api.post('/api/downloadAgent',
          JSON.stringify(data),
        )
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
};

const sendDeleteRequest = async (data) => {
  try {
    console.log(JSON.stringify(data));
    
      const resp = await api.post('/api/remove',
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


  console.log(props);

  return (
    <div>
      
      <Paper >
        <Typography variant="h5" component="h4">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form onSubmit={handleSubmit} className={classes.centered}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
          />
          <TextField
            label="IP"
            id="margin-normal"
            name="ip"
            defaultValue={formInput.TextField}
            helperText="enter IP of remote host"
            onChange={handleInput}
            className={classes.marginRight}
          />
          <TextField
            label="user name"
            id="margin-normal"
            name="username"
            defaultValue={formInput.TextField}
            helperText="enter username"
            onChange={handleInput}
            className={classes.marginRight}
          />
          <TextField
            label="ssh password"
            id="margin-normal"
            name="sshPass"
            type="password"
            defaultValue={formInput.name}
            helperText="enter ssh password"
            onChange={handleInput}
            className={classes.marginRight}
          />

          <TextField
            label="user password"
            id="margin-normal"
            name="sudoPass"
            type="password"
            defaultValue={formInput.name}
            helperText="enter user password"
            onChange={handleInput}
          />
          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="label">OS</InputLabel>
            <Select
              native
              onChange={handleInput}
              label="os"
              inputProps={{
                name: 'os',
                id: 'label',
              }}
            >
              <option aria-label="None" value="" />
              <option value='ubuntu'>Ubuntu</option>
              <option value='raspberry'>Raspberry pi os</option>
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

export default DownloadAgentForm;