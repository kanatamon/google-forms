import * as React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

import * as ArrayUtils from '../../util/array-utils'
import * as ObjectUtils from '../../util/object-utils'

import UnsavedGroupEditor from './UnsavedGroupEditor'
import SavedGroupEditor from './SavedGroupEditor'

/**
 * @typedef {object} LocalGroup
 * @property {string} string
 * @property {string} name
 * @property {boolean} isSaved
 */

const generateNextPresettingGroupName = () => {
  const groupId = Date.now()
  return `Group ${groupId}`
}

function GroupsEditor({ groupNames, onSubmit }) {
  const [localGroups, setLocalGroups] = React.useState(
    transformToLocalGroups(groupNames)
  )
  // We intentionally don't care whether `onSubmit` will change or not.
  // We intended calling it to inform a change for parent when we capture
  // any change on `localGroup` differ from the parent given `groupNames`.
  const onSubmitRef = React.useRef(onSubmit)

  const savedLocalGroupNames = localGroups
    .filter((localGroup) => localGroup.isSaved)
    .map((localGroup) => localGroup.name)

  React.useEffect(() => {
    if (!ObjectUtils.isDeepEqual(savedLocalGroupNames, groupNames)) {
      onSubmitRef.current(savedLocalGroupNames)
    }
  }, [savedLocalGroupNames, groupNames])

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

  const localGroupNames = localGroups.map((localGroup) => localGroup.name)

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
                othersGroupName={ArrayUtils.getAllButExclude(
                  localGroupNames,
                  localGroup.name
                )}
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

export default GroupsEditor
