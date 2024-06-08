//@ts-ignore
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { Mover, MoverSchema } from "./movers/schemas/mover.schema";
import { MoversSeeder } from "./movers/seeders/movers.seeder";
import { User, UserSchema } from "./users/schemas/user.schema";
import { UsersSeeder } from "./users/seeders/users.seeder";
import { ItemsSeeder } from "./items/seeders/items.seeder";
import { Item, ItemSchema } from "./items/schemas/item.schema";

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: Mover.name, schema: MoverSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
}).run([MoversSeeder, UsersSeeder, ItemsSeeder]);
