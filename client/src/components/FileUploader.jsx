import { useRef } from "react";
import ButtonComp from "./ButtonComp";
const FileUploader = ({
  name,
  handleChange,
  setAttachment,
  setError,
  required,
  children,
}) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFile = (e, value) => {
    handleChange({
      target: {
        name: e.target.name,
        value: value ? "" : e.target.files[0].name,
      },
    });
    setAttachment(value ? null : e.target.files[0]);
    setError(value ?? null);
  };

  const handleFileChange = (e) => {
    e.target.files[0]?.type !== "application/pdf" &&
      handleFile(e, "Incorrect File Format!");
    e.target.files[0]?.size >= 5 * 1000 * 1024 &&
      handleFile(e, "File size must be less than 5MB");
    e.target.files[0]?.type === "application/pdf" &&
      e.target.files[0]?.size < 5 * 1000 * 1024 &&
      handleFile(e);
  };
  return (
    <>
      <ButtonComp
        sx={{
          position: "relative",
          transform: "translate(0.85rem)",
          height: "40px",
        }}
        onClick={handleClick}
      >
        {children}
      </ButtonComp>
      <input
        name={name}
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        style={{
          opacity: 0,
          width: "1px",
          position: "absolute",
        }}
        required={required}
      />
    </>
  );
};
export default FileUploader;
