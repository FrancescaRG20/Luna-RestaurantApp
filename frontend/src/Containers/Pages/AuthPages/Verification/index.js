import React, {useEffect} from 'react'
import Container from '@material-ui/core/Container' 
import Title from '../../../../Components/Title'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '../../../../Components/Button'
import {useDispatch} from 'react-redux'
import {userValidateAction} from '../../../../store/actions/validateAction'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: 'white',
      width: '20vw'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));
   
const VerificationPage = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [values, setValues] = React.useState({
      email: '',
      password: '',
      code: '',
      username: '',
      location: '',
      password_confirmation: '',
    });
  
  useEffect(()=>{
      const val = props.match.params.val;
      const [validationCode, email64] = val.split('--');
      const email = atob(email64)
      console.log(validationCode, email)
      setValues({ ...values, code: validationCode, email: email })
    },[])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    const handleSubmit = (e) =>{
      e.preventDefault()
      dispatch(userValidateAction(values))
      props.history.push("/");
    }
    return(
        <>
        <Title>Verification</Title>
        <Container maxWidth= 'md'height='100%'>
        <form noValidate justify='center' autoComplete="on" on onSubmit={handleSubmit}>
        <Grid container justify='center' spacing={2}>
        <TextField
        onChange={handleChange('email')}
        id="email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={values.email}
        InputProps={{
          readOnly: true,
        }}
        />
        <TextField
        onChange={handleChange('code')}
        id="code-input"
        label="Validation validationCode"
        className={classes.textField}
        type="text"
        name="code"
        margin="normal"
        variant="outlined"
        value={values.code}
        InputProps={{
          readOnly: true,
        }}
        />
        <TextField
        onChange={handleChange('username')}
        id="username-input"
        label="Username"
        className={classes.textField}
        type="text"
        name="username"
        margin="normal"
        variant="outlined"
        value={values.username}
        />
        <TextField
        onChange={handleChange('location')}
        id="location-input"
        label="Location"
        className={classes.textField}
        type="location"
        name="location"
        autoComplete="location"
        margin="normal"
        variant="outlined"
        value={values.location}
        />
        <TextField
        onChange={handleChange('password')}
        id="password-input"
        label="Password"
        className={classes.textField}
        type="password"
        name="password"
        autoComplete="password"
        margin="normal"
        variant="outlined"
        value={values.password}
        />
        <TextField
        onChange={handleChange('password_confirmation')}
        id="password-repeat-input"
        label="Password Repeat"
        className={classes.textField}
        type="password"
        name="password_confirmation"
        margin="normal"
        variant="outlined"
        value={values.password_confirmation}
        />
        </Grid>
        <Button value='Finish Registration'/>
        </form>
        </Container>
    </>
        )
}

export default VerificationPage