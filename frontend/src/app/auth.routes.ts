import { Routes } from "@angular/router";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { LogoutComponent } from "./auth/logout.component";

export const AUTH_ROUTES: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: "signin", "title": "Autenticação | SignIn", component: SigninComponent },
  { path: "signup", "title": "Autenticação | SignUp", component: SignupComponent },
  { path: "logout", "title": "Autenticação | LogOut", component: LogoutComponent },
]