import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinkIcon from "@mui/icons-material/Link";
import FileUploader from "./FileUploader";

const Input = ({
  name,
  value,
  label,
  handleChange,
  half,
  error,
  helperText,
  disabled,
  multiline,
  minRows,
  maxRows,
  type,
  required,
  handleShowPassword,
  size,
}) => {
  let inputProps = {};

  if (name === "password") {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleShowPassword}>
            {type === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      ),
    };
  } else if (name.startsWith("mobileNo")) {
    inputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <Typography
            sx={{
              pr: "10px",
              borderRight: (theme) =>
                `1px solid ${theme.palette.secondary.main}`,
            }}
          >
            +94
          </Typography>
        </InputAdornment>
      ),
    };
  } else if (type === "file") {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <FileUploader handleChange={handleChange}>Go</FileUploader>
        </InputAdornment>
      ),
      startAdornment: (
        <InputAdornment position="start">
          <LinkIcon
            sx={{
              p: 0,
              transform: "rotate(135deg) translate(2px,2px)",
            }}
          />
        </InputAdornment>
      ),
    };
  }

  return (
    <Grid item xs={12} sm={half ? 6 : 12} sx={{ textAlign: "left" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={(e) => {
          name.startsWith("mobileNo")
            ? // moblie No inputs
              (Number(e.target.value) || e.target.value === "") &&
              e.target.value.length < 10 &&
              handleChange(e)
            : // other inputs
              handleChange(e);
        }}
        fullWidth
        required={required}
        disabled={type === "file" ? true : disabled}
        multiline={multiline}
        error={error}
        helperText={helperText}
        minRows={minRows}
        maxRows={maxRows}
        type={type === "file" ? null : type}
        InputProps={inputProps}
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
        }}
        size={size ? size : "small"}
      />
    </Grid>
  );
};

export default Input;
