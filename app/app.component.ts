import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  constructor(private bnIdle: BnNgIdleService) {

  }
  ngOnInit():void
  {
    this.bnIdle.startWatching(600).subscribe((res)=>{
      if(res){
        console.log('session expired');
        localStorage.clear();
        window.location.href = 'https://dev.axelautomotive.com/';
      }
    });
  }
}
