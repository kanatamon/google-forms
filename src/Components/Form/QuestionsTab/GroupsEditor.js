import * as React from 'react'

import { Paper, Typography } from '@material-ui/core'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

/**
 * @typedef {object} LocalGroup
 * @property {string} string
 * @property {string} name
 * @property {boolean} isSaved
 */

let groupId = 1

const generateNextPresettingGroupName = () => {
  return `Group ${groupId++}`
}

function GroupsEditor({ groups, onSubmit }) {
  const [localGroups, setLocalGroups] = React.useState(
    transformToLocalGroups(groups)
  )
  const savedOnSubmit = React.useRef(onSubmit)

  React.useEffect(() => {
    const savedLocalGroupNames = localGroups
      .filter((localGroup) => localGroup.isSaved)
      .map((localGroup) => localGroup.name)

    if (JSON.stringify(savedLocalGroupNames) !== JSON.stringify(groups)) {
      savedOnSubmit.current(savedLocalGroupNames)
    }
  }, [localGroups, groups])

  const addNewLocalGroup = () => {
    const defaultGroupName = generateNextPresettingGroupName()
    const newGroupEditor = {
      id: defaultGroupName,
      name: defaultGroupName,
      isSaved: false,
    }
    setLocalGroups((prevLocalGroups) => [...prevLocalGroups, newGroupEditor])
  }

  const handleOnAGroupEditorSave = (savedId, savedName) => {
    const targetLocalGroupIndex = localGroups.findIndex(
      (localGroup) => localGroup.id === savedId
    )

    if (targetLocalGroupIndex === -1) {
      throw new Error(`Try to save none-exist group id: ${savedId}`)
    }

    localGroups[targetLocalGroupIndex] = {
      id: savedName,
      name: savedName,
      isSaved: true,
    }
    setLocalGroups([...localGroups])
  }

  const handleOnAGroupEditorDelete = (deletedGroupId) => {
    const newLocalGroups = localGroups.filter(({ id }) => id !== deletedGroupId)
    setLocalGroups(newLocalGroups)
  }

  const groupNames = localGroups.map((localGroup) => localGroup.name)

  return (
    <Paper
      elevation={2}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: '15px',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontFamily: 'sans-serif Roboto',
            marginBottom: '15px',
          }}
        >
          Groups
        </Typography>
        <List style={{ width: '100%' }}>
          {localGroups.map((localGroup) =>
            localGroup.isSaved ? (
              <SavedGroupEditor
                key={localGroup.id}
                {...localGroup}
                onDelete={handleOnAGroupEditorDelete}
              />
            ) : (
              <UnsavedGroupEditor
                key={localGroup.id}
                {...localGroup}
                othersGroupName={getAllButExclude(groupNames, localGroup.name)}
                onSave={handleOnAGroupEditorSave}
                onDelete={handleOnAGroupEditorDelete}
              />
            )
          )}
        </List>
        <Button
          onClick={addNewLocalGroup}
          variant="contained"
          color="default"
          startIcon={<AddIcon />}
        >
          Add new group
        </Button>
      </div>
    </Paper>
  )
}

/**
 * @param {string[]} groupNames
 * @returns {LocalGroup[]}
 */
const transformToLocalGroups = (groupNames) => {
  return groupNames.map((groupName) => ({
    id: groupName,
    name: groupName,
    isSaved: true,
  }))
}

function getAllButExclude(strArray, excludedStr) {
  return strArray.filter((str) => str !== excludedStr)
}

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

export default GroupsEditor
