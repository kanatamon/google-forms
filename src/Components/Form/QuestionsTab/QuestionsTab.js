import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

import formService from '../../../services/formService'

import GroupsEditor from './GroupsEditor'
import QuestionsList from './QuestionsList'
import Section from './Section'

/**
 * @typedef {import('../../../../server/db/Form').Form} Form
 * @typedef {import('../../../../server/db/Form').Section} Section
 * @typedef {import('../../../../server/db/Form').Question} Question
 */

let localId = 0

const generateNewLocalId = () => {
  return localId++
}

function QuestionsTab({ formId }) {
  /**
   * @type {[Form, function}
   */
  const [form, setForm] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(
    function initForm() {
      ;(async () => {
        if (formId) {
          setIsLoading(true)

          const form = await formService.getForm(formId)
          setForm(form)

          setIsLoading(false)
        }
      })()
    },
    [formId]
  )

  const addQuestion = async (sectionIndex) => {
    const targetSection = form.sections[sectionIndex]
    targetSection.questions = [
      ...targetSection.questions,
      generatePresettingQuestion(),
    ]

    const savingSectionsForm = {
      _id: form._id,
      sections: form.sections,
    }
    const savedForm = await formService.saveForm(savingSectionsForm)

    setForm(savedForm)
  }

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return
    }

    const { source, destination } = result
    const hasSwapOnSameSection = source.droppableId === destination.droppableId

    if (hasSwapOnSameSection) {
      const swappedQuestionsForm = swapTwoQuestionsOnSameSection(
        form,
        source,
        destination
      )

      const savingSectionsForm = {
        _id: swappedQuestionsForm._id,
        sections: swappedQuestionsForm.sections,
      }
      const savedForm = await formService.saveForm(savingSectionsForm)
      setForm(savedForm)
    }

    if (!hasSwapOnSameSection) {
      // TODO: move question to dropped section
    }
  }

  const handleOnGroupEditorSubmit = async (submittedGroupNames) => {
    const savingForm = {
      _id: form._id,
      groupNames: submittedGroupNames,
    }
    const savedForm = await formService.saveForm(savingForm)
    setForm(savedForm)
  }

  const handleOnAnSectionSave = async (aSavingSection) => {
    const { sections } = form
    const savingSectionIndex = sections.findIndex(
      (formSection) => formSection._id === aSavingSection._id
    )

    if (savingSectionIndex === -1) {
      throw new Error(`Can't find a section to save`)
    }

    sections[savingSectionIndex] = aSavingSection

    const savingAnSectionForm = {
      _id: form._id,
      sections,
    }
    const savedForm = await formService.saveForm(savingAnSectionForm)

    setForm(savedForm)
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (!form) {
    return 'Something went wrong, please refresh page.'
  }

  return (
    <div
      style={{ marginTop: '15px', marginBottom: '7px', paddingBottom: '30px' }}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12} sm={8} style={{ width: '100%', paddingTop: '10px' }}>
          <GroupsEditor
            groupNames={form.groupNames}
            onSubmit={handleOnGroupEditorSubmit}
          />
          <Box m="32px" />
          <DragDropContext onDragEnd={onDragEnd}>
            {form.sections.map((section, sectionIndex) => {
              const sectionId =
                section._id !== undefined ? section._id : section._local_id

              return (
                <Droppable key={sectionId} droppableId={`${sectionId}`}>
                  {(provided, _snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Section
                        section={section}
                        availableGroupNames={form.groupNames}
                        onSave={handleOnAnSectionSave}
                      />
                      <QuestionsList questions={section.questions} />
                      <Button
                        variant="contained"
                        onClick={() => addQuestion(sectionIndex)}
                        startIcon={<AddIcon />}
                        style={{ margin: '5px' }}
                      >
                        Add Question
                      </Button>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            })}
          </DragDropContext>
        </Grid>
      </Grid>
    </div>
  )
}

/**
 * @returns {Question} a default question and option
 */
const generatePresettingQuestion = () => {
  return {
    _local_id: generateNewLocalId(),
    responseType: 'MultipleChoice',
    open: false,
    questionText: 'Question',
    options: [
      {
        optionText: 'Option 1',
      },
    ],
  }
}

/**
 * Swap 2 items in shallow copy array
 * @param {Array} array
 * @param {number} itemAIndex
 * @param {number} itemBIndex
 * @returns {Array} shallow copy array of swapped position between a & b
 */
const swapTwoItemInArray = (array, itemAIndex, itemBIndex) => {
  const shallowCopyArray = [...array]

  const itemTemp = shallowCopyArray[itemAIndex]
  shallowCopyArray[itemAIndex] = shallowCopyArray[itemBIndex]
  shallowCopyArray[itemBIndex] = itemTemp

  return shallowCopyArray
}

/**
 * @param {Form} form
 * @param {{ droppableId: string, index: number}} source
 * @param {{ droppableId: string, index: number}} destination
 * @returns {Form} shallow copy of the given form with modification
 */
const swapTwoQuestionsOnSameSection = (form, source, destination) => {
  const { sections } = form
  const sectionIdWhereSwapHappening = source.droppableId

  const sectionWhereSwapHappening = getSectionById(
    sections,
    sectionIdWhereSwapHappening
  )

  sectionWhereSwapHappening.questions = swapTwoItemInArray(
    sectionWhereSwapHappening.questions,
    source.index,
    destination.index
  )

  return { ...form }
}

/**
 * @param {Section[]} sections
 * @param {string | number} targetSectionId
 */
const getSectionById = (sections, targetSectionId) => {
  return sections.find((section) => {
    const sectionId =
      section._id !== undefined ? section._id : section._local_id
    return sectionId === targetSectionId
  })
}

export default QuestionsTab
