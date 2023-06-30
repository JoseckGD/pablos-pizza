import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function PUT(req, res) {
    const body = await req.json()
    try {
        if (await editUser(body)) {
            return NextResponse.json({ status: true, message: 'Usuario actualizado exitosamente' });
        }
        return NextResponse.json({ status: true, message: 'Error al actualizar el usuario' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al actualizar el usuario: ', error: error });
    }
}

async function editUser(data) {
    console.log(data);
    const { nombre, apellidos, telefono, id } = data
    return new Promise((resolve, reject) => {
        const query = 'UPDATE personas SET nombre = ?, apellidos = ?, telefono = ? WHERE id = ?';
        const values = [nombre, apellidos, telefono, id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}
