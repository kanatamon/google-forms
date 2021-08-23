import * as React from 'react'

import { Paper, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

let groupId = 1

const generateNextPresettingGroupName = () => {
  return `Group ${groupId++}`
}

function GroupsEditor({ groups }) {
  const [localGroups, setLocalGroups] = React.useState(['Group 1', 'Group 2'])
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
          Groups Editor
        </Typography>

        <List>
          {localGroups.map((groupName) => (
            <ListItem>
              <ListItemText primary={groupName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  )
}

export default GroupsEditor
