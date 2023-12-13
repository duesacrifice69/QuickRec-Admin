import { EditNote, PersonAdd, PersonRemove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ButtonComp, ProfileAvatar, Input, Error } from "../../components";
import {
  useChangeUserRoleMutation,
  useGetEmployeeQuery,
} from "../../state/api";
import { useSelector } from "react-redux";

const roles = [
  { value: 3, text: "Administrator" },
  { value: 4, text: "Test" },
];

const ManageUsers = () => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userRemove, setUserRemove] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const [error, setError] = useState();
  const [changeUserRole, { isLoading }] = useChangeUserRoleMutation();
  const { data: employee, isFetching: employeeIsLoading } = useGetEmployeeQuery(
    {
      employeeNo: employeeNumber,
      admin: false,
    }
  );
  const { data: admins, isLoading: adminsLoading } = useGetEmployeeQuery({
    employeeNo: "",
    admin: true,
  });
  const employeeData = employee?.data[0] ?? editing;

  const handleOpen = () => {
    if (employeeNo.length > 0) {
      setOpen(true);
      setEmployeeNumber(employeeNo);
    }
  };

  const handleEditOpen = (employee) => {
    setOpen(true);
    setEditing(employee);
  };

  const handleUserRemoveOpen = (userId) => {
    setUserRemove(userId);
  };

  const handleClose = () => {
    setOpen(false);
    editing ? setEditing(false) : setEmployeeNumber(0);
    setEmployeeNo("");
    setUserRole(null);
  };

  const handleUserRemoveClose = () => {
    setUserRemove(false);
  };

  const handleUserAdd = async (e) => {
    e.preventDefault();
    const result = await changeUserRole({
      userId: employeeData.UserId,
      userRoleId: userRole,
    });
    if (result.error) {
      setError(result.error?.data?.message);
    } else {
      handleClose();
    }
  };
  const handleUserRemove = async () => {
    const result = await changeUserRole({
      userId: userRemove,
      userRoleId: 2,
    });
    if (result.error) {
      setError(result.error?.data?.message);
    } else {
      handleUserRemoveClose();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: "2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Paper sx={{ width: "max-content" }}>
          <InputBase
            sx={{ m: "0.3rem 1rem", width: "250px" }}
            value={employeeNo}
            onChange={(e) => setEmployeeNo(e.target.value)}
            placeholder="Enter Employee No..."
          />
        </Paper>
        <ButtonComp
          sx={{ p: "0.5rem" }}
          align="right"
          onClick={handleOpen}
          startIcon={<PersonAdd />}
        >
          Add User
        </ButtonComp>
      </Box>
      {!adminsLoading ? (
        <List
          sx={{
            width: "100%",
            mt: "2rem",
            bgcolor: "background.paper",
            "& :last-child hr": { display: "none" },
          }}
        >
          {admins.data.map((admin, i) => (
            <Box key={i}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: (theme) => theme.palette.background.main,
                  },
                  ":hover .listitem-hover-btn": { visibility: "visible" },
                }}
              >
                <ListItemAvatar>
                  <ProfileAvatar username={admin.UserName} />
                </ListItemAvatar>
                <ListItemText
                  primary={admin.UserName}
                  secondary={admin.UserRole}
                  primaryTypographyProps={{ fontWeight: 500 }}
                  sx={{ maxWidth: "300px" }}
                />
                <ListItemText
                  primary="Employee No :"
                  secondary={admin.EmpNumber}
                  sx={{ maxWidth: "300px" }}
                />
                <IconButton
                  className="listitem-hover-btn"
                  disabled={admin.UserId === UserId}
                  sx={{
                    m: "auto 0 auto auto",
                    visibility: "hidden",
                    ":hover": { color: (theme) => theme.palette.primary[500] },
                  }}
                  onClick={() => handleEditOpen(admin)}
                >
                  <EditNote />
                </IconButton>
                <IconButton
                  className="listitem-hover-btn"
                  disabled={admin.UserId === UserId}
                  sx={{
                    m: "auto 1rem",
                    color: "#b53a3a",
                    visibility: "hidden",
                    ":hover": { color: "#ff0000" },
                  }}
                  onClick={() => handleUserRemoveOpen(admin.UserId)}
                >
                  <PersonRemove />
                </IconButton>
              </ListItem>
              <Divider variant="middle" />
            </Box>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      )}
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        PaperProps={{
          sx: {
            p: "2rem 1rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "70vh",
            maxHeight: "500px",
            backgroundColor: (theme) => theme.palette.background.main,
          },
        }}
      >
        {!employeeIsLoading ? (
          employeeData ? (
            <Card
              sx={{
                m: "auto",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <CardHeader
                title={employeeData.UserName}
                subheader={employeeData.UserRole}
                avatar={<ProfileAvatar username={employeeData.UserName} />}
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary[200],
                  p: { xs: "0.5rem 1rem", sm: "1rem" },
                }}
                titleTypographyProps={{ fontWeight: 500, fontSize: "1.5rem" }}
                subheaderTypographyProps={{ fontSize: "0.8rem" }}
              />
              <CardContent>
                <Grid container spacing={{ xs: 0, sm: 1 }}>
                  <Grid item xs={4}>
                    NIC Number
                  </Grid>
                  <Grid item xs={1}>
                    :
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employeeData.NIC}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    Email Address
                  </Grid>
                  <Grid item xs={1}>
                    :
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employeeData.EmailAddress}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    Mobile No
                  </Grid>
                  <Grid item xs={1}>
                    :
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employeeData.MobileNo}</Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    component="form"
                    onSubmit={handleUserAdd}
                    spacing={{ xs: 0, sm: 1 }}
                  >
                    <Grid item xs={4}>
                      User Role *
                    </Grid>
                    <Grid item xs={1}>
                      :
                    </Grid>
                    <Grid item xs={7}>
                      <Input
                        name="userRole"
                        type="select"
                        options={roles}
                        value={userRole}
                        handleChange={(e) => setUserRole(e.target.value)}
                        autocomplete
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonComp
                        type="submit"
                        loading={isLoading}
                        fullWidth
                        sx={{ mt: "1rem" }}
                      >
                        Save
                      </ButtonComp>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : (
            employeeNumber !== 0 && (
              <Box
                sx={{
                  margin: "auto",
                }}
              >
                No Results ...
              </Box>
            )
          )
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <CircularProgress size="5rem" />
          </Box>
        )}
        <Grid container sx={{ maxWidth: "500px" }}>
          <Error error={error} setError={setError} />
        </Grid>
      </Dialog>
      <Dialog open={userRemove} onClose={handleUserRemoveClose}>
        <DialogTitle>Remove this User ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleUserRemoveClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleUserRemove} sx={{ color: "red" }}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUsers;
