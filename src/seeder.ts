//@ts-ignore
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { Hexapod, HexapodSchema } from "./hexapods/schemas/hexapod.schema";
import { HexapodsSeeder } from "./hexapods/seeders/hexapods.seeder";

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: Hexapod.name, schema: HexapodSchema }]),
  ],
}).run([HexapodsSeeder]);
