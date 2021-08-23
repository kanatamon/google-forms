import * as React from 'react'

import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

function QuestionEditor({ no, index, question, onChange }) {
  const handleOptionValue = (text, i, j) => {
    // var optionsOfQuestion = [...questions]
    // optionsOfQuestion[i].options[j].optionText = text
    // //newMembersEmail[i]= email;
    // setQuestions(optionsOfQuestion)
  }

  const addOption = (i) => {
    // var optionsOfQuestion = [...questions]
    // if (optionsOfQuestion[i].options.length < 5) {
    //   optionsOfQuestion[i].options.push({
    //     optionText: 'Option ' + (optionsOfQuestion[i].options.length + 1),
    //   })
    // } else {
    //   console.log('Max  5 options ')
    // }
    // //console.log(optionsOfQuestion);
    // setQuestions(optionsOfQuestion)
  }

  const removeAnOption = (optionIndex) => {
    // var optionsOfQuestion = [...questions]
    // if (optionsOfQuestion[i].options.length > 1) {
    //   optionsOfQuestion[i].options.splice(j, 1)
    //   setQuestions(optionsOfQuestion)
    //   console.log(i + '__' + j)
    // }
    onChange((prevQuestion) => {
      const { options } = prevQuestion
      options.splice(optionIndex, 1)
      const editedOptions = [...options]
      return { ...prevQuestion, options: editedOptions }
    })
  }

  const handleOnQuestionTextChange = (text) => {
    onChange((prevQuestion) => ({ ...prevQuestion, questionText: text }))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '15px',
        marginTop: '-15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography style={{ marginTop: '20px' }}>{no}.</Typography>
        <TextField
          fullWidth={true}
          placeholder="Question Text"
          style={{ marginBottom: '18px' }}
          rows={2}
          rowsMax={20}
          multiline={true}
          value={question.questionText}
          variant="filled"
          onChange={(event) => {
            handleOnQuestionTextChange(event.target.value)
          }}
        />
      </div>

      <div style={{ width: '100%' }}>
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '-12.5px',
                justifyContent: 'space-between',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
            >
              <Radio disabled />
              <TextField
                fullWidth={true}
                placeholder="Option text"
                style={{ marginTop: '5px' }}
                value={question.options[optionIndex].optionText}
                onChange={(e) => {
                  handleOptionValue(e.target.value, index, optionIndex)
                }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  removeAnOption(optionIndex)
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <div>
        <FormControlLabel
          disabled
          control={<Radio />}
          label={
            <Button
              size="small"
              onClick={() => {
                addOption()
              }}
              style={{
                textTransform: 'none',
                marginLeft: '-5px',
              }}
            >
              Add Option
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default QuestionEditor
