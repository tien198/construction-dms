import fs from 'fs';
import path from 'path';

export class BasePersistence {
  protected _getQueryFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, '..', 'sql', 'dql', ...pathName),
      'utf-8',
    );
  }

  protected _getManipulateFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, '..', 'sql', 'dml', ...pathName),
      'utf-8',
    );
  }
}
