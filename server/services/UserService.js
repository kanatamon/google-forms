const UserModel = require('../db/User')
const jwt = require('jsonwebtoken')

module.exports = {
  // loginGet: async (req, res) => {
  //   try {
  //     const result = await UserModel.find().lean()
  //     return res.send(result)
  //   } catch (err) {
  //     return res.send(err)
  //   }
  // },

  login: async (req, res) => {
    try {
      const { email, name, image } = req.body
      const findUserResult = await UserModel.findOne({ email }).lean()
      // console.log(result);

      let userData = null

      if (!findUserResult) {
        const newUserRegisterData = {
          name,
          email,
          image,
        }

        const newUser = new UserModel(newUserRegisterData)
        const docs = await newUser.save()

        userData = {
          id: docs._id,
          name: docs.name,
          email: docs.email,
          image: docs.image,
        }
      } else {
        userData = {
          id: findUserResult._id,
          name: findUserResult.name,
          email: findUserResult.email,
          image: findUserResult.image,
        }
      }

      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h',
      })
      // console.log(accessToken);
      return res.status(200).json({
        accessToken,
      })
    } catch (error) {
      return res.send(error)
    }
  },
}
