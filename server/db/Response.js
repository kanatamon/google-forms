const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { RESPONSE_TYPES } = require('./shared')

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    response: [
      {
        responseType: {
          type: String,
          enum: RESPONSE_TYPES,
          required: true,
        },
        questionId: String,
        optionIds: [{ type: String }],
        answerText: String,
        gridRows: [
          {
            rowId: String,
            optionIds: [{ type: String }],
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

ResponseSchema.plugin(mongoosePaginate)
const Response = mongoose.model('Response', ResponseSchema, 'Response')

module.exports = Response
