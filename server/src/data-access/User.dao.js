import UserModel from "../models/UserModel.js";

class UserDao {

  static async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({
        where: { EmailAddress: `${email}` },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

}

export default UserDao;
