import * as React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
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
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function MultipleSelect({
  id,
  name,
  label,
  options,
  values,
  onChange = () => {},
}) {
  const classes = useStyles()
  const [selectedOptions, setSelectedOptions] = React.useState([])

  const isControlledComponent = !!values

  const handleChange = (event) => {
    if (isControlledComponent) {
      onChange(event)
      return
    }

    const { value: newSelectedOptions } = event.target
    setSelectedOptions(newSelectedOptions)
  }

  const inputLabelId = `${id}-multiple-checkbox-label`
  const selectId = `${id}-multiple-checkbox`

  const usingValues = isControlledComponent ? values : selectedOptions

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={inputLabelId}>{label}</InputLabel>
      <Select
        name={name}
        labelId={inputLabelId}
        id={selectId}
        multiple
        value={usingValues}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={usingValues.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultipleSelect
