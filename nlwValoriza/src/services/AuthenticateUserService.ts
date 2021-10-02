import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

interface IAuthenticateUserService{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({ email, password }: IAuthenticateUserService){
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = userRepositories.findOne({
            email
        })

        if (!user){
            throw new Error("Email / password incorrect.")          
        }

        const passwordMatch = await compare(password, (await user).password);

        if(!passwordMatch){
            throw new Error("Email / password incorrect.");
        }

        const token = sign({
            email: (await user).email
        }, "c64a018f6f860c671b11b9911a807eca", {
            subject: (await user).id,
            expiresIn: "1d"
        })

        return token;
    }
}


export { AuthenticateUserService }