export class User {
  password: string;
  email: string;
  lastName?: string;
  firstName?: string;
  gender?: string;
  personType?: string;
  terms?: boolean;

  constructor(password: string, email: string, firstName?: string, lastName?: string, gender?: string, personType?: string, terms?: boolean){
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.personType = personType;
    this.terms = terms;
   }
}

