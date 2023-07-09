import { NextResponse } from 'next/server';
import UserRepository from '../_model/UserRepository';

export async function GET(req, res) {
    try {
        const userRepository = new UserRepository();
        const users = await userRepository.getUsers();
        if (users.length > 0) {
            return NextResponse.json({ status: true, message: 'Lista de usuarios', users: users });
        }
        return NextResponse.json({ status: true, message: 'No hay usuarios en la base de datos' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}