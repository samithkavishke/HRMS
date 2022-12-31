import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function UserProfile() {
  return (
    <Box marginTop={7} paddingTop={4} marginLeft={5} paddingLeft={4}>
      <Box padding={3}>
        <Avatar sx={{ width: 200, height: 200 }}>H</Avatar>
      </Box>
      <Stack direction="row" spacing={10}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              Navindu De Silva
            </Typography>
            <Typography variant="h7">
              No 122, Perera Mawatha,Dehiwala{" "}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 900 }}>
          <CardContent>
            <Stack direction="row">
              <Typography gutterBottom variant="h7" component="div">
                Navindu De Silva
              </Typography>
              <Typography variant="h7">
                No 122, Perera Mawatha,Dehiwala{" "}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
