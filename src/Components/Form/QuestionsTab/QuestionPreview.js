import * as React from 'react'

import { Typography } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

function QuestionPreview({ no, question }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '3px',
        paddingTop: '15px',
        paddingBottom: '15px',
      }}
    >
      {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}

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
