class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: string;
    public id?: number;
  
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      role: string,
      id?: number
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.role = role;
      this.id= id;
    }
  }
  
  export default User;