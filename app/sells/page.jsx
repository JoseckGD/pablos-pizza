"use client";
import { useState, useEffect } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { Button } from "../components/Button";

const Sells = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSell, setSelectedSell] = useState(null);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [sells, setSells] = useState([]);
  const [data, setData] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedSellQuantity, setSelectedSellQuantity] = useState(1);




  const cancelButtonStyles = {
    backgroundColor: "#B71C1C",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #B71C1C",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    marginLeft: "10px",
  };

  const thStyles = {
    backgroundColor: "#B71C1C",
    color: "white",
    padding: "12px",
    textAlign: "center",
  };

  const tdStyles = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  };

  const handleEdit = (sell) => {
    setSelectedSell(sell);
    setIsPopupOpen(true);
  };

  const handleDelete = (sell) => {
    setSelectedSell(sell);
    console.log(sell);

    setIsConfirmationPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sells/deleteSell/${selectedSell.id}`,
          {
            method: "DELETE",
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        fetchData(); // Actualizar datos después de eliminar
      } catch (error) {
        console.error("Error fetching sells data:", error);
      }
    };
    fetchDataAsync();
    setIsConfirmationPopupOpen(false);
  };


  const handleCancelDelete = () => {
    setIsConfirmationPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSell((prevSell) => ({
      ...prevSell,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSell.id) {
      console.log("VAS A AÑADIR UNA VENTA");

      const sellData = {
        usuario_id: selectedSell.usuario_id,
        fecha: selectedSell.fecha,
        total: selectedProductPrice * selectedSellQuantity, // Actualizar el cálculo aquí
      };

      console.log(sellData)

      const fetchDataAsync = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/sells/addSell`,
            {
              method: "POST",
              body: JSON.stringify(sellData),
            }
          );
          const responseData = await response.json();
          console.log(responseData);
          fetchData(); // Actualizar datos después de agregar
        } catch (error) {
          console.error("Error fetching sells data:", error);
        }
      };
      fetchDataAsync();
      setIsPopupOpen(false);
    } else {
      console.log("VAS A MODIFICAR UNA VENTA");

      console.log(selectedSell);

      const sellDataModify = { ...selectedSell }; // Populate sellDataModify
      sellDataModify.total = selectedProductPrice * selectedSellQuantity; // Update total

      const fetchDataAsync = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/sells/modifySell`,
            {
              method: "PUT",
              body: JSON.stringify(sellDataModify),
            }
          );
          const responseData = await response.json();
          console.log(responseData);
          fetchData(); // Actualizar datos después de modificar
        } catch (error) {
          console.error("Error fetching sells data:", error);
        }
      };
      fetchDataAsync();
      setIsPopupOpen(false);
    }
  };


  const handleCancel = () => {
    setIsPopupOpen(false);
    setSelectedSell(null);
  };

  const handleOpenPopup = () => {
    setSelectedSell({
      fecha: getCurrentDate(),
    });
    setIsPopupOpen(true);
  };

  //Obtención de la fecha actual para el PopUp de Realizar venta
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };

  //Filtro por fecha de las ventas
  const filterSellsByDate = (sells) => {
    if (!searchDate) {
      return sells;
    }
    return sells.filter((sell) => sell.fecha.includes(searchDate));
  };

  useEffect(() => {
    // Obtener los datos de las ventas
    fetchData();
    fetchUsers();
    fetchInventory();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios");
      const responseData = await response.json();
      if (responseData.status) {
        // Ensure unique id values for each user
        const uniqueUsers = responseData.users.map((user, index) => ({
          ...user,
          id: index + 1, // Using index as a temporary unique id
        }));
        setUsers(uniqueUsers);
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };


  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/inventory");
      const responseData = await response.json();
      if (responseData.status) {
        setInventoryItems(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data && data.data && data.data.length > 0) {
      setSells(data.data);
    }
  }, [data]);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setSelectedSell((prevSell) => ({
      ...prevSell,
      producto_id: selectedProductId,
    }));
    const selectedProduct = inventoryItems.find(
      (item) => item.id === parseInt(selectedProductId)
    );
    if (selectedProduct) {
      setSelectedProductPrice(selectedProduct.precio);
    } else {
      setSelectedProductPrice(0);
    }
  };

  const handleQuantityChange = (e) => {
    setSelectedSellQuantity(e.target.value);
  };


  const fetchData = () => {
    // Uso de la API de consultar ventas
    const fetchDataAsync = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/sells", {
          method: "GET",
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching sells data:", error);
      }
    };
    fetchDataAsync();
  };

  const formatFecha = (fecha) => {
    return fecha.slice(0, 10);
  };
  const buttonStyles = {
    backgroundColor: "#B71C1C",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #B71C1C",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
  };

  const inputStyles = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #B71C1C",
    marginBottom: "10px",
    width: "100%",
    fontSize: "16px",
  };
  return (
    <LayoutBase>
      <TitlePage title="Venta de Pizzas" />
      <article className="flex justify-between items-center">
        <Button title="Realizar venta" eventOnClick={handleOpenPopup} />
        <div>
          <label>Buscar por fecha:</label>
          <input
            type="date"
            value={searchDate}
            onChange={handleSearchDate}
            className=" py-3 px-6 rounded-lg text-base"
          />
        </div>
      </article>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th style={thStyles}>Vendedor</th>
            <th style={thStyles}>Fecha</th>
            <th style={thStyles}>Total</th>
            <th style={thStyles}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filterSellsByDate(sells).map((itemSell, index) => (
            <tr key={index}>
              <td style={tdStyles}>Vendedor {itemSell.usuario_id}</td>
              <td style={tdStyles}>{formatFecha(itemSell.fecha)}</td>
              <td style={tdStyles}>${itemSell.total}</td>
              <td style={tdStyles} className="flex justify-center gap-4">
                <Button
                  eventOnClick={() => handleEdit(itemSell)}
                  icon={faEdit}
                />
                <Button
                  eventOnClick={() => handleDelete(itemSell)}
                  icon={faTrash}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <label>
              Vendedor:
              <select
                name="usuario_id"
                value={selectedSell?.usuario_id || ""}
                onChange={handleChange}
                style={inputStyles}
              >
                <option value="">Selecciona un vendedor</option>
                {users.map((user) => (
                  <option key={user.persona_id} value={user.persona_id}>
                    {user.nombre} {user.apellidos}
                  </option>
                ))}
              </select>
            </label>


            <label>
              Fecha:
              <input
                type="date"
                name="fecha"
                value={selectedSell?.fecha || ""}
                onChange={handleChange}
                style={inputStyles}
              />
            </label>

            <label>
              Producto:
              <select
                name="producto_id"
                value={selectedSell?.producto_id || ""}
                onChange={(e) => handleProductChange(e)}
                style={inputStyles}
              >
                <option value="">Selecciona un producto</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Cantidad:
              <input
                type="number"
                name="cantidad"
                value={selectedSellQuantity || ""}
                onChange={handleQuantityChange}
                style={inputStyles}
              />
            </label>



            <input
              type="text"
              name="totalVenta"
              value={(selectedProductPrice * selectedSellQuantity) || ""}
              readOnly
              style={inputStyles}
            />



            <div className="button-container">
              <button type="submit" style={buttonStyles}>
                Guardar
              </button>
              <button
                type="button"
                style={cancelButtonStyles}
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        //PopUp de confirmación de Eliminar
      )}
      {isConfirmationPopupOpen && (
        <div className="popup">
          <div className="confirmation-container">
            <p>¿Estás seguro de que deseas eliminar esta venta?</p>
            <div className="button-container">
              <button
                type="button"
                style={buttonStyles}
                onClick={handleConfirmDelete}
              >
                Aceptar
              </button>
              <button
                type="button"
                style={cancelButtonStyles}
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .button-realizar-venta:hover,
        .button-edit:hover,
        .button-delete:hover {
          transform: scale(1.1);
        }

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup form,
        .confirmation-container {
          background-color: #f5e9d8;
          padding: 20px;
          border-radius: 8px;
        }

        input {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #b71c1c;
          margin-bottom: 10px;
          width: 100%;
          font-size: 16px;
        }
      `}</style>
    </LayoutBase>
  );
};

export default Sells;
