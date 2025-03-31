import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { SendOutlined } from "@ant-design/icons";

function Login() {
  return (
    <>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <TextField id="outlined-basic" label="Email" variant="outlined" />
              <TextField id="outlined-basic" label="Senha" variant="outlined" />
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" endIcon={<SendOutlined />}>
              Enviar
            </Button>{" "}
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
export default Login;
