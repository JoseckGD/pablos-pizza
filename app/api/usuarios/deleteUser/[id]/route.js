import { NextResponse } from "next/server";
import UserRepository from '../../_model/UserRepository';
import PersonRepository from '../../_model/PersonRepository';

export async function DELETE(req, { params }) {
    const { id } = await params

    const userRepository = new UserRepository();
    const personRepository = new PersonRepository();

    try {
        const usuario = await userRepository.getUserByID(parseInt(id))
        console.log(usuario);
        if (usuario.length > 0) {
            console.log(await userRepository.deleteUser(parseInt(id)));
            console.log(await personRepository.deletePerson(parseInt(id)));
            return NextResponse.json({ status: true, message: 'Usuario eliminado exitosamente' });
        } else {
            return NextResponse.json({ status: false, message: 'No existe el usuario' });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al eliminar el usuario: ', error: error });
    }
}