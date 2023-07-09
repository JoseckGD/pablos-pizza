import { NextResponse } from 'next/server';
import UserRepository from '../_model/UserRepository';
import PersonRepository from '../_model/PersonRepository';

export async function POST(req, res) {
    const body = await req.json();
    const userRepository = new UserRepository();
    const personRepository = new PersonRepository();

    try {
        const email = await userRepository.getEmailUser(body.correo);
        if (email.length > 0) {
            return NextResponse.json({
                status: false,
                message: 'Error: el correo ya está registrado',
            });
        }

        const { insertId } = await personRepository.registerPerson(body);
        body.persona_id = insertId;
        const user = await userRepository.registerUser(body);

        return NextResponse.json({
            status: true,
            message: 'Usuario registrado exitosamente',
        });
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: 'Error al registrar el usuario: ',
            error: error,
        });
    }
}