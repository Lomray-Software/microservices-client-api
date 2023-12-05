import type { IEntity } from '@lomray/microservices-types';
import type IDispute from './dispute';

/**
 * Evidence details
 * @description Dispute evidence details
 */
interface IEvidenceDetails extends IEntity {
  // Microservice dispute id
  disputeId?: string;
  // Whether evidence has been submitted
  hasEvidence?: boolean;
  // The number of times evidence has been submitted. Typically, evidence can be submitted only once.
  submissionCount?: number;
  // Date by which evidence must be submitted in order to successfully challenge dispute. Will be 0 if the customer’s bank or credit card company doesn’t allow a response for this particular dispute
  dueBy?: Date | null;
  // Whether the last evidence submission was submitted past the due date. Defaults to false if no evidence submissions have occurred. If true, then delivery of the latest evidence is not guaranteed.
  isPastBy?: boolean;
  dispute?: IDispute;
}

export default IEvidenceDetails;
