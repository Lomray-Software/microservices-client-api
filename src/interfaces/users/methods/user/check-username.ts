class ICheckUsernameInput {
  username: string;
}

class ICheckUsernameOutput {
  isUnique: boolean;
}

export type { ICheckUsernameInput, ICheckUsernameOutput };
