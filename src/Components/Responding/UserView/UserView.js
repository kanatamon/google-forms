import React from 'react'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import auth from '../../../services/authService'
import formService from '../../../services/formService'

import FormHeader from './FormHeader'
import MyAppBar from './MyAppBar'
import Question from './Question'
import FinishNotice from './FinishNotice'

import * as utils from './utils'

function UserView(props) {
  const [userId, setUserId] = React.useState(null)

  const [formData, setFormData] = React.useState({})
  const [questions, setQuestions] = React.useState([])

  const [isSubmitted, setIsSubmitted] = React.useState(false)

  // [IDEA NOTE]: We intended storing response data using ref instead of state
  // to prevent re-render the whole component (UserView) on each Question's
  // response changed.
  //
  // The idea is similar to the topic `Improve the Performance of your React Forms`
  // by Kent C. Dodds, that he using HTML & Form's DOM  mechanism to get key and
  // value on `submit` api firing without touching React useState's hook.
  //
  // There are 2 difference scenario,
  // (1) We're using Material-UI Component. And They did not implement as
  //  HTML & Form's DOM work.
  // (2) Form's DOM does not cover our requirements, We design some complexity
  // response's data, which need more customized mechanism.
  //
  // Ref: https://epicreact.dev/improve-the-performance-of-your-react-forms/
  const eachQuestionResponseRef = React.useRef({})

  React.useEffect(() => {
    const userId = auth.isAuthenticated()
      ? auth.getCurrentUser().id
      : utils.generateAnonymousUserId()

    setUserId(userId)
  }, [])

  const { formId } = props.match.params

  React.useEffect(() => {
    formService.getForm(formId).then((data) => {
      setFormData(data)
      setQuestions(data.questions)
    })
  }, [formId])

  const submitResponse = async () => {
    const submissionData = {
      formId: formData._id,
      userId: userId,
      response: eachQuestionResponseRef.current,
    }
    await formService.submitResponse(submissionData)
    setIsSubmitted(true)
  }

  const handleEachQuestionResponseChanged = (questionId, response) => {
    eachQuestionResponseRef.current = {
      ...eachQuestionResponseRef.current,
      [questionId]: response,
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <MyAppBar />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12} sm={5} style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              marginTop: 32,
            }}
          >
            <FormHeader form={formData} />

            {!isSubmitted ? (
              <>
                {questions.map((question, index) => (
                  <div key={question._id} style={{ width: '100%' }}>
                    <Question
                      question={question}
                      questionIndex={index}
                      onResponseChanged={handleEachQuestionResponseChanged}
                    />
                  </div>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitResponse}
                >
                  Submit
                </Button>
              </>
            ) : (
              <FinishNotice />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserView
