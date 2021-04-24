import userSeeder            from "./user.seeder";
import ticketSeeder 		 from "./ticket.seeder";
import spaceSeeder 			 from "./space.seeder";
import animalSeeder 		 from "./animal.seeder";
import healthbookSeeder      from "./healthbook.seeder";
import maintenancebookSeeder from "./maintenancebook.seeder";

export function buildSeeders() {
    userSeeder();
    ticketSeeder();
    spaceSeeder();
    animalSeeder();
    healthbookSeeder();
    maintenancebookSeeder();
}