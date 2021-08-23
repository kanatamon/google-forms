import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionActions from '@material-ui/core/AccordionActions'
import Divider from '@material-ui/core/Divider'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

import QuestionPreview from './QuestionPreview'
import QuestionEditor from './QuestionEditor'
import QuestionEditorActions from './QuestionEditorActions'

function Question({ index, question }) {
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

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ width: '100%', marginBottom: '-7px' }}>
        <DragIndicatorIcon
          style={{
            transform: 'rotate(-90deg)',
            color: '#DAE0E2',
          }}
          fontSize="small"
        />
      </div>
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
          style={{ width: '100%' }}
        >
          {!hasExpanded ? (
            <QuestionPreview no={index + 1} question={localQuestion} />
          ) : null}
        </AccordionSummary>
        <AccordionDetails>
          <QuestionEditor
            // TODO: Remove props `index` from this component
            index={index}
            no={index + 1}
            question={localQuestion}
            onChange={handleOnLocalQuestionChange}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <QuestionEditorActions onShowPreviewClick={showPreview} />
        </AccordionActions>
      </Accordion>
    </div>
  )
}

export default Question
