import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Utilisateur } from '../utilisateur';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listUsers: Utilisateur[] = []
  addUserForm?:FormGroup;

  constructor(private utilisateur: UserServiceService) { }

  ngOnInit(): void {
  this.getUsers();
  this.addUserForm=new FormGroup(
    {
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required)
    }
  );
  }

  getUsers() {
    this.utilisateur.getUsers().subscribe((response: Utilisateur[]) => {
      console.log(response);
      this.listUsers = response
    }, error => {
      console.log(error)
    }
    )
  }
  add() {
    this.utilisateur.addUser(this.addUserForm?.value).subscribe((response: any) => {
      console.log('ok')
    }, (error) => {
      console.log(error)
    });
  }

  delete(utilisateur: Utilisateur) {
    this.utilisateur.deleteUser(utilisateur).subscribe((response: any) => {
      console.log(response)
      this.getUsers();
    }, (error: any) => {
      console.log(error)
    })

  }


}
