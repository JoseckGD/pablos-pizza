import { NextResponse } from 'next/server';
import UserRepository from './_model/UserRepository';

export async function GET(req, res) {
    try {
        const userRepository = new UserRepository();
        const users = await userRepository.getUsers();
        return NextResponse.json({ status: true, message: 'Hello from the API pizzeria', users: users });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}
