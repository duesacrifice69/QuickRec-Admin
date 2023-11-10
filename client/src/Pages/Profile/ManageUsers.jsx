import { PersonAdd, Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ButtonComp from "../../components/ButtonComp";
import api from "../../api";

const ManageUsers = () => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeNo("");
  };

  const handleSearch = async () => {
    try {
      const response = await api.getEmployeeByEmpNo(employeeNo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: "2rem" }}>
      <ButtonComp
        sx={{ display: "block", p: "0.5rem", ml: "auto" }}
        onClick={handleOpen}
      >
        <Box sx={{ display: "flex" }}>
          <PersonAdd />
          <Typography sx={{ ml: "0.5rem" }}>Add User</Typography>
        </Box>
      </ButtonComp>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        PaperProps={{
          sx: {
            height: "50vh",
            maxHeight: "350px",
            backgroundColor: (theme) => theme.palette.background.main,
          },
        }}
      >
        <Paper>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={employeeNo}
            onChange={(e) => setEmployeeNo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Employee No..."
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </Paper>
      </Dialog>
    </Container>
  );
};
export default ManageUsers;
