import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin
} from "sequelize";

import {UserInstance}            from "./user.model";
import {TicketInstance}          from "./ticket.model";
import {AnimalInstance}          from "./animal.model";
import {MaintenancebookInstance} from "./maintenancebook.model";

export interface SpaceProps {
    id            : string;
    name          : string;
    description   : string;
    image         : string;
    type          : string;
    capacity      : number;
    duration      : number;
    opening       : string;
    closing       : string;
    disabledAccess: boolean;
}

export interface SpaceCreationProps extends Optional<SpaceProps, "id"> {}

export interface SpaceInstance extends Model<SpaceProps, SpaceCreationProps>, SpaceProps {
    getUsers: BelongsToManyGetAssociationsMixin<UserInstance>;
    addUser : BelongsToManyAddAssociationMixin<UserInstance, "id">;

    getTickets: BelongsToManyGetAssociationsMixin<TicketInstance>;
    addTicket : BelongsToManyAddAssociationMixin<TicketInstance, "type">;

    getAnimals: HasManyGetAssociationsMixin<AnimalInstance>;
    addAnimal : HasManyAddAssociationMixin<AnimalInstance, "id">;

    getMaintenancebooks: HasManyGetAssociationsMixin<MaintenancebookInstance>;
    addMaintenancebook: HasManyAddAssociationMixin<MaintenancebookInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<SpaceInstance> {
    return sequelize.define<SpaceInstance>("Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        name: {
            type  : DataTypes.STRING
        },
        description: {
            type  : DataTypes.TEXT
        },
        image: {
            type  : DataTypes.BLOB
        },
        type: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        duration: {
            type: DataTypes.INTEGER
        },
        opening: {
            type: DataTypes.DATE
        },
        closing: {
            type: DataTypes.DATE
        },
        disabledAccess: {
            type: DataTypes.BOOLEAN
        }
    });
}