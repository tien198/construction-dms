import fs from 'fs';
import path from 'path';

export class BasePersistence {
  protected _getManipulateFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, '..', 'sql', 'dml', ...pathName),
      'utf-8',
    );
  }
}
