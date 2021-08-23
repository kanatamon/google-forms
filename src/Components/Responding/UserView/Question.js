import React from 'react'

import { Paper, Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Divider from '@material-ui/core/Divider'

function Question({ question, questionIndex, onResponseChanged }) {
  const [value, setValue] = React.useState(null)

  const savedQuestion = React.useRef()
  const savedOnResponseChanged = React.useRef()

  React.useEffect(() => {
    savedQuestion.current = question
    savedOnResponseChanged.current = onResponseChanged
  })

  React.useEffect(() => {
    if (typeof value === 'number') {
      const { _id: questionId, options } = savedQuestion.current

      const response = {
        questionId,
        optionId: options[value]._id,
      }

      savedOnResponseChanged.current(questionId, response)
    }
  }, [value])

  const handleRadioChange = (optionIndex) => {
    setValue(optionIndex)
  }

  return (
    <Paper>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '6px',
            paddingTop: '15px',
            paddingBottom: '15px',
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
            {questionIndex + 1}. {question.questionText}
          </Typography>

          {question.questionImage !== '' ? (
            <div>
              <img src={question.questionImage} width="80%" height="auto" />
              <br />
              <br />
            </div>
          ) : null}

          <div>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={(e) => {
                handleRadioChange(+e.target.value, questionIndex)
              }}
            >
              {question.options.map((op, j) => (
                <div key={j}>
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '7px',
                    }}
                  >
                    <FormControlLabel
                      value={j}
                      control={<Radio />}
                      label={op.optionText}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '10px',
                    }}
                  >
                    {op.optionImage !== '' ? (
                      <img src={op.optionImage} width="64%" height="auto" />
                    ) : null}
                    <Divider />
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default Question
