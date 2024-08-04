import * as crypto from 'crypto';


export class HashAdapter {
  sha1(input: string): string {
    try {
      const hash = crypto.createHash('sha1');
      hash.update(input);
      return hash.digest('hex');
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
