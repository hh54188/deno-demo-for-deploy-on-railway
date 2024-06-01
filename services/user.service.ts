import {
  User,
  UserCreationAttributes,
  UserUpdateAttributes,
} from "../models/user.model.ts";
import models from '../models/index.ts';
const {User: UserModel} = models;

class UserService {
  static async findByEmail(userEmail: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: {
        userEmailOnOauthProvider: userEmail,
      },
      paranoid: true
    });
    return user.toJSON();
  }
}

export default UserService;
