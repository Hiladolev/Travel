class Account {
  public firstName: string;
  public lastName: string;
  public role: string;
  public email?: string;
  public password?: string;
  public id?: number;

  constructor(
    firstName: string,
    lastName: string,
    role: string,
    email?: string,
    password?: string,
    id?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}

export default Account;
