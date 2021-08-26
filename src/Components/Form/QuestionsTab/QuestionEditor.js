import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import * as ObjectUtils from '../../util/object-utils'

import MultipleSelect from './MultipleSelect'
import { useGroupNames } from './group-names-context'

/**
 * @typedef {import('../../../../server/db/Form').Question} Question
 * @typedef {import('../../../../server/db/Form').QuestionOption} QuestionOption
 */

/**
 * @param {object} props
 * @param {string | number} props.no
 * @param {Question} props.question
 * @param {Function} props.onChange
 */
function QuestionEditor({ no, question, onChange }) {
  const availableGroupNames = useGroupNames()

  const handleOnAnOptionTextChange = (newOptionText, optionIndex) => {
    const { options: editedOptions } = question
    editedOptions[optionIndex].optionText = newOptionText

    onChange({
      ...question,
      options: [...editedOptions],
    })
  }

  const addAnOption = () => {
    const editingQuestion = ObjectUtils.deepClone(question)

    const { options } = editingQuestion
    const editedOptions = [...options, generateLocalOption()]

    onChange({
      ...editingQuestion,
      options: editedOptions,
    })
  }

  const removeAnOption = (optionIndex) => {
    const editingQuestion = ObjectUtils.deepClone(question)

    const { options } = editingQuestion
    options.splice(optionIndex, 1)
    const editedOptions = [...options]

    onChange({
      ...editingQuestion,
      options: editedOptions,
    })
  }

  const handleOnChangeNatively = (event) => {
    const { name, value } = event.target

    onChange({
      ...question,
      [name]: value,
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <MultipleSelect
        id={`question-editor-groups-select-${question._id}`}
        label="Show for the following groups"
        options={availableGroupNames}
        name="groupNamesToShow"
        values={question.groupNamesToShow}
        onChange={handleOnChangeNatively}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginBottom: '32px',
        }}
      >
        <Typography style={{ marginTop: '24px' }}>{no}.</Typography>
        <div
          style={{
            width: '100%',
            paddingLeft: '16px',
            paddingRight: '48px',
          }}
        >
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            id={`question-editor-question-text-${question._id}`}
            label="Question"
            type="text"
            value={question.questionText}
            name="questionText"
            onChange={handleOnChangeNatively}
          />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {question.options.map((option, optionIndex) => (
          <div key={option._id ? option._id : option._local_id}>
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
                value={option.optionText}
                onChange={({ target }) => {
                  handleOnAnOptionTextChange(target.value, optionIndex)
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
              onClick={addAnOption}
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

let localOptionId = 2

function generateLocalOption() {
  return {
    _local_id: localOptionId,
    optionText: `Option ${localOptionId++}`,
  }
}

export default QuestionEditor
