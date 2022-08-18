export const SaleStatusEnum = {
  PENDING: 'PENDING',
  SALE_ENDED: 'SALE_ENDED',
  SALE_CANCELED: 'SALE_CANCELED',
  SALE_MET_GOAL: 'SALE_MET_GOAL',
  SALE_STARTED: 'SALE_STARTED',
  SOLD: 'SOLD',
};

export const VotingStatusEnum = {
  VOTING_DRAFT: 'VOTING_DRAFT',
  VOTING_STARTED: 'VOTING_STARTED',
  VOTING_ENDED: 'VOTING_ENDED',
  VOTING_VERIFIED: 'VOTING_VERIFIED',
};

export const AcquisitionStatusEnum = {
  ACQUISITION_APPROVED: 'ACQUISITION_APPROVED',
  ACQUISITION_REJECTED: 'ACQUISITION_REJECTED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
};

export const ColorSaleStatusEnum = {
  PENDING: 'yellow',
  SALE_ENDED: 'green',
  SALE_CANCELED: 'gray',
  SALE_MET_GOAL: 'blue',
  SALE_STARTED: 'orange',
  SOLD: 'pink',
};

export const ColorVotingStatusEnum = {
  VOTING_DRAFT: 'yellow',
  VOTING_STARTED: 'orange',
  VOTING_ENDED: 'pink',
  VOTING_VERIFIED: 'unknown',
};

export const ColorAcquisitionStatusEnum = {
  ACQUISITION_APPROVED: 'green',
  ACQUISITION_REJECTED: 'gray',
  PENDING_APPROVAL: 'yellow',
};

export const InvestedStatusEnum = {
  PURCHASED: 'PURCHASED',
  REFUNDED: 'REFUNDED',
  CLAIMED: 'CLAIMED',
};

export const ClaimStatusEnum = {
  CLAIMABLE: 'CLAIMABLE',
  CLAIMED: InvestedStatusEnum.CLAIMED,
  REFUNDED: InvestedStatusEnum.REFUNDED,
  REFUNDABLE: 'REFUNDABLE',
  PENDING: 'PENDING',
};

export const ClaimStatusTextEnum = {
  [ClaimStatusEnum.CLAIMABLE]: 'claimStatus.claimable',
  [ClaimStatusEnum.CLAIMED]: 'claimStatus.claimed',
  [ClaimStatusEnum.REFUNDED]: 'claimStatus.refunded',
  [ClaimStatusEnum.REFUNDABLE]: 'claimStatus.refundable',
  [ClaimStatusEnum.PENDING]: 'claimStatus.pending',
};

export const DurationEnum = {
  DAY: '1DAY',
  WEEK: '1WEEK',
  MONTH: '1MONTH',
};

export const ChartTypeEnum = {
  CANDLESTICK: 'CANDLESTICK',
  BASELINE: 'BASELINE',
  AREA: 'AREA',
};
