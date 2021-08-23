import authService from '../services/authService'
import { useHistory } from 'react-router-dom'
import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ViewListIcon from '@material-ui/icons/ViewList'

import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Login(props) {
  const classes = useStyles()
  const history = useHistory()

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const { from } = props.location.state || { from: { pathname: '/' } }

  React.useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated())
  }, [])

  const loginAsGuest = async () => {
    await authService.loginAsGuest()
    history.push(from.pathname)
  }

  const logout = () => {
    authService.logout()
    setIsLoggedIn(false)
  }

  return (
    <div>
      <CssBaseline />
      <div style={{ display: 'flex', flexGrow: 1, textAlign: 'start' }}>
        <AppBar position="relative" style={{ backgroundColor: 'teal' }}>
          <Toolbar>
            <ViewListIcon
              className={classes.icon}
              onClick={() => {
                history.push('/')
              }}
            />

            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Velocity Forms
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <main>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <br></br>
        <br></br>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            {isLoggedIn ? (
              <div>
                <p>Already logged in. Want to logout?</p>
                <button onClick={logout}>Logout </button>
              </div>
            ) : (
              <Button
                onClick={loginAsGuest}
                variant="contained"
                style={{ textTransform: 'none' }}
                startIcon={
                  <Avatar
                    src={
                      'https://static.thenounproject.com/png/3244607-200.png'
                    }
                  />
                }
              >
                Login as Guest(Anonymous)
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
