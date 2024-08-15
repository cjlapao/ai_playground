import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import { exec, execSync, spawnSync} from "child_process";
import { Channels } from "./channels";


export class StartVsCodeChannel implements IpcChannelInterface {
  getName(): Channels {
    return 'start-vscode';
  }

  handle(event: IpcMainEvent, args: unknown[] = []): void {
    let cmd = 'code'
    if (args && args.length > 0) {
        args.forEach(arg => {cmd = cmd+=` ${arg}`})
    }
    const out  = exec(cmd)

    event.reply(this.getName(), [true])

  }
}