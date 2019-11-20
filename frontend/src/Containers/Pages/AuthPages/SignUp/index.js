import React from 'react'
import Container from '@material-ui/core/Container' 
import Title from '../../../../Components/Title'
import { makeStyles } from '@material-ui/core/styles';
import SignUpForm from './Form'
import {useDispatch} from 'react-redux'
import {userRegisterAction} from '../../../../store/actions/registerAction'

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
    const dispatch = useDispatch()
    const [values, setValues] = React.useState({
        email: '',
        sent: false
      });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };

      const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(userRegisterAction({"email": values.email}))
        setValues({ ...values, sent: true });
      }
    return(
        <>
        <Title>Registration</Title>
        <Container maxWidth= 'md' className={classes.root}>
        { !values.sent ? <SignUpForm classes = {classes} handleSubmit={handleSubmit} handleChange={handleChange} values = {values}/> : <div><p>Thanks for your registration. 
        Our hard working monkeys are preparing a digital message called E-Mail that will be sent to you soon. Since monkeys arent good in writing the message could end up in you junk folder. Our apologies for any inconvienience.</p></div>
        }
        </Container>
    </>
        )
}

export default SignUpPage