import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {SequelizeManager} from "../models";
import {compare, hash} from "bcrypt";

export class AuthController {

    User   : ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if(AuthController.instance === undefined) {
            const {User, Session}   = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(User, Session);
        }
        return AuthController.instance;
    }

    private constructor(User: ModelCtor<UserInstance>, Session: ModelCtor<SessionInstance>) {
        this.User    = User;
        this.Session = Session;
    }

    public async subscribe(props: UserCreationProps):
        Promise<UserInstance | null> {
        return this.User.create(props);
    }

    public async log(login: string, password: string): Promise<SessionInstance | null> {
        const passwordHashed = await hash(password, 5);
        const user = await this.User.findOne({
            where: {
                login
            }
        })
        if (user === null) {
            return null
        }
        const isSamePassword = await compare(password, user.password);
        if(!isSamePassword) {
            console.log(passwordHashed + ' ' + user.password)
            return null;
        }
        const token = await hash(Date.now() + login,5);
        const session = await this.Session.create({
            token,
        })
        await session.setUser(user);
        return session;
    }


}