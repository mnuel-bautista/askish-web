import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { environment } from "src/environments/environment";

@Injectable()
export class Firebase {
    app = initializeApp(environment.firebase)
}