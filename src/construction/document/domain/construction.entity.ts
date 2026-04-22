// import { v7 } from 'uuid';
// import { ConstructionId } from './value-objects/construction.vo';
// import { ConstructionInfoId } from './value-objects/construction-info.vo';
// import { PursuantToDecTCT } from './value-objects/document.vo';
// import type { IConstruction } from './domain-primitive/i-construction';

// /**
//  * Construction — Child entity of Decision aggregate.
//  */
// export class Construction implements IConstruction {
//   constructor(
//     public id: ConstructionId,
//     public pursuant_to_dec_tct_id: PursuantToDecTCT,
//     public current_snapshot_id: ConstructionInfoId | null,
//   ) {
//     if (id.value === null) {
//       this.id = ConstructionId.create(v7());
//     }
//   }

//   assignSnapshot(snapshotId: ConstructionInfoId): void {
//     this.current_snapshot_id = snapshotId;
//   }

//   // Reconstitute từ DB — dùng trong repository khi load lên
// }
