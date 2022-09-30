interface ISignOutInput {
  userId: string;
}

interface ISignOutOutput {
  loggedOut: boolean;
}

export { ISignOutInput, ISignOutOutput };
