import * as React from 'react'

import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function FinishNotice() {
  const reloadForAnotherResponse = () => {
    window.location.reload(true)
  }

  return (
    <div>
      <Typography variant="body1">Form submitted</Typography>
      <Typography variant="body2">Thanks for submiting form</Typography>

      <Button onClick={reloadForAnotherResponse}>
        Submit another response
      </Button>
    </div>
  )
}

export default FinishNotice
