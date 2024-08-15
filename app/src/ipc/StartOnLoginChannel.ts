import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import {execSync} from "child_process";
import { Channels } from "./channels";
import *  as fs from 'fs';
import * as os from 'os'
import { config } from "process";

const AiDocumentationStartupFile = (enabled: boolean) =>{
    return `[Desktop Entry]
Type=Application
Exec=~/ElectronReact-4.6.0-arm64.AppImage
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=${enabled ? 'true': 'false'}
Name[en_US]=Code
Name=Code
Comment[en_US]=
Comment=
`
}


export class StartOnLoginChannel implements IpcChannelInterface {
  getName(): Channels {
    return 'start-on-login';
  }

  handle(event: IpcMainEvent, args: unknown[] = []): void {
    let mode: 'on' | 'off' | 'toggle' = 'on' 
    console.log(args)
    if(args.length == 1) {
        const arg = args[0] as string
        switch(arg.toLowerCase()){
            case 'on':
                mode = 'on';
                break;
            case 'off':
                mode = 'off';
                break;
            case 'toggle':
                mode = 'toggle';
                break;
            default:
                mode = 'off'
                break;
        }
    }

    console.log(mode)
    const home = os.homedir()
    const configFolder =`${home}/.config`
    const autoStartFolder = `${configFolder}/autostart`
    const fileName = 'ai_documentation.desktop'
    const filePath = `${autoStartFolder}/${fileName}`

    // checking if config folder exists
    if(!fs.existsSync(configFolder)) {
        fs.mkdirSync(configFolder)
    }
    if(!fs.existsSync(autoStartFolder)) {
        fs.mkdirSync(autoStartFolder)
    }

    if(fs.existsSync(filePath)) {
        fs.rmSync(filePath)
    }
    
    switch(mode) {
        case 'on':
            fs.writeFileSync(filePath, AiDocumentationStartupFile(true))
            break;
        case 'off':
            console.log('jere')
            fs.writeFileSync(filePath, AiDocumentationStartupFile(false))
            break;
        }

    event.reply(this.getName(), mode)
  }
}