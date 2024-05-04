export class User {
  lastName: string;
  firstName: string;
  password: string;
  email: string;
  gender: string;
  personType: string;
  terms: boolean;

  constructor(firstName: string, lastName: string, password: string, email: string, gender: string, personType: string, terms: boolean){
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.personType = personType;
    this.terms = terms;
   }
}

