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

import {UserInstance} from "./user.model";
import {SpaceInstance} from "./space.model";

export interface TicketProps {
    type      : number; // 1: PASS journée, 2: PASS Week-end, 3: PASS Annuel, 4: PASS 1daymonth
    price     : number;
    date      : string;
}

export interface TicketCreationProps extends TicketProps {}

export interface TicketInstance extends Model<TicketProps, TicketCreationProps>, TicketProps {
    getUsers: HasManyGetAssociationsMixin<UserInstance>;
    addUser : HasManyAddAssociationMixin<UserInstance, "id">;

    getSpaces: BelongsToManyGetAssociationsMixin<SpaceInstance>;
    addSpace : BelongsToManyAddAssociationMixin<SpaceInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<TicketInstance> {
    return sequelize.define<TicketInstance>("Ticket", {
        type: {
            type: DataTypes.BIGINT,
            primaryKey   : true
        },
        price: {
            type  : DataTypes.DOUBLE
        },
        date: {
            type: DataTypes.DATE
        }
    });
}