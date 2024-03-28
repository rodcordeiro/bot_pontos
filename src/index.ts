import { config } from 'dotenv';
import { client } from './core/client';

import './events';
config();

client.initialize();
