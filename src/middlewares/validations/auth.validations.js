import { body } from "express-validator";
import { UserModel } from "../../models/mongoose/user.model";

export const registerValidation = [
  // TODO: completar las validaciones para el registro
  body("username")
    .isAlphanumeric()
    .withMessage("debe de ser alfanumerico")
    .isLength({ min: 3, max: 20 })
    .withMessage("debe de contener entre 3 a 20 caracteres")
    .custom(async (valuet) => {
      const username = await UserModel.findOne({ username: valuet });
      if (username) {
        throw new Error("este username ya esta utilizado");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("debe de ser de tipo gmail")
    .custom(async (valuet) => {
      const emaildb = await UserModel.findOne({ email: valuet });
      if (emaildb) {
        throw new Error("este email ya esta utilizado");
      }
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
    .withMessage(
      "la contraseña debe de contener como minimo 8 caracteres,mayuscula,minuscula,numero"
    ),
  body("role").custom(async (values) => {
    const rolemu = values;
    if (rolemu !== "secretary" && rolemu !== "administrator") {
      throw new Error(
        "solamente se permiten los roles secretary y administrator"
      );
    }
  }),
  body("profile.employee_number")
    .isString()
    .withMessage("debe de ser de tipo string")
    .notEmpty()
    .withMessage("el numero de empleado se obligatorio"),
  // .custom(async (values) => {
  //   // const employer_number=await UserModel.findOne({employee_number=values})
  // }),
];

export const loginValidation = [
  // TODO: completar las validaciones para el login
];
