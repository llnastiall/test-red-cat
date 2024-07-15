import { DataSource, In } from 'typeorm';
import {Role} from "../roles/entities/role.entity";
import {User} from "../user/entities/user.entity";
import {Roles} from "../roles/enums/roles.enum";
import {Gender} from "../user/enums/genders.enum";
import * as bcrypt from "bcryptjs";

export async function seedData(dataSource: DataSource): Promise<void> {

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const userRole = roleRepository.create({ value: Roles.User, description: 'User role' });
    const adminRole = roleRepository.create({ value: Roles.Admin, description: 'Admin role' });
    await roleRepository.save([userRole, adminRole]);
    const hashPassword = await bcrypt.hash("P@ssword", 5);
    const user = await userRepository.create({
        name: "Admin",
        surname: "Surname",
        email: "email@gmail.com",
        phone: "+38(097)3454543",
        password: hashPassword,
        gender: Gender.Unknown,
        role: adminRole
    })

    await userRepository.save(user);

}