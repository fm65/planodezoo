import { ModelCtor, QueryTypes } from "sequelize";
import { SequelizeManager } from "../models";
import { AnimalCreationProps, AnimalInstance } from "../models/animal.model";


export class AnimalController {

    Animal: ModelCtor<AnimalInstance>;

    private static instance: AnimalController;

    public static async getInstance(): Promise<AnimalController> {
        if (AnimalController.instance === undefined) {
            const { Animal } = await SequelizeManager.getInstance();
            AnimalController.instance = new AnimalController(Animal);
        }
        return AnimalController.instance;
    }

    private constructor(Animal: ModelCtor<AnimalInstance>) {
        this.Animal = Animal;
    }

    public async create(props: AnimalCreationProps):
        Promise<AnimalInstance | null> {
        return this.Animal.create(props);
    }

    public async getAll(): Promise<AnimalInstance[] | null> {
        const animals = await this.Animal.findAll();
        return animals;
    }


    public async getById(id: number): Promise<AnimalInstance | null> {
        const animal = await this.Animal.findOne({
            where: {
                id
            }
        })
        if (animal !== null) {
            return animal;
        }
        return null;
    }

    public async remove(id: number): Promise<AnimalInstance | null> {
        const animal = await this.getById(id);
        if (animal !== null) {
            animal.destroy();
            return animal;
        }
        return null;
    }

}

