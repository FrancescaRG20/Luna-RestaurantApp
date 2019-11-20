import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '../../../../../Components/Button'

const SignUpForm = (props) =>{
    return(
        <form noValidate justify='center' className={props.classes.container} onSubmit={props.handleSubmit}>
        <TextField
        onChange={props.handleChange('email')}
        id="email-input"
        label="Email"
        className={props.classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={props.values.email}
        />
        <Button value='Register'/>
        </form>
    )
}

export default SignUpForm