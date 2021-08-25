import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MultipleSelect from './MultipleSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1) + 'px',
  },
}))

function SectionEditor({ section, availableGroupNames, onChange = () => {} }) {
  const classes = useStyles()
  const { name, description, groupNamesToShow } = section

  const handleOnChangeNatively = (event) => {
    const { value, name } = event.target

    onChange({
      ...section,
      [name]: value,
    })
  }

  return (
    <div className={classes.root}>
      <MultipleSelect
        id={`section-editor-multiple-select-${section._id}`}
        label="Show for the following groups"
        options={availableGroupNames}
        name="groupNamesToShow"
        values={groupNamesToShow}
        onChange={handleOnChangeNatively}
      />
      <TextField
        autoFocus
        margin="dense"
        id={`section-editor-section-name-${section._id}`}
        label="Section Name"
        type="text"
        fullWidth={false}
        value={name}
        name="name"
        onChange={handleOnChangeNatively}
      />
      <TextField
        autoFocus
        fullWidth
        multiline
        margin="dense"
        id={`section-editor-section-description-${section._id}`}
        label="Section description"
        type="text"
        value={description}
        name="description"
        onChange={handleOnChangeNatively}
      />
    </div>
  )
}

export default SectionEditor
