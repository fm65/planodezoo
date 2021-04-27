import { ModelCtor} from "sequelize";
import { SequelizeManager } from "../models";
import { MaintenancebookCreationProps, MaintenancebookInstance } from "../models/maintenancebook.model";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SpaceCreationProps, SpaceInstance} from "../models/space.model";
import { SpaceController } from "./space.controller";


export class MaintenancebookController {

    Maintenancebook: ModelCtor<MaintenancebookInstance>;
    User   : ModelCtor<UserInstance>;
    Space : ModelCtor<SpaceInstance>;

    private static instance: MaintenancebookController;

    public static async getInstance(): Promise<MaintenancebookController> {
        if (MaintenancebookController.instance === undefined) {
            const { Maintenancebook, User, Space } = await SequelizeManager.getInstance();
            MaintenancebookController.instance = new MaintenancebookController(Maintenancebook, User, Space);
        }
        return MaintenancebookController.instance;
    }

    private constructor(Maintenancebook: ModelCtor<MaintenancebookInstance>, User: ModelCtor<UserInstance>, Space: ModelCtor<SpaceInstance>) {
        this.Maintenancebook = Maintenancebook;
        this.User = User;
        this.Space = Space;
    }

    public async create(props: MaintenancebookCreationProps):
        Promise<MaintenancebookInstance | null> {
        return this.Maintenancebook.create(props);
    }

    public async getAll(): Promise<MaintenancebookInstance[] | null> {
        const maintenancebook = await this.Maintenancebook.findAll({
            attributes: ['id', 'date', 'comment', 'month', 'isDone'],
            //include: { model: this.UserSpace },
            //where: {}
        });
        return maintenancebook;
    }


    public async getById(id: number): Promise<MaintenancebookInstance | null> {
        const maintenancebook = await this.Maintenancebook.findOne({
            where: {
                id
            }
        })
        if (maintenancebook !== null) {
            return maintenancebook;
        }
        return null;
    }

    public async remove(id: number): Promise<MaintenancebookInstance | null> {
        const maintenancebook = await this.getById(id);
        if (maintenancebook !== null) {
            maintenancebook.destroy();
            return maintenancebook;
        }
        return null;
    }

}

