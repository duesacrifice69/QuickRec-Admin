import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Autocomplete,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinkIcon from "@mui/icons-material/Link";
import FileUploader from "./FileUploader";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Input = ({
  name,
  value,
  label,
  handleChange,
  half,
  options,
  error,
  autocomplete,
  helperText,
  disabled,
  multiline,
  minRows,
  maxRows,
  type,
  inline,
  required,
  handleShowPassword,
  size,
}) => {
  let inputProps = {};
  const isMobile = useMediaQuery("(max-width: 600px)");

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
          <FileUploader
            required={required}
            name={name}
            handleChange={handleChange}
          >
            Go
          </FileUploader>
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
    <Grid item container xs={12} sm={half ? 6 : 12} sx={{ textAlign: "left" }}>
      <Grid item xs={inline && !isMobile ? 6 : 12}>
        <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={inline && !isMobile ? 6 : 12}>
        {/*---------------------- Date Input ---------------------- */}
        {type === "date" ? (
          <DateField
            value={value && dayjs(value)}
            required
            onChange={(newValue) => {
              handleChange({
                target: {
                  name: name,
                  value: newValue.$d.toDateString(),
                },
              });
            }}
            sx={{
              width: "100%",
              backgroundColor: (theme) => theme.palette.background.main,
            }}
            slotProps={{
              textField: { size: "small" },
            }}
          />
        ) : type === "select" ? (
          //*---------------------- Select Input ---------------------- */
          // with search option
          autocomplete ? (
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: name, value: newValue },
                });
              }}
              options={options}
              size="small"
              isOptionEqualToValue={(option, value) => option === value}
              sx={{
                width: "140px",
                backgroundColor: (theme) => theme.palette.background.main,
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            // without search option
            <Select
              name={name}
              value={value}
              onChange={handleChange}
              required={required}
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{
                minWidth: "140px",
                minHeight: "1.4rem",
                backgroundColor: (theme) => theme.palette.background.main,
              }}
              size="small"
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )
        ) : (
          //*---------------------- Other Inputs ---------------------- */
          <TextField
            name={name}
            value={!value && type === "file" ? "Choose a file" : value}
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
        )}
      </Grid>
    </Grid>
  );
};

export default Input;
