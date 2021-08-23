import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

function QuestionEditorActions({
  onShowPreviewClick = () => {},
  onCopyClick = () => {},
  onDeleteClick = () => {},
}) {
  return (
    <>
      <IconButton aria-label="View" onClick={onShowPreviewClick}>
        <VisibilityIcon />
      </IconButton>
      <IconButton aria-label="Copy" onClick={onCopyClick}>
        <FilterNoneIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <IconButton aria-label="delete" onClick={onDeleteClick}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
  )
}

export default QuestionEditorActions
