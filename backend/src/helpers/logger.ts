import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const hook = process.env.ERROR_LOGS_HOOK ?? '';

export default async (log: unknown, color?: 'good' | 'warning' | 'danger') => {
  try {
    console.error(log);
    if (process.env.IS_LOCAL === 'TRUE') return;

    let logText: unknown;
    if (typeof log === 'string') logText = log;
    else if (log instanceof Error) logText = log.message + '\n ```' + log.stack + '```';
    else logText = log;

    let icon = '🙀';
    switch (color) {
      case 'good':
        icon = '😼';
        break;
      case 'warning':
        icon = '😾';
        break;
      default:
        break;
    }
    await axios.post(`${hook}`, {
      mkdwn: true,
      attachments: [
        {
          pretext: `${icon} Logger`,
          title: 'Message',
          color: color ?? 'danger',
          text: logText
        }
      ]
    });
  } catch (e) {
    console.error(e);
  }
};
