import { ModelCtor, QueryTypes } from "sequelize";
import { UserInstance } from "../models/user.model";
import { SessionInstance } from "../models/session.model";
import { SequelizeManager } from "../models";

export class ZooController {
    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;

    private static instance: ZooController;

    public static async getInstance(): Promise<ZooController> {
        if (ZooController.instance === undefined) {
            const { User, Session } = await SequelizeManager.getInstance();
            ZooController.instance = new ZooController(User, Session);
        }
        return ZooController.instance;
    }

    private constructor(User: ModelCtor<UserInstance>, Session: ModelCtor<SessionInstance>) {
        this.User = User;
        this.Session = Session;
    }

    public async getRoles(): Promise<number[] | null> {
        const userController = await SequelizeManager.getInstance();
        let roles: number[] = [];
        await userController.sequelize.query("SELECT distinct role FROM User u, Session s WHERE u.id = s.user_id", { type: QueryTypes.SELECT }).then(res => {

            const json = JSON.stringify(res);
            const result = JSON.parse(json);

            for (let row of result) {
                roles.push(row.role);
            }
        });
        return roles;
    }

    public includesAll(array: number[], numbers: number[]): boolean {
        for (let value of numbers) {
            let contains = array.includes(value) ? true : false;
            if (!contains) return false;
        }
        return true;
    }

    public async canZooOpen(): Promise<boolean | null> {
        let rolesOK = await this.getRoles().then(result => {
            if (result != null) {
                return this.includesAll(result, [4, 5, 6, 7]);
            }
            return null;
        });
        return rolesOK;
    }
}