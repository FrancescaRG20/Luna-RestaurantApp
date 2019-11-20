import React, {useEffect} from 'react'
import Container from '@material-ui/core/Container' 
import Title from '../../../../Components/Title'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '../../../../Components/Button'
import {useDispatch} from 'react-redux'
import {userValidateAction} from '../../../../store/actions/validateAction'
import MultiSelect from '../../../../Components/MultiSelect'
import {newRestaurantAction} from '../../../../store/actions/newRestaurantAction'

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
   
const CreateRestaurantPage = (props) => {
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({
      name: '',
      categories: [],
      country: '',
      street: '',
      city: '',
      zip: '',
      website: 'https://',
      phone: '',
      email: '',
      openingHours: '',
      priceLevel: null,
      image: null,
    });
  

    const classes = useStyles();
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(values.categories)
      const form = new FormData()
      form.append('name', values.name)
      form.append('categories', JSON.stringify(values.categories))
      form.append('country', values.counrty)
      form.append('street', values.street)
      form.append('city', values.city)
      form.append('zip_code', values.zip)
      form.append('website', values.website)
      form.append('phone', values.phone)
      form.append('email', values.email)
      form.append('opening_hours', values.openingHours)
      form.append('price_level', values.priceLevel)
      form.append('picture', values.image)
      const waitForReturn = await dispatch(newRestaurantAction(form))
      if (waitForReturn) {
        props.history.push("/");
      }
  
    }
    const MultiSelectChangeHandler = categories =>{       
        setValues({...values, categories: categories})
      }
    const handleImageChange = (e) =>{
        setValues({...values,
            image: e.target.files[0]
          })
    }
    return(
        <>
        <Title>Create New Restaurant</Title>
        <Container maxWidth= 'lg'height='100%'>
        <form noValidate name='newRestaurant' id='newRestaurant' justify='center' autoComplete="on" on onSubmit={handleSubmit}>
        <h3>Basic</h3>
        <Grid container justify='center' spacing={2}>
        <TextField
        onChange={handleChange('name')}
        id="name"
        label="Name"
        className={classes.textField}
        type="text"
        name="name"
        autoComplete="name"
        margin="normal"
        variant="outlined"
        value={values.name}
        />
        <MultiSelect change={MultiSelectChangeHandler}/>
        <TextField
        onChange={handleChange('country')}
        id="country-input"
        label="Country"
        className={classes.textField}
        type="text"
        name="country"
        margin="normal"
        variant="outlined"
        value={values.country}
        />
        </Grid>
        <h3>Address</h3>
        <Grid container justify='center' spacing={2}>
        <TextField
        onChange={handleChange('street')}
        id="street-input"
        label="street"
        className={classes.textField}
        type="text"
        name="street"
        autoComplete="street"
        margin="normal"
        variant="outlined"
        value={values.street}
        />
        <TextField
        onChange={handleChange('city')}
        id="city-input"
        label="City"
        className={classes.textField}
        type="text"
        name="city"
        autoComplete="city"
        margin="normal"
        variant="outlined"
        value={values.city}
        />
        <TextField
        onChange={handleChange('zip')}
        id="zip"
        label="Zip"
        className={classes.textField}
        type="text"
        name="zip"
        margin="normal"
        variant="outlined"
        value={values.zip}
        />
        </Grid>
        <h3>Contact</h3>
        <Grid container justify='center' spacing={2}>
        <TextField
        onChange={handleChange('website')}
        id="website-input"
        label="Website"
        className={classes.textField}
        type="url"
        name="website"
        autoComplete="website"
        margin="normal"
        variant="outlined"
        value={values.website}
        />
        <TextField
        onChange={handleChange('phone')}
        id="phone"
        label="Phone"
        className={classes.textField}
        type="text"
        name="phone"
        margin="normal"
        variant="outlined"
        value={values.phone}
        />
        <TextField
        onChange={handleChange('email')}
        id="email"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        margin="normal"
        variant="outlined"
        value={values.email}
        />
        </Grid>
        <h3>Details</h3>
        <Grid container justify='center' spacing={2}>
        <TextField
        onChange={handleChange('openingHours')}
        id="opening-hours"
        label="Opening hours"
        className={classes.textField}
        type="text"
        name="openingHours"
        margin="normal"
        variant="outlined"
        value={values.openingHours}
        />
        <TextField
        onChange={handleChange('priceLevel')}
        id="price-level-input"
        label="Price level"
        className={classes.textField}
        type="number"
        name="priceLevel"
        autoComplete="price-level"
        margin="normal"
        variant="outlined"
        value={values.priceLevel}
        />
        <input type="file"
                   id="image"
                   accept="image/png, image/jpeg" name="image" onChange={handleImageChange} required/>
        </Grid>
        <Button value='Finish Registration'/>
        </form>
        </Container>
    </>
        )
}

export default CreateRestaurantPage