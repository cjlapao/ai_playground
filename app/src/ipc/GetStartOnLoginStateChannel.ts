import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import {execSync} from "child_process";
import { Channels } from "./channels";
import *  as fs from 'fs';
import * as os from 'os'

export class GetStartOnLoginStateChannel implements IpcChannelInterface {
  getName(): Channels {
    return 'get-start-on-login-state';
  }

  handle(event: IpcMainEvent, args: unknown[] = []): void {
    console.log('starting everything')
    const home = os.homedir()
    const configFolder =`${home}/.config`
    const autoStartFolder = `${configFolder}/autostart`
    const fileName = 'ai_documentation.desktop'
    const filePath = `${autoStartFolder}/${fileName}`

    // checking if config folder exists
    if(!fs.existsSync(configFolder)) {
      console.log('from ipc state is false, no nothing')
        event.reply(this.getName(), [false])
        return
    }
    if(!fs.existsSync(autoStartFolder)) {
      console.log('from ipc state is false, no autostart')
        event.reply(this.getName(), [false])
        return
    }

    if(!fs.existsSync(filePath)) {
      console.log('from ipc state is false, no file')
        event.reply(this.getName(), [false])
        return
    }
    const fileContent = fs.readFileSync(filePath).toString()
    if(fileContent.includes('X-GNOME-Autostart-enabled=true')){
      console.log('from ipc state is true')
        event.reply(this.getName(), [true])
        return
    }
    console.log('from ipc state is false')
    event.reply(this.getName(), [false])
  }
}