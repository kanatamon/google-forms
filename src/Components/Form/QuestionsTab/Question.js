import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionActions from '@material-ui/core/AccordionActions'
import Divider from '@material-ui/core/Divider'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import IconButton from '@material-ui/core/IconButton'

import SaveIcon from '@material-ui/icons/Save'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

import * as ObjectUtils from '../../util/object-utils'

import QuestionPreview from './QuestionPreview'
import QuestionEditor from './QuestionEditor'

function Question({ sectionId, no, question, onSave = () => {} }) {
  const [localQuestion, setLocalQuestion] = React.useState(question)
  const [hasExpanded, setHasExpanded] = React.useState(false)

  const toggleExpand = () => {
    setHasExpanded((prevHasExpanded) => !prevHasExpanded)
  }

  const showPreview = () => {
    setHasExpanded(false)
  }

  const handleOnLocalQuestionChange = (editedQuestion) => {
    setLocalQuestion(editedQuestion)
  }

  const save = () => {
    showPreview()
    onSave(sectionId, localQuestion)
  }

  const isNeedToSave = !ObjectUtils.isDeepEqual(question, localQuestion)

  return (
    <div>
      <DragIndicatorIcon
        style={{
          transform: 'rotate(-90deg)',
          color: '#DAE0E2',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        fontSize="small"
      />
      <Accordion
        onChange={() => {
          toggleExpand()
        }}
        expanded={hasExpanded}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          elevation={1}
          style={{ width: '100%', display: hasExpanded ? 'none' : 'flex' }}
        >
          {!hasExpanded ? (
            <QuestionPreview no={no} question={localQuestion} />
          ) : null}
        </AccordionSummary>
        <AccordionDetails>
          <QuestionEditor
            no={no}
            question={localQuestion}
            onChange={handleOnLocalQuestionChange}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          {isNeedToSave ? (
            <IconButton aria-label="View" onClick={save}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="View" onClick={showPreview}>
              <VisibilityIcon />
            </IconButton>
          )}
          <IconButton aria-label="Copy" onClick={() => {}}>
            <FilterNoneIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton aria-label="delete" onClick={() => {}}>
            <DeleteOutlineIcon />
          </IconButton>
        </AccordionActions>
      </Accordion>
    </div>
  )
}

export default Question
