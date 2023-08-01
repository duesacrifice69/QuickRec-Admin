import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDao from "../data-access/User.dao.js";

export const signin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const adiminUser = await UserDao.getUserByEmail(userName);
    if (!adiminUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const { UserName, EmailAddress, UserId } = adiminUser.dataValues;
    const isPasswordCorrect = await bcrypt.compare(password, adiminUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { UserName: UserName, EmailAddress: EmailAddress, id: UserId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: adiminUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
