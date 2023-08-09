import { Select } from "@mui/material";

const SelectComp = ({ name, value, onChange, required, children }) => (
  <Select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    MenuProps={{
      disableScrollLock: true,
    }}
    sx={{
      minWidth: "140px",
      minHeight: "1.4rem",
      backgroundColor: (theme) => theme.palette.background.main,
    }}
  >
    {children}
  </Select>
);

export default SelectComp;
