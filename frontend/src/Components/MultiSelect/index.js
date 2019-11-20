import React, {useState} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { borderLeft } from '@material-ui/system';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      flex: 1,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const MultiSelect = (props) =>{
    const [categoryName, setCategoryName] = React.useState([]);

      const categories = ['thai', 'indian', 'italian', 'mexican']
      const classes = useStyles()

      const handleChange = (e) =>{
        setCategoryName(e.target.value);
        props.change(e.target.value)
      }
    return(
        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="select-multiple-checkbox" >Category</InputLabel>
        <Select
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" I/>}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
          disableUnderline='true'

        >
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categoryName.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}

export default MultiSelect