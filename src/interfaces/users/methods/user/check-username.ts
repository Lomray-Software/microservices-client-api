interface ICheckUsernameInput {
  username: string;
}

interface ICheckUsernameOutput {
  isUnique: boolean;
}

export type { ICheckUsernameInput, ICheckUsernameOutput };
