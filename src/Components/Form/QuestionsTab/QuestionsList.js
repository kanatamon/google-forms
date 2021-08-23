import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import Question from './Question'

function QuestionsList({ questions }) {
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
                <Question index={index} question={question} />
              </div>
            )}
          </Draggable>
        )
      })}
    </>
  )
}

export default QuestionsList
