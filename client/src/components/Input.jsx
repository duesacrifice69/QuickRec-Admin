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
  CircularProgress,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinkIcon from "@mui/icons-material/Link";
import FileUploader from "./FileUploader";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";

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
  setAttachment,
  inline,
  required,
  loading,
  size,
}) => {
  let inputProps = {};
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword((s) => !s)}>
            {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            fileName={value}
            setAttachment={setAttachment}
            setError={setErrorText}
            handleChange={handleChange}
          >
            <CloudUpload sx={{ display: "block", m: "auto" }} />
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
              value={options?.find((option) => option?.value === value) ?? null}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: name, value: newValue?.value },
                });
              }}
              options={options ?? []}
              getOptionLabel={(options) => options?.text}
              size="small"
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              sx={{
                maxWidth: "200px",
                backgroundColor: (theme) => theme.palette.background.main,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          ) : (
            // without search option
            <Select
              name={name}
              value={value}
              onChange={handleChange}
              required={required}
              sx={{
                minWidth: "140px",
                minHeight: "1.4rem",
                backgroundColor: (theme) => theme.palette.background.main,
              }}
              size="small"
              disabled={disabled}
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          )
        ) : (
          //*---------------------- Other Inputs ---------------------- */
          <TextField
            name={name}
            value={
              !value && type === "file"
                ? "Choose a file"
                : name.startsWith("mobileNo")
                ? value.replace("+94", "")
                : value
            }
            onChange={(e) => {
              name.startsWith("mobileNo")
                ? // moblie No inputs
                  (Number(e.target.value) || e.target.value === "") &&
                  e.target.value.length < 10 &&
                  handleChange({
                    target: {
                      name: name,
                      value: "+94" + e.target.value,
                    },
                  })
                : type === "number"
                ? // number inputs
                  handleChange({
                    target: {
                      name: name,
                      value:
                        e.target.value.length > 0
                          ? Number(e.target.value)
                          : e.target.value,
                    },
                  })
                : // other inputs
                  handleChange(e);
            }}
            fullWidth
            required={required}
            disabled={type === "file" ? true : disabled}
            multiline={multiline}
            error={errorText ? true : error}
            helperText={helperText ?? errorText}
            minRows={minRows}
            maxRows={maxRows}
            type={
              type === "file"
                ? null
                : type === "password" && !showPassword
                ? "password"
                : "text"
            }
            InputProps={inputProps}
            sx={{
              backgroundColor: (theme) => theme.palette.background.main,
              "&  .MuiFormHelperText-root.Mui-error": {
                backgroundColor: "#fff",
                m: 0,
                p: "4px 14px 0",
              },
            }}
            size={size ? size : "small"}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Input;
