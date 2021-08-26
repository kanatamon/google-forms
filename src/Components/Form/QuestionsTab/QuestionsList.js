import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import Question from './Question'

function QuestionsList({ sectionId, questions, onAQuestionSave }) {
  return (
    <>
      {questions.map((question, index) => {
        const id =
          question._id !== undefined ? question._id : question._local_id

        return (
          <Draggable
            key={id}
            draggableId={`draggable-question-${id}`}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Question
                  no={index + 1}
                  sectionId={sectionId}
                  question={question}
                  onSave={onAQuestionSave}
                />
              </div>
            )}
          </Draggable>
        )
      })}
    </>
  )
}

export default QuestionsList
