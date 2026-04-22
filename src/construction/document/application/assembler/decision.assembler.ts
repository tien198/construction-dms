import { Decision } from '../../domain/decision.entity';
import { Submission } from '../../domain/submission.entity';
import { Construction } from '../../domain/construction.entity';
import { AdministrativeDocument } from '../../domain/administrative-document.entity';
import { ConstructionInfoSnapshot } from '../../domain/construction-info.entity';
import { BidPackageSnapshot } from '../../domain/bid-package.entity';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { ConstructionInfoId } from '../../domain/value-objects/construction-info.vo';
import {
  DecisionId,
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { ConstructionInfoSnapshotAssembler } from './construction-info-snapshot.assembler';
import { BidPackageSnapshotAssembler } from './bid-package-snapshot.assembler';

/**
 * DecisionAssembler — Builds the entire Decision aggregate from a command.
 */
export class DecisionAssembler {
  /**
   * Build a full Decision aggregate for initializing a brand new construction.
   */
  static fromInitConstructionCmd(cmd: CreateSubmissionCommand): Decision {
    if (!cmd.construction_info_snapshot) {
      throw new Error(
        'Construction information snapshot is required to init brand new construction',
      );
    }

    // Build Construction (child entity)
    const construction = new Construction(
      new ConstructionId(null),
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      null,
    );

    // Build ConstructionInfoSnapshot with BidPackageSnapshots
    const bidPackages = cmd.construction_info_snapshot.bid_package_snapshots
      ? BidPackageSnapshotAssembler.fromCmdList(
          cmd.construction_info_snapshot.bid_package_snapshots,
          new ConstructionInfoId(null), // will be set after snapshot is created
        )
      : [];

    const conInfor = ConstructionInfoSnapshotAssembler.fromCmd(
      cmd.construction_info_snapshot,
      construction.id,
      bidPackages,
    );

    // Update bid package snapshot IDs to reference the created snapshot
    // (ConstructionInfoSnapshotAssembler generates the real ID)

    // Assign snapshot to construction
    construction.assignSnapshot(conInfor.id);

    // Build Submission (child entity) with its own AdministrativeDocument
    const submissionDoc = DecisionAssembler.buildAdministrativeDocument(cmd);
    const submission = new Submission(
      submissionDoc,
      conInfor.id,
      false,
      conInfor,
    );

    // Build Decision's own AdministrativeDocument
    const decisionDoc = DecisionAssembler.buildAdministrativeDocument(cmd);

    return new Decision(
      decisionDoc,
      cmd.directly_decision.period,
      cmd.is_changed_construction_info ?? false,
      construction,
      [submission],
    );
  }

  /**
   * Build a Decision aggregate for adding a new decision to an existing construction.
   */
  static fromNewDecisionCmd(
    cmd: CreateSubmissionCommand,
    existingConstruction: Construction,
  ): Decision {
    let conInfor: ConstructionInfoSnapshot | null = null;

    if (cmd.construction_info_snapshot) {
      const bidPackages = cmd.construction_info_snapshot.bid_package_snapshots
        ? BidPackageSnapshotAssembler.fromCmdList(
            cmd.construction_info_snapshot.bid_package_snapshots,
            new ConstructionInfoId(null),
          )
        : [];

      conInfor = ConstructionInfoSnapshotAssembler.fromCmd(
        cmd.construction_info_snapshot,
        existingConstruction.id,
        bidPackages,
      );

      existingConstruction.assignSnapshot(conInfor.id);
    }

    const submissionDoc = DecisionAssembler.buildAdministrativeDocument(cmd);
    const submission = new Submission(
      submissionDoc,
      conInfor?.id ?? existingConstruction.current_snapshot_id,
      false,
      conInfor!,
    );

    const decisionDoc = DecisionAssembler.buildAdministrativeDocument(cmd);

    return new Decision(
      decisionDoc,
      cmd.directly_decision.period,
      cmd.is_changed_construction_info ?? false,
      existingConstruction,
      [submission],
    );
  }

  /**
   * Build a Submission to add to an existing Decision aggregate.
   */
  static buildSubmissionForExistingDecision(
    cmd: CreateSubmissionCommand,
    existingConstruction: Construction,
  ): {
    submission: Submission;
    conInfor: ConstructionInfoSnapshot | null;
  } {
    let conInfor: ConstructionInfoSnapshot | null = null;

    if (cmd.construction_info_snapshot) {
      const bidPackages = cmd.construction_info_snapshot.bid_package_snapshots
        ? BidPackageSnapshotAssembler.fromCmdList(
            cmd.construction_info_snapshot.bid_package_snapshots,
            new ConstructionInfoId(null),
          )
        : [];

      conInfor = ConstructionInfoSnapshotAssembler.fromCmd(
        cmd.construction_info_snapshot,
        existingConstruction.id,
        bidPackages,
      );

      existingConstruction.assignSnapshot(conInfor.id);
    }

    const submissionDoc = DecisionAssembler.buildAdministrativeDocument(cmd);
    const submission = new Submission(
      submissionDoc,
      conInfor?.id ?? existingConstruction.current_snapshot_id,
      false,
      conInfor!,
    );

    return { submission, conInfor };
  }

  /**
   * Helper: build AdministrativeDocument from command fields.
   */
  private static buildAdministrativeDocument(
    cmd: CreateSubmissionCommand,
  ): AdministrativeDocument {
    return new AdministrativeDocument(
      new DocumentId(null),
      new DocumentNo(cmd.no),
      cmd.level,
      new Date(cmd.date),
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      cmd.pursuant_to_dec_ttmn_id
        ? new PursuantToDecTTMN(cmd.pursuant_to_dec_ttmn_id)
        : null,
    );
  }
}
