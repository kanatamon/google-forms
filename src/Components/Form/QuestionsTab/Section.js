import React from 'react'

import { Paper, Typography } from '@material-ui/core'

/**
 * @param {{ section: {import('../../../../server/db/Form').Section} }} props
 */
function FormSection({ section }) {
  const { name, description } = section
  return (
    <Paper
      elevation={2}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: '15px',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontFamily: 'sans-serif Roboto',
            marginBottom: '15px',
          }}
        >
          {name}
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </div>
    </Paper>
  )
}

export default FormSection
