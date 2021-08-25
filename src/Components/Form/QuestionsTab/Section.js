import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionActions from '@material-ui/core/AccordionActions'
import Divider from '@material-ui/core/Divider'

import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

import * as ObjectUtils from '../../util/object-utils'

import SectionPreview from './SectionPreview'
import SectionEditor from './SectionEditor'

/**
 * @param {object} props
 * @param {import('../../../../server/db/Form').Section} props.section
 * @param {string[]} props.availableGroupNames
 */
function Section({ section, availableGroupNames, onSave = () => {} }) {
  const [localSection, setLocalSection] = React.useState(section)
  const [hasExpanded, setHasExpanded] = React.useState(false)

  const toggleExpand = () => {
    setHasExpanded((prevHasExpanded) => !prevHasExpanded)
  }

  const showPreview = () => {
    setHasExpanded(false)
  }

  const handleOnSectionEditorChange = (newLocalSection) => {
    setLocalSection(newLocalSection)
  }

  const save = () => {
    showPreview()
    onSave(localSection)
  }

  const isNeedToSave = !ObjectUtils.isDeepEqual(section, localSection)

  return (
    <Accordion onChange={toggleExpand} expanded={hasExpanded}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        elevation={1}
        style={{ width: '100%', display: hasExpanded ? 'none' : 'flex' }}
      >
        <SectionPreview section={localSection} />
      </AccordionSummary>
      <AccordionDetails>
        <SectionEditor
          section={localSection}
          availableGroupNames={availableGroupNames}
          onChange={handleOnSectionEditorChange}
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
        <IconButton aria-label="Copy">
          <FilterNoneIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton aria-label="delete">
          <DeleteOutlineIcon />
        </IconButton>
      </AccordionActions>
    </Accordion>
  )
}

export default Section
