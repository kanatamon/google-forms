const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { RESPONSE_TYPES } = require('../../src/shared/constants')

/**
 * @typedef Section
 * @type {object}
 * @property {string} _id
 * @property {string} name
 * @property {string} [description]
 * @property {Question[]} questions
 * @property {string[]} groupNamesToShow
 */

/**
 * @typedef QuestionOption
 * @type {object}
 * @property {string} _id
 * @property {string} optionText
 * @property {string[]} groupNamesToShow
 * @property {string[]} registerGroupNames
 */

/**
 * @typedef Question
 * @type {object}
 * @property {string} _id
 * @property {string} questionText
 * @property {import('../../src/shared/constants').ResponseTypes} responseType
 * @property {QuestionOption[]} [options]
 * @property {Array<{rowText: string, groupNamesToShow: string[]}>} [gridRows]
 * @property {Array<{columnText: string}>} [gridColumns]
 * @property {string[]} groupNamesToShow
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
        groupNamesToShow: [{ type: String }],

        questions: [
          {
            groupNamesToShow: [{ type: String }],
            responseType: {
              type: String,
              enum: RESPONSE_TYPES,
              required: true,
            },
            questionText: String,
            options: [
              {
                optionText: String,
                groupNamesToShow: [{ type: String }],
                groupNamesToRegisterWhenOptionIsSelected: [{ type: String }],
              },
            ],
            gridRows: [
              {
                rowText: String,
                groupNamesToShow: [{ type: String }],
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
