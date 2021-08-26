/**
 * @typedef {(
 * 'MultipleChoice'
 * | 'Checkboxes'
 * | 'Dropdown'
 * | 'MultipleChoiceGrid'
 * | 'CheckboxGrid'
 * | 'Date'
 * | 'Time'
 * | 'ShortAnswer'
 * | 'Paragraph'
 * | 'Prioritization'
 * )} ResponseTypes
 */

const RESPONSE_TYPES = [
  'MultipleChoice',
  'Checkboxes',
  'MultipleChoiceGrid',
  'CheckboxGrid',
  'ShortAnswer',
  'Paragraph',
  'Prioritization',
  // Belows are marked as not-implemented-yet
  'Dropdown',
  'Date',
  'Time',
]

module.exports = {
  RESPONSE_TYPES,
}
