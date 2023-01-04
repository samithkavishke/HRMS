import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import Axios from "axios";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const employee_id = "10001";

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    town: "",
    birth_date: "",
    birth_month: "",
    birth_year: "",
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/user-profile/${employee_id}`)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.result[0].first_name);
          setUserData(response.data.result[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // the empty array ensures that the effect only runs once when the component is mounted

  const {
    first_name,
    last_name,
    address_line1,
    address_line2,
    town,
    birth_date,
    birth_month,
    birth_year,
  } = userData;

  return (
    <Box padding={2} margin={7}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="caption">Full Name</Typography>}
            secondary={
              <Typography variant="body2">
                {first_name + " " + last_name}
              </Typography>
            }
            disableTypography
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HomeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="caption">Address</Typography>}
            secondary={
              <Typography variant="body2">
                {address_line1 + ", " + address_line2 + ", " + town}
              </Typography>
            }
            disableTypography
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CakeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="caption">Birth Date</Typography>}
            secondary={
              <Typography variant="body2">
                {birth_date + " " + birth_month + " " + birth_year}
              </Typography>
            }
            disableTypography
          />
        </ListItem>
      </List>
    </Box>
  );
}
