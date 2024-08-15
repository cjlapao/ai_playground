import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import { exec, execSync, spawnSync} from "child_process";
import { Channels } from "./channels";


export class StartOllamaUiChannel implements IpcChannelInterface {
  getName(): Channels {
    return 'start-ollama-ui';
  }

  handle(event: IpcMainEvent, args: unknown[] = []): void {
    const out  = exec('firefox localhost')

    event.reply(this.getName(), [true])

  }
}