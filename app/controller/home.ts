import { Controller } from 'egg';
import { spawn } from 'child_process';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;

    await ctx.render('index.nj', { test: 123 });
  }

  public async download() {
    const url = 'https://www.youtube.com/watch?v=R07LmWnjcAQ';
    const ls = spawn('youtube-dl', ['-o', '~/Downloads/youtube/%(title)s.%(ext)s', '--proxy', '127.0.0.1:1087', url]);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`);
    });
  }
}
