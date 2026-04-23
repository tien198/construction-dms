import { SubmissionContext } from '../dto/submision.context';
import { SubmissionEntity } from '../model/submission.entity';

export class SubmissionMapper {
  static toPersistence(context: SubmissionContext): SubmissionEntity {
    const entity = new SubmissionEntity();

    entity.id = context.submission.id.value!;
    entity.construction_id = context.construction_id;
    entity.decision_id = context.submission.document.id.value!;

    return entity;
  }
}

// import { Decision } from '../../../../../domain/decision.entity';
// import { SubmissionEntity } from '../model/submission.entity';

// export class SubmissionMapper {
//   static toPersistence(decision: Decision): SubmissionEntity[] {
//     const entities: SubmissionEntity[] = [];
//     if (!decision.submissions) return entities;

//     for (const submission of decision.submissions) {
//       const entity = new SubmissionEntity();
//       entity.id = submission.id.value!;
//       entity.construction_id = decision.construction_id.value!;
//       entity.decision_id = decision.id.value!;
//       entity.created_at = new Date(Date.now());
//       entities.push(entity);
//     }

//     return entities;
//   }
// }
