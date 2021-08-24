const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { RESPONSE_TYPES } = require('./shared')

/**
 * @typedef Section
 * @type {object}
 * @property {string} _id
 * @property {string} name
 * @property {string} [description]
 * @property {Question[]} questions
 */

/**
 * @typedef QuestionOption
 * @type {object}
 * @property {string} _id
 * @property {string} optionText
 */

/**
 * @typedef Question
 * @type {object}
 * @property {string} _id
 * @property {string} questionText
 * @property {import('./shared').ResponseTypes} responseType
 * @property {QuestionOption[]} [options]
 * @property {Array<{rowText: string, shownGroups: string[]}>} [gridRows]
 * @property {Array<{columnText: string}>} [gridColumns]
 */

/**
 * @typedef Form
 * @type {object}
 * @property {string} _id
 * @property {string[]} groupNames
 * @property {string} createdBy
 * @property {Section[]} sections
 */

const FormSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    groupNames: [{ type: String }],

    sections: [
      {
        name: String,
        description: {
          type: String,
          default: '',
        },
        shownGroups: [{ type: String }],

        questions: [
          {
            shownGroups: [{ type: String }],
            responseType: {
              type: String,
              enum: RESPONSE_TYPES,
              required: true,
            },
            questionText: String,
            options: [
              {
                optionText: String,
                shownGroups: [{ type: String }],
              },
            ],
            gridRows: [
              {
                rowText: String,
                shownGroups: [{ type: String }],
              },
            ],
            gridColumns: [
              {
                columnText: String,
              },
            ],
          },
        ],
      },
    ],

    stared: { type: Boolean, default: false },

    formType: { type: String, default: 'anonymous' },
  },
  { timestamps: true }
)

FormSchema.plugin(mongoosePaginate)
const Form = mongoose.model('Form', FormSchema, 'Form')

module.exports = Form
