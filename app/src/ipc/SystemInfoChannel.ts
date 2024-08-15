import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import {execSync} from "child_process";
import { Channels } from "./channels";

export class SystemInfoChannel implements IpcChannelInterface {
  getName(): Channels {
    return 'system-info';
  }

  handle(event: IpcMainEvent, args: unknown[] = []): void {
    const out  = execSync('uname -a').toString()

    event.reply(this.getName(), out)
  }
}