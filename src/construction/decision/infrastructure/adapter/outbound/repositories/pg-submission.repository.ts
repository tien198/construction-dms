/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IDecisionRepository } from '../../../../domain/port/outbound/decision.repository.port';
import { Submission } from '../../../../domain/entity/submission.entity';

@Injectable()
export class PgSubmissionRepository implements Pick<
  IDecisionRepository,
  | 'saveSubmission'
  | 'updateSubmission'
  | 'deleteSubmission'
  | 'findSubmissionById'
  | 'findAllSubmissions'
> {
  saveSubmission(submission: Submission): Promise<Submission> {
    throw new Error('Method not implemented.');
  }
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
  ): Promise<Submission> {
    throw new Error('Method not implemented.');
  }
  deleteSubmission(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findSubmissionById(id: string): Promise<Submission | null> {
    throw new Error('Method not implemented.');
  }
  findAllSubmissions(): Promise<Submission[]> {
    throw new Error('Method not implemented.');
  }
}
