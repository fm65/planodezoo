import { ModelCtor, QueryTypes } from "sequelize";
import { SequelizeManager } from "../models";
import { HealthbookCreationProps, HealthbookInstance } from "../models/healthbook.model";


export class HealthbookController {

    Healthbook: ModelCtor<HealthbookInstance>;

    private static instance: HealthbookController;

    public static async getInstance(): Promise<HealthbookController> {
        if (HealthbookController.instance === undefined) {
            const { Healthbook } = await SequelizeManager.getInstance();
            HealthbookController.instance = new HealthbookController(Healthbook);
        }
        return HealthbookController.instance;
    }

    private constructor(Healthbook: ModelCtor<HealthbookInstance>) {
        this.Healthbook = Healthbook;
    }

    public async create(props: HealthbookCreationProps):
        Promise<HealthbookInstance | null> {
        return this.Healthbook.create(props);
    }

    public async getAll(): Promise<HealthbookInstance[] | null> {
        const healthbooks = await this.Healthbook.findAll();
        return healthbooks;
    }


    public async getById(id: number): Promise<HealthbookInstance | null> {
        const healthbook = await this.Healthbook.findOne({
            where: {
                id
            }
        })
        if (healthbook !== null) {
            return healthbook;
        }
        return null;
    }

    public async remove(id: number): Promise<HealthbookInstance | null> {
        const healthbook = await this.getById(id);
        if (healthbook !== null) {
            healthbook.destroy();
            return healthbook;
        }
        return null;
    }

}

