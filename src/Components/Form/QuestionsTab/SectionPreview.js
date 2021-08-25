import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1) + 'px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

function SectionPreview({ section }) {
  const classes = useStyles()
  const { name, description, groupNamesToShow } = section

  return (
    <div className={classes.root}>
      <div className={classes.chips}>
        {groupNamesToShow.map((groupName) => (
          <Chip key={groupName} label={groupName} className={classes.chip} />
        ))}
      </div>
      <Typography
        variant="h4"
        style={{
          fontFamily: 'sans-serif Roboto',
          marginBottom: '15px',
        }}
      >
        {name}
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </div>
  )
}

export default SectionPreview
