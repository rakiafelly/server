import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  addUserForm?: FormGroup;
  id: any;
  constructor(private utilisateur: UserServiceService, private activateRoute: ActivatedRoute, private router:Router
    ) { }

  ngOnInit(): void {
    this.id=this.activateRoute.snapshot.params['id'];
    this.utilisateur.getUserDetail(this.id).subscribe((response:any)=>{
      console.log(response)
      this.addUserForm?.patchValue(response)
    }),(error:any)=>{
      console.log(error)
    }
    this.addUserForm = new FormGroup(
      {
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
      });

  }

  update() {
    this.utilisateur.updateUser(this.id, this.addUserForm?.value).subscribe((response: any) => {
      console.log(response)
      this.router.navigateByUrl('/users')
    }), (error: any)=>{
      console.log(error)
    }
  }
}
