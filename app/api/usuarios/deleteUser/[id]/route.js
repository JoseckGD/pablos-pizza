import { NextResponse } from "next/server";
import dbPizzeriaConnection from '../../../../../utils/dbPizzeriaConnection';

export async function DELETE(req, { params }) {
    const { id } = await params
    try {
        const usuario = await getUserByID(parseInt(id))
        console.log(usuario);
        if (usuario.length > 0) {
            console.log(await deleteUser(parseInt(id)));
            console.log(await deletePerson(parseInt(id)));
            return NextResponse.json({ status: true, message: 'Usuario eliminado exitosamente' });
        } else {
            return NextResponse.json({ status: false, message: 'No existe el usuario' });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al eliminar el usuario: ', error: error });
    }
}


async function getUserByID(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const values = [id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        const values = [id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}

async function deletePerson(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM personas WHERE id = ?';
        const values = [id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}