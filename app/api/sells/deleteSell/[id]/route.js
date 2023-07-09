import { NextResponse } from "next/server";
import dbPizzeriaConnection from '../../../../../utils/dbPizzeriaConnection';

export async function DELETE(req, { params }) {

    const { id } = await params
    try {
        const sell = await getSellByID(parseInt(id))
        console.log(sell);
        if (sell.length > 0) {
            console.log(await deleteSell(parseInt(id)));
            return NextResponse.json({ status: true, message: 'Venta eliminada exitosamente' });
        } else {
            return NextResponse.json({ status: false, message: 'No existe el registro de esa venta' });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al eliminar el usuario: ', error: error });
    }

}


async function getSellByID(id) {

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ventas WHERE id = ?';
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

async function deleteSell(id) {

    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ventas WHERE id = ?';
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