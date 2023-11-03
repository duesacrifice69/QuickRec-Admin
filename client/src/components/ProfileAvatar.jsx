import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const user = useSelector((state) => state.userContext.data);
  const name = user?.result?.UserName;
  const googleProfilePic = user?.result?.picture;
  const avatarProps = googleProfilePic
    ? {
        src: googleProfilePic,
      }
    : {
        sx: {
          bgcolor: (theme) => theme.palette.secondary.main,
          color: "#000",
          border: (theme) => "1px solid " + theme.palette.secondary[700],
        },
        children: `${
          name.split(" ").length > 1
            ? name.split(" ")[0][0] + name.split(" ")[1][0]
            : name.split(" ")[0][0]
        }`,
      };

  return <Avatar alt="" {...avatarProps} />;
};

export default ProfileAvatar;
