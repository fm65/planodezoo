import { ModelCtor} from "sequelize";
import { SequelizeManager } from "../models";
import { MaintenancebookCreationProps, MaintenancebookInstance } from "../models/maintenancebook.model";


export class MaintenancebookController {

    Maintenancebook: ModelCtor<MaintenancebookInstance>;

    private static instance: MaintenancebookController;

    public static async getInstance(): Promise<MaintenancebookController> {
        if (MaintenancebookController.instance === undefined) {
            const { Maintenancebook } = await SequelizeManager.getInstance();
            MaintenancebookController.instance = new MaintenancebookController(Maintenancebook);
        }
        return MaintenancebookController.instance;
    }

    private constructor(Maintenancebook: ModelCtor<MaintenancebookInstance>) {
        this.Maintenancebook = Maintenancebook;
    }

    public async create(props: MaintenancebookCreationProps):
        Promise<MaintenancebookInstance | null> {
        return this.Maintenancebook.create(props);
    }

    public async getAll(): Promise<MaintenancebookInstance[] | null> {
        const maintenancebook = await this.Maintenancebook.findAll();
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

