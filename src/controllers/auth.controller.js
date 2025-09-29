import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const hasedpassword = await hashPassword(password);
    await UserModel.create({
      username: username,
      email: email,
      role: role,
      password: hasedpassword,
      profile: profile,
    });
    // TODO: crear usuario con password hasheada y profile embebido
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "el usuario o la contraseña es incorrecta" });
    }
    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) {
      return res
        .status(400)
        .json({ msg: "el usuario o la contraseña es incorrecta" });
    }
    const token = signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // const user = req.user;
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
