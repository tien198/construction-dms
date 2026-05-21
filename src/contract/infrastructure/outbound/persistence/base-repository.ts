import fs from 'fs';
import path from 'path';

export class BaseRepository {
  protected _getDqlFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, 'sql', 'dql', ...pathName),
      'utf-8',
    );
  }

  protected _getDmlFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, 'sql', 'dml', ...pathName),
      'utf-8',
    );
  }
}
