import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../utils/dbPizzeriaConnection';

export async function POST(req, res) {
    const body = await req.json()
    try {
        const user = await iniciarSesion(body);
        if (user.length > 0) {
            return NextResponse.json({ status: true, message: 'Inicio de sesión exitoso', data: user[0] });
        }
        return NextResponse.json({ status: false, message: 'Usuario no encontrado', });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function iniciarSesion(data) {
    const { username, password } = data
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios, personas WHERE (username = ? AND password = ?) AND usuarios.persona_id = personas.id ';
        const values = [username, password];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}