import { ModelCtor, QueryTypes } from "sequelize";
import { SequelizeManager } from "../models";
import { HealthbookCreationProps, HealthbookInstance } from "../models/healthbook.model";
import { AnimalInstance } from "../models/animal.model";


export class HealthbookController {

    Healthbook: ModelCtor<HealthbookInstance>;
    Animal: ModelCtor<AnimalInstance>;

    private static instance: HealthbookController;

    public static async getInstance(): Promise<HealthbookController> {
        if (HealthbookController.instance === undefined) {
            const { Healthbook, Animal } = await SequelizeManager.getInstance();
            HealthbookController.instance = new HealthbookController(Healthbook, Animal);
        }
        return HealthbookController.instance;
    }

    private constructor(Healthbook: ModelCtor<HealthbookInstance>, Animal: ModelCtor<AnimalInstance>) {
        this.Healthbook = Healthbook;
        this.Animal     = Animal;
    }

    public async create(props: HealthbookCreationProps):
        Promise<HealthbookInstance | null> {
        const animal = await this.Animal.findOne({
            where: { id: 1 } //TODO
        })
        if (animal === null) {
            return null
        }
        const healthbook = this.Healthbook.create(props);
        (await healthbook).setAnimal(animal);

        return healthbook;
    }

    public async getAll(): Promise<HealthbookInstance[] | null> {
        const healthbooks = await this.Healthbook.findAll({
            attributes: ['id', 'date', 'comment', 'isDone'],
            include: {model: this.Animal, attributes: ['id', 'name', 'species']},
            limit: 50
        });
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

