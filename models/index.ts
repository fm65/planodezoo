import {Dialect}                                         from "sequelize/types/lib/sequelize";
import {ModelCtor, Sequelize}                            from "sequelize";
import userCreator, {UserInstance}                       from "./user.model";
import sessionCreator, {SessionInstance}                 from "./session.model";
import spaceCreator, {SpaceInstance}                     from "./space.model";
import ticketCreator, {TicketInstance}                   from "./ticket.model";
import animalCreator, {AnimalInstance}                   from "./animal.model";
import healthbookCreator, {HealthbookInstance}           from "./healthbook.model";
import maintenancebookCreator, {MaintenancebookInstance} from "./maintenancebook.model";


export interface SequelizeManagerProps {
    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;
    Session        : ModelCtor<SessionInstance>;
    Space          : ModelCtor<SpaceInstance>;
    Ticket         : ModelCtor<TicketInstance>;
    Animal         : ModelCtor<AnimalInstance>;
    Healthbook     : ModelCtor<HealthbookInstance>;
    Maintenancebook: ModelCtor<MaintenancebookInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager;

    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;
    Session        : ModelCtor<SessionInstance>;
    Space          : ModelCtor<SpaceInstance>;
    Ticket         : ModelCtor<TicketInstance>;
    Animal         : ModelCtor<AnimalInstance>;
    Healthbook     : ModelCtor<HealthbookInstance>;
    Maintenancebook: ModelCtor<MaintenancebookInstance>;

    private constructor(props: SequelizeManagerProps) {
        this.sequelize       = props.sequelize;
        this.User            = props.User;
        this.Session         = props.Session;
        this.Space           = props.Space;
        this.Ticket          = props.Ticket;
        this.Animal          = props.Animal;
        this.Healthbook      = props.Healthbook;
        this.Maintenancebook = props.Maintenancebook;

    }

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect : process.env.DB_DRIVER as Dialect,
            host    : process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port    : Number.parseInt(process.env.DB_PORT as string), 
            
            define: {
                freezeTableName: true,
                underscored    : true,
                paranoid       : true,
                timestamps     : true
            }
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            User           : userCreator(sequelize),
            Session        : sessionCreator(sequelize),
            Space          : spaceCreator(sequelize),
            Ticket         : ticketCreator(sequelize),
            Animal         : animalCreator(sequelize),
            Healthbook     : healthbookCreator(sequelize),
            Maintenancebook: maintenancebookCreator(sequelize)
        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        props.User.hasMany(props.Session); 
        props.Session.belongsTo(props.User);
        
        props.User.hasMany(props.Ticket);
        props.Ticket.belongsTo(props.User);
        
        props.Space.hasMany(props.Animal);
        props.Animal.belongsTo(props.Space);
        
        props.Animal.belongsTo(props.Healthbook);
        
        props.Space.belongsTo(props.Maintenancebook);
        
        props.User.belongsToMany(props.Space, {through: 'UserSpace'});
        props.Space.belongsToMany(props.Ticket, {through: 'SpaceTicket'}); //TODO
    }

}
export * from './spaceTime.model';