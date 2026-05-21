import { v7 } from 'uuid';
import {
  ContractBidPackageId,
  ContractId,
  ContractNo,
  ContractSigningDate,
} from './value-object/contract.vo';
import { UpdateContractCommand } from '../application/command/update-contract.command';

export class Contract {
  constructor(
    public id: ContractId | null,
    public bidPackageId: ContractBidPackageId,
    public no: ContractNo,
    public signingDate: ContractSigningDate,
  ) {
    if (!this.id) {
      this.id = new ContractId(v7());
    }
  }

  update(updatedData: UpdateContractCommand): string[] {
    // this.id = new ContractId(updatedData.id);

    if (updatedData.bid_package_id) {
      this.bidPackageId.value = updatedData.bid_package_id;
      this.dirtyTracking.push('bid_package_id');
    }

    if (updatedData.no) {
      this.no.value = updatedData.no;
      this.dirtyTracking.push('no');
    }

    if (updatedData.signing_date) {
      this.signingDate.value = updatedData.signing_date;
      this.dirtyTracking.push('signing_date');
    }

    return this.dirtyTracking;
  }

  /**
   * list of property that was updated (only used when invoke update method)
   */
  dirtyTracking: string[] = [];
}
