import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Paper, Typography } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MoreIcon from '@material-ui/icons/MoreVert'
import SettingsIcon from '@material-ui/icons/Settings'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PaletteIcon from '@material-ui/icons/Palette'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import ViewListIcon from '@material-ui/icons/ViewList'

import auth from '../../services/authService'
import formService from '../../services/formService'

import ResponseTab from '../Response/ResponseTab'

import QuestionsTab from './QuestionsTab'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    justifySelf: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    alignContent: 'space-between',
    alignItems: 'center',
  },
}))

function EditForm(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [form, setForm] = React.useState(null)
  const [openOfAlert, setOpenOfAlert] = React.useState(false)

  React.useEffect(() => {
    setUser(auth.getCurrentUser)
  }, [])

  const { formId } = props.match.params

  React.useEffect(() => {
    ;(async () => {
      if (formId) {
        const formData = await formService.getForm(formId)
        setForm(formData)
      }
    })()
  }, [formId])

  const clipToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + '/s/' + form._id)
    handleClickOfAlert()
    handleClose()
  }

  const handleClickOfAlert = () => {
    setOpenOfAlert(true)
  }

  const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenOfAlert(false)
  }

  function sendForm() {
    handleClickOpen()
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!form || !user) {
    return <p>Loading...</p>
  }

  if (form && user && form.createdBy !== user.id) {
    return <p>You're not the owner of the form</p>
  }

  return (
    <div>
      <div>
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{ backgroundColor: 'white' }}
            elevation={2}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="Rohit Saini's form"
                style={{ color: '#140078' }}
              >
                <ViewListIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                style={{ marginTop: '8.5px', color: 'black' }}
              >
                {form.name}
              </Typography>

              <IconButton aria-label="Rohit Saini's form">
                <StarBorderIcon />
              </IconButton>

              <Tabs
                className={classes.title}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Questions" />
                <Tab label="Responses" />
              </Tabs>
              <IconButton aria-label="search" onClick={sendForm}>
                <SendIcon />
              </IconButton>

              <IconButton aria-label="search">
                <PaletteIcon />
              </IconButton>
              <IconButton aria-label="search">
                <VisibilityIcon />
              </IconButton>
              <IconButton aria-label="search">
                <SettingsIcon />
              </IconButton>

              <IconButton aria-label="display more actions" edge="end">
                <MoreIcon />
              </IconButton>
              <IconButton aria-label="display more actions" edge="end">
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Copy and share link.'}
            </DialogTitle>
            <DialogContent>
              <Paper className={classes.paper}>
                <Grid
                  container
                  alignContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="body1">
                      {window.location.origin + '/s/' + form._id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      className={classes.button}
                      aria-label="Add"
                      size="medium"
                      onClick={clipToClipboard}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>

              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openOfAlert}
            autoHideDuration={3000}
            onClose={handleCloseOfAlert}
            message="Copied to clipboard"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseOfAlert}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>

        <div>
          <TabPanel value={value} index={0}>
            <QuestionsTab formId={formId} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ResponseTab formData={form} formId={formId} />
          </TabPanel>
        </div>
      </div>
    </div>
  )
}

export default EditForm

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
