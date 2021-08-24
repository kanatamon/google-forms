import * as React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function SavedGroupEditor({ id, name, onDelete }) {
  const handleOnDeleteButtonClick = () => {
    onDelete(id)
  }

  return (
    <ListItem>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
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

export default SavedGroupEditor
