class User {
  public email: string;
  public password: string;
  public role?: string;
  public firstName?: string;
  public lastName?: string;
  public id?: number;

  constructor(
    email: string,
    password: string,
    role?: string,
    firstName?: string,
    lastName?: string,
    id?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.id = id;
  }
}

export default User;
