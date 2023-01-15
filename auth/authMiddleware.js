const { compareHash } = require("../bcrypt/bcrypt");
const UserModel = require("../schemas/userSchema");
const { tokenGenerate } = require("./jwt");

module.exports.authRegister = async (request, response, next) => {
  try {
    const user = await UserModel.findOne({
      $or: [
        { firstName: request.body.firstName },
        { email: request.body.email },
      ],
    });
    if (user) {
      response
        .status(400)
        .send({ message: "Username or email address is already in use" });
      return;
    } else {
      next();
      return;
    }
  } catch (err) {
    response.status(500).send({ message: err });
    return;
  }
};

module.exports.authLoginWithJwt = async (response, request, next) => {
  const { firstName, password } = request.body;
  const user = await UserModel.findOne({ firstName });
  const isPasswordCorrect = compareHash(password, user.password);

  if (!user) {
    return response
      .status(404)
      .json({ success: false, message: "invalid user" });
  }
  if (!isPasswordCorrect) {
    return response
      .status(404)
      .json({ succress: false, message: "invalid user" });
  }
  const token = tokenGenerate(firstName, user._id);
  return response
    .status(200)
    .json({ success: true, data: { firstName: user.firstName, token: token } });
};
