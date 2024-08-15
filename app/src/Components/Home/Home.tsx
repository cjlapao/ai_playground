import ollama_icon from '../../../assets/img/open_webui.png'
import vscode_icon from '../../../assets/img/vscode_icon.png'
import Layout from "../Layout/Layout";
import './Home.scss'
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

const onClickHandler = () => {
  window.electron.ipcRenderer.sendMessage('start-ollama-ui', [])
}

const onVsCodeWorkspaceClickHandler = () => {
  window.electron.ipcRenderer.sendMessage('start-vscode', ['~/ai_playground/'])
}


export default function Home() {
  const cardWidth = 270
  const cardHeight = 450
  const cardSx = { 
    maxWidth: cardWidth, 
    maxHeight: cardHeight, height: 420, margin: "2px" }

  return (
    <Layout>
      <div className="home_buttons">
        <Card sx={cardSx}>
          <CardMedia>
            <div className="card_media">
              <img height="140px" src={vscode_icon} />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Visual Studio Code Workspace
            </Typography>
            <Typography variant="body2">
              Work with different projects in the Visual studio codespace
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={onVsCodeWorkspaceClickHandler}>Open Workspace</Button>
          </CardActions>
        </Card>
        <Card sx={cardSx}>
          <CardMedia>
            <div className="card_media">
              <img height="160px" src={ollama_icon} />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Chatbot UI
            </Typography>
            <Typography variant="body2">
              Start your own chatbot to try different models
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={onClickHandler}>Try Now</Button>
          </CardActions>
        </Card>
        <Card sx={cardSx}>
          <CardMedia>
            <div className="card_media">
              <img height="120px" src={ollama_icon} />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Chatbot UI
            </Typography>
            <Typography variant="body2">
              Start your own chatbot to try different models
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" href="#/docs">Try Now</Button>
          </CardActions>
        </Card>
      </div>
    </Layout>
  );
}
