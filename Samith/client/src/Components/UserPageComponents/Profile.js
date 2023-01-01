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
import { useState } from "react";

export default function UserProfile() {
  const employee_id = "10001";
  // let first_name = "";
  // let last_name = "";
  // let address_line1 = "";
  // let address_line2 = "";
  // let town = "";
  // let birth_year = "";
  // let birth_month = "";
  // let birth_date = "";
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address_line1, setAddress1] = useState("");
  const [address_line2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [birth_year, setBirthYear] = useState("");
  const [birth_month, setBirthMonth] = useState("");
  const [birth_date, setBirthDate] = useState("");

  Axios.get(`http://localhost:3001/user-profile/${employee_id}`)
    .then((response) => {
      // console.log(response);
      if (response.data.success) {
        console.log(response.data.result[0].first_name);
        setAddress1(response.data.result[0].address_line1);
        setAddress2(response.data.result[0].address_line2);
        setBirthDate(response.data.result[0].birth_date);
        setBirthMonth(response.data.result[0].birth_month);
        setBirthYear(response.data.result[0].birth_year);
        setFirstName(response.data.result[0].first_name);
        setLastName(response.data.result[0].last_name);
        setTown(response.data.result[0].town);
      }
    })
    .catch((e) => {
      console.log(e);
    });

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
                {birth_year + " " + birth_month + " " + birth_date}
              </Typography>
            }
            disableTypography
          />
        </ListItem>
      </List>
    </Box>
  );
}
