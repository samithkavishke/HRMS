import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";

export default function UserProfile() {
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
              <Typography variant="body2">Navindu De Silva</Typography>
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
                No 122, Perera Mawatha, Dehiwala
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
            secondary={<Typography variant="body2">2000 May 29</Typography>}
            disableTypography
          />
        </ListItem>
      </List>
    </Box>
  );
}
