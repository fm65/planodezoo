import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {SequelizeManager} from "../models";

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

}