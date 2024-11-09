import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function CarList() {
  // tilamuuttuja autoille
  const [cars, setCars] = useState([
    { brand: "", model: "", color: "", fuel: "", modelYear: "", price: "" },
  ]);

  const DeleteButton = (props) => {
    const url = props.data._links.car.href;
    return <button onClick={() => deleteCar(url)}>Delete</button>;
  };

  //ag grid taulukon sarakkeet
  const [colDefs, setColDefs] = useState([
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    {
      field: "edit",
      cellRenderer: (props) => (
        <Editcar data={props.data} updateCar={updateCar} />
      ),
    },
    { field: "delete", cellRenderer: DeleteButton },
  ]);

  const getCars = () => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        //handle data
        setCars(data._embedded.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCar = (car) => {
    fetch(car, {
      method: "DELETE",
    }).then(() => {
      getCars();
    });
  };

  const saveCar = (car) => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => getCars())
      .catch((err) => console.error(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => getCars())
      .catch((err) => console.error(err));
  };

  useEffect(getCars, []);

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <Addcar saveCar={saveCar} />
      <AgGridReact rowData={cars} columnDefs={colDefs} />
    </div>
  );
}
