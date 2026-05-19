import type { CreateContractCommand } from './create-contract.command';

export class UpdateContractCommand implements Partial<CreateContractCommand> {
  id: string;
  bid_package_id?: string;
  no?: string;
  signing_date?: string;
}
