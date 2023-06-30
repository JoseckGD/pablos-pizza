import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function GET(req, res) {
    try {
        const users = await getUsers();
        if (users.length > 0) {
            return NextResponse.json({ status: true, message: 'Lista de usuarios', users: users });
        }
        return NextResponse.json({ status: true, message: 'No hay usuarios en la base de datos' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function getUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios, personas WHERE usuarios.persona_id = personas.id ';
        dbPizzeriaConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}