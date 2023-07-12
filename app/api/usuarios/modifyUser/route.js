import { NextResponse } from 'next/server';
import PersonRepository from '../_model/PersonRepository';

export async function PUT(req, res) {
    const body = await req.json()
    const personRepository = new PersonRepository();
    try {
        if (await personRepository.editPerson(body)) {
            return NextResponse.json({ status: true, message: 'Usuario actualizado exitosamente' });
        }
        return NextResponse.json({ status: false, message: 'Error al actualizar el usuario' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al actualizar el usuario: ', error: error });
    }
}