import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Addcar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCar = () => {
    props.saveCar(car);
    handleClose();
  }

  const handleInputChange = (error) => {
  setCar({ ...car, [error.target.name]: error.target.value })
};
  return (
    <React.Fragment>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Car
      </Button>
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
        <DialogTitle>New Car</DialogTitle>
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
            value={car.year}
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
          <Button onClick={addCar} type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
