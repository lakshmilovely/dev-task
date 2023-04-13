import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userToken:any='';

  constructor(private router:Router,private actroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actroute.paramMap.subscribe((params:ParamMap)=>{
    this.userToken = params.get('token');

    if(this.userToken==null)
    {
      //console.log("empty");
      window.location.href = 'https://dev.axelautomotive.com/';

    }
    else
    {
      const UDetails = atob(this.userToken);
      console.log(UDetails);
      localStorage.setItem('UserName', JSON.parse(UDetails).uname);
      localStorage.setItem('UserTitle', JSON.parse(UDetails).utitle);
      localStorage.setItem('UserId', JSON.parse(UDetails).uid);
      localStorage.setItem('ProjectId', JSON.parse(UDetails).pid);
      localStorage.setItem('StoreId',JSON.parse(UDetails).storeId);
      this.router.navigate(['/', 'dashBoard']);

    }
    }
    )};

}
