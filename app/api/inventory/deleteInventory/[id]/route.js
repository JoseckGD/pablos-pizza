import { NextResponse } from "next/server";
import dbPizzeriaConnection from '../../../../../utils/dbPizzeriaConnection';

export async function DELETE(req, { params }) {

    const { id } = await params;
    try {
        const product = await getProductByID(parseInt(id));
        console.log(product);
        if (product.length > 0) {
            console.log(await deleteProduct(parseInt(id)));
            return NextResponse.json({ status: true, message: 'Producto eliminado exitosamente' });
        } else {
            return NextResponse.json({ status: false, message: 'No existe el registro de ese producto' });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al eliminar el producto: ', error: error });
    }

}

async function getProductByID(id) {

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM catalogo_productos WHERE id = ?';
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

async function deleteProduct(id) {

    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM catalogo_productos WHERE id = ?';
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
