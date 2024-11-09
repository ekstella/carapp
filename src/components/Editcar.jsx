import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Editcar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const handleClickOpen = () => {
    console.log(props);
    setCar({
      brand: props.data.brand,
      model: props.data.model,
      color: props.data.color,
      fuel: props.data.fuel,
      modelYear: props.data.modelYear,
      price: props.data.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateCar = () => {
    props.updateCar(car, props.data._links.car.href);
    handleClose();
  };

  const handleInputChange = (error) => {
    setCar({ ...car, [error.target.name]: error.target.value });
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={(e) => handleInputChange(e)}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={(e) => handleInputChange(e)}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={(e) => handleInputChange(e)}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="year"
            value={car.modelYear}
            onChange={(e) => handleInputChange(e)}
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={(e) => handleInputChange(e)}
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={(e) => handleInputChange(e)}
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
