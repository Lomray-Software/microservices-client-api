/**
 * Input for view-all method
 */
export interface IViewAllInput {
  userId: string;
}

/**
 * Output for view-all method
 */
export interface IViewAllOutput {
  status: boolean;
  affected?: number;
}
