import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../utils/dbPizzeriaConnection';

export async function GET(req, res) {
    try {
        const sells = await getAllSels();
        if (sells.length > 0) {
            return NextResponse.json({ status: true, message: 'VEntas', data: sells });
        }
        return NextResponse.json({ status: false, message: 'Usuario no encontrado', });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function getAllSels() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ventas;';
        dbPizzeriaConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}