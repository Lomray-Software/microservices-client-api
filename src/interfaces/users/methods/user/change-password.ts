interface IChangePassword {
  userId: string;
  newPassword: string;
  allowByAdmin: boolean;
}

export default IChangePassword;
