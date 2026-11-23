import bcrypt from "bcrypt";
import {userRepository} from "./user.repository.js";
import AppError from "../utils/app.error.js";
interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
}

class UserService {
    async registerUser(data: RegisterUserInput) {
     const name = data.name.trim();
     const email = data.email.trim().toLowerCase(); 
     
     const existingUser = await userRepository.findUserByEmail(email);
     if (existingUser) {
       throw new AppError("User with this email already exists.",409);
     }

     const hashedPassword = await bcrypt.hash(data.password, 10);
     const user = await userRepository.createUser({
       name,
       email,
       passwordHash: hashedPassword,
     });

     return{
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
     };
    }

    async getUserById(id: string) {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw new AppError("User not found.",404);
        }
        return user;
    }
}

export const userService = new UserService();