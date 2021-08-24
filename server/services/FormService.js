const FormModel = require('../db/Form')
const UserModel = require('../db/User')
const ResponseModel = require('../db/Response')

module.exports = {
  formsGet: async (req, res) => {
    try {
      const result = await FormModel.find().lean()
      return res.send(result)
    } catch (e) {
      return res.send(e)
    }
  },

  createForm: async (req, res) => {
    try {
      const { createdBy, sections } = req.body

      const newFormData = {
        createdBy,
        sections,
      }

      const newForm = new FormModel(newFormData)

      console.log('created new form')

      const docs = await newForm.save()

      await UserModel.updateOne(
        { _id: newFormData.createdBy },
        { $push: { createdForms: docs._id } }
      )

      console.log('Form id added to user details')

      return res.status(200).json(docs)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  getFormById: async (req, res) => {
    try {
      const { formId } = req.params

      const form = await FormModel.findOne({ _id: formId })

      if (form === null) {
        return res.status(404).send('Form not found')
      }

      return res.status(200).json(form)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  deleteForm: async (req, res) => {
    try {
      const { formId, userId } = req.params

      console.log(formId)
      console.log(userId)

      const form = await FormModel.findOne({ _id: formId })

      console.log(form)

      if (form === null) {
        return res.status(404).send('Form not found or already deleted')
      } else {
        if (form.createdBy === userId) {
          form.remove((err) => {
            if (err) {
              return res.status(500).send(err)
            }
            console.log('Form deleted')
            return res.status(202).send('Form Deleted')
          })
        } else {
          return res.status(401).send('You are not the owner of this Form')
        }
      }
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  editForm: async (req, res) => {
    try {
      const formId = req.body._id
      const formData = {
        groupNames: req.body.groupNames,
        sections: req.body.sections,
      }

      console.log('Hi, I am from backend, this is form data that i recivied')

      console.log(formData)

      FormModel.findByIdAndUpdate(
        formId,
        formData,
        { new: true },
        (err, result) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(200).json(result)
          }
        }
      )
    } catch (err) {
      return res.send(err)
    }
  },

  getAllFormsOfUser: async (req, res) => {
    try {
      const { userId } = req.params
      const user = await UserModel.findById(userId)

      if (user === null) {
        return res.status(404).send('User not found')
      }

      const records = await FormModel.find().where('_id').in(user.createdForms)

      return res.status(200).json(records)
    } catch (err) {
      return res.send(err)
    }
  },

  submitResponse: async (req, res) => {
    try {
      const { formId, userId, response } = req.body

      const data = {
        formId,
        userId,
        response,
      }

      if (data.response.length > 0) {
        const newResponse = new ResponseModel(data)

        const docs = await newResponse.save()

        return res.status(200).json(docs)
      } else {
        return res.status(400).send('Fill atleast one field, MF!')
      }
    } catch (err) {
      return res.send(err)
    }
  },

  allResponses: async (req, res) => {
    try {
      const result = await ResponseModel.find().lean()
      return res.json(result)
    } catch (err) {
      return res.send(err)
    }
  },

  getResponse: async (req, res) => {
    try {
      const { formId } = req.params
      //   console.log(formId);

      const responses = await ResponseModel.find({ formId: formId })

      return res.status(200).json(responses)
    } catch (err) {
      return res.send(err)
    }
  },
}

// FormId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Form'
//   },

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },

//   response : [{
//       questionId: String,
//       optionId: String,
//   }],
