import { useRef } from "react";
import ButtonComp from "./ButtonComp";
const FileUploader = ({ name, handleChange, required, children }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <ButtonComp
        sx={{ transform: "translate(0.85rem)", height: "40px" }}
        onClick={handleClick}
      >
        {children}
      </ButtonComp>
      <input
        name={name}
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => {
          e.target.files[0]?.type === "application/pdf"
            ? handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.files[0].name,
                },
              })
            : alert("Invalid file type!");
        }}
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
