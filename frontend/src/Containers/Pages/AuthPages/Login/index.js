import React from 'react'
import Container from '@material-ui/core/Container' 
import Title from '../../../../Components/Title'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '../../../../Components/Button'
import {useDispatch} from 'react-redux'
import {userLoginAction} from '../../../../store/actions/loginAction'

const useStyles = makeStyles(theme => ({
    root:{
        minHeight:'80vh',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'center',
      marginTop:'20vh'
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
   
const SignUpPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        username: '',
        password: ''
      });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };

      const handleSubmit = async (e) =>{
          e.preventDefault()
          const status = await dispatch(userLoginAction(values))
          if(status === 200){
            props.history.push("/");
          }
      }
    return(
        <>
        <Title>Login</Title>
        <Container maxWidth= 'md' className={classes.root}>
        <form noValidate justify='center' className={classes.container} onSubmit={handleSubmit}>
        <TextField
        onChange={handleChange('username')}
        id="username-input"
        label="Username"
        className={classes.textField}
        type="username"
        name="username"
        autoComplete="username"
        margin="normal"
        variant="outlined"
        value={values.username}
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
        <Button value='Login'/>
        </form>
        </Container>
    </>
        )
}

export default SignUpPage