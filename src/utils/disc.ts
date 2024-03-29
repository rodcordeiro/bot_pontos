import axios from 'axios';
import formData from 'form-data';
import fs from 'fs';
import qr from 'qrcode';

export const sendQrCode = async (code: string) => {
  const form = new formData();

  qr.toFile('./qrCode.png', code, async (err) => {
    if (err) {
      throw err;
    }
    form.append(
      'avatar_url',
      'https://rodcordeiro.github.io/shares/img/octocat.png',
    );
    form.append('username', 'RodRobo');
    form.append(
      'content',
      process.env.NODE_ENV === 'dev' ? 'dev_bot_pontos' : 'bot_pontos',
    );
    form.append('file1', fs.createReadStream('./qrCode.png'));

    await axios
      .post(process.env.DISCORD_WEBHOOK, form)
      .then(() => {
        console.log('QR Code sent. Please verify quickly.');
        fs.unlink('./qrCode.png', () => {});
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  });
};
