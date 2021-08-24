import * as React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'

function UnsavedGroupEditor({ id, name, othersGroupName, onSave, onDelete }) {
  const [localName, setLocalName] = React.useState(name)

  const updateLocalName = (event) => {
    const { value: newName } = event.target
    setLocalName(newName)
  }

  const handleOnSaveButtonClick = () => {
    onSave(id, localName)
  }

  const handleOnDeleteButtonClick = () => {
    onDelete(id)
  }

  let error = null

  if (localName === '') {
    error = {
      label: 'Error',
      helperText: 'Group name must NOT be empty.',
    }
  } else if (othersGroupName.includes(localName)) {
    error = {
      label: 'Error',
      helperText:
        'The current group name is duplicated, please use different one.',
    }
  }

  return (
    <ListItem>
      <TextField
        error={!!error}
        id={`a-group-editor-${id}`}
        label={error ? error.label : 'Required *'}
        value={localName}
        helperText={error ? error.helperText : ''}
        variant="filled"
        onChange={updateLocalName}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={handleOnSaveButtonClick}
          edge="end"
          aria-label="save"
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          onClick={handleOnDeleteButtonClick}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default UnsavedGroupEditor
