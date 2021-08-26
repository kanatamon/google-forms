import * as React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '3px',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

function QuestionPreview({ no, question }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.chips}>
        {question.groupNamesToShow.map((groupName) => (
          <Chip key={groupName} label={groupName} className={classes.chip} />
        ))}
      </div>

      <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>
        {no}. {question.questionText}
      </Typography>

      {question.options.map((option, j) => (
        <div key={j}>
          <div style={{ display: 'flex' }}>
            <FormControlLabel
              disabled
              control={<Radio style={{ marginRight: '3px' }} />}
              label={
                <Typography style={{ color: '#555555' }}>
                  {question.options[j].optionText}
                </Typography>
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionPreview
