import path from 'path';
import fs from 'fs';

import { IServerInfo } from './interfaces/IServerInfo';

export let serverInfo: IServerInfo;
const rawInfo: string = fs.readFileSync(path.join(__dirname, './config/ServerInfo.json'));
serverInfo = JSON.parse(rawInfo);
