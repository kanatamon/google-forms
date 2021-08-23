import * as React from 'react'

import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

function MyAppBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: 'teal' }}>
      <Toolbar>
        <IconButton
          edge="start"
          style={{ marginRight: '10px', marginBottom: '5px' }}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{}}>
          Velocity Forms
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
