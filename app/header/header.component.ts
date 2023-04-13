import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashService } from '../core/_services/dashboard/dash.service';

import { HeaderserviceService } from '../core/_services/dashboard/headerservice.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsComponent } from '../reports/reports.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('cancel') cancel: any;
  @ViewChild('cancelFilterModal') cancelFilterModal: any;
  act: any;
  simple: any;
  selectedNameid = 'AllModules';
  dashFun: any;
  MyName: any = 'AllModules';

  //-----Action Filters----------//
  AllstoresData: any;
  AssignToData: any;
  statusData: any;
  dueDatesData: any;
  priorityData: any;
  followersData: any;
  tagsData: any;
  filterName: any;
  MainData: any = [];
  storData: any = [];
  assData: any = [];
  staData: any = [];
  duData: any = [];
  priData: any = [];
  follData: any = [];
  tData: any = [];
  arrLength: any;
  clrIs: any;
  btnbackbgcolor: any;
  selectedStoreData: any;
  selectedAssignData: any;
  selectedStatusData: any;
  selectedDDateData: any;
  selectedPriorityData: any;
  selectedFollowersData: any;
  selectedTagsData: any;
  QueryArray: any = [];
  userId: any = '';
  projectId: any = '';
  username: any = '';
  usertitle: any = '';
  public filterDate: any;
  userToken: any;
  userDetails: any;
  uname: any;
  sess: any;
  selectedModule: any;
  dataref: any = '';
  allModulesData: any = [];
  selectedModulesData: any;
  repdis = true;
  selectedFilName = '';

  allStoresName: any = [];
  allModulesName: any = [];

  constructor(
    private header: HeaderserviceService,
    private dashcom: DashboardComponent,
    private router: Router,
    private dashsrvc: DashService,
    private rout: ActivatedRoute,
    // private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dataref = { rs: 'ALL' };
    // this.filter('ALL')
    this.projectId = localStorage.getItem('ProjectId');
    if (this.projectId == null) this.projectId = '';
    this.uname = localStorage.getItem('UserName');
    this.usertitle = localStorage.getItem('UserTitle');
    this.action();
    this.allFiltersData();
    //console.log(this.projectId);
  }

  ngAfterViewInit() {
    this.dashsrvc.getbuttonData().subscribe((data: any) => {
      //console.log(data);
      if (data == '') {
        this.dataref = { rs: 'ALL' };
      }
    });
  }

  action() {
    this.act = '';
    this.header.projectinfo().subscribe((res: any) => {
      this.act = res;
      //console.log(this.act);
    });
  }

  imgClick() {
    this.selectedNameid = this.MyName;
  }
  open(id: any) {
    this.selectedNameid = id;
  }

  saveName() {
    this.MyName = this.selectedNameid;
    // //console.log(this.selectedNameid);
    if (this.selectedNameid == '') {
      alert('Select Any One.');
    } else {
      localStorage.setItem('pnameVid', this.selectedNameid);
      this.dashcom.getProjectNameData();
      this.cancel.nativeElement.click();
    }
  }

  allFiltersData() {
    // StoreData() {
    this.dashsrvc.getAllStores().subscribe((data) => {
      this.AllstoresData = data;
    });
    // }
    // AssignData() {
    this.dashsrvc.getAllUsers(1).subscribe((data) => {
      this.AssignToData = data;
    });
    // }
    // StatusData() {
    this.dashsrvc.statusview().subscribe((data) => {
      this.statusData = data;
    });
    // }
    // PriorityData() {
    this.dashsrvc.priority().subscribe((data) => {
      this.priorityData = data;
    });
    // }
    // FollowersData() {
    this.dashsrvc.getAllUsers(1).subscribe((data) => {
      this.followersData = data;
    });
    // }
    // TagsData() {
    this.dashsrvc.GetTagsData().subscribe((data) => {
      this.tagsData = data;
    });
    // }
  }

  openreports() {
    // const reports = this.modalService.open(ReportsComponent, {
    //   backdrop: 'static',
    // });
  }

  clkFilter(value: any) {
    this.repdis = true;
    this.filterName = value;
    this.MainData = [];


    //-----------All Modules------------//
    if (this.filterName == 'allmodules') {
      this.selectedFilName = 'All Modules';
      this.MainData = this.act;
    }

    //-----------stores------------//
    if (this.filterName == 'stores') {
      this.selectedFilName = 'Stores(S)';
      this.MainData = this.AllstoresData;
    }

    //-----------assign to------------//
    if (this.filterName == 'assign') {
      this.selectedFilName = 'Assigned To';
      this.MainData = this.AssignToData;
    }

    //-----------status------------//
    if (this.filterName == 'status') {
      this.selectedFilName = 'Status';
      this.MainData = this.statusData;
    }

    //-----------due date------------//
    if (this.filterName == 'ddate') {
      this.selectedFilName = 'Due Date';
    }

    //-----------priority------------//
    if (this.filterName == 'priority') {
      this.selectedFilName = 'Priority';
      this.MainData = this.priorityData;
    }

    //-----------followers------------//
    if (this.filterName == 'followers') {
      this.selectedFilName = 'Followers';
      this.MainData = this.followersData;
    }

    //-----------tags------------//
    if (this.filterName == 'tags') {
      this.selectedFilName = 'Tags';
      this.MainData = this.tagsData;
    }
    //-------------Clear Filters------------- //

    if (this.filterName == 'clearall') {
      this.clearAllData();
      // if(this.projectId == ''){
      this.clkFilter('allmodules');
      this.MyName = 'AllModules';
      // }else{
      //   this.clkFilter('stores');
      //   this.MyName = 'stores'
      // }
      this.savefilters();
    }
  }

  selectedItems(value: any) {
    //-------------All Modules Data-------------//
    // if (this.filterName == 'allmodules') {
    //   const check = this.allModulesData.includes(value);
    //   if (check == false) {
    //     this.allModulesData.push(value);
    //   } else {
    //     this.allModulesData.forEach((element: any, index: any) => {
    //       if (element == value) this.allModulesData.splice(index, 1);
    //     });
    //   }
    //   this.selectedModulesData = this.allModulesData.toString();
    //   console.log(this.selectedModulesData);
    // }
    // //-------------Assigned To Data-------------//
    // if (this.filterName == 'stores') {
    //   const check = this.storData.includes(value);
    //   if (check == false) {
    //     this.storData.push(value);
    //   } else {
    //     this.storData.forEach((element: any, index: any) => {
    //       if (element == value) this.storData.splice(index, 1);
    //     });
    //   }
    //   this.selectedStoreData = this.storData.toString();
    //   console.log(this.selectedStoreData);
    // }
    //-------------All Modules Data-------------//    
    if (this.filterName == 'allmodules') {
      if (value == 'modulesAll') {
        const check = this.allModulesName.includes(value);
        if (check == false) {
          this.allModulesData = [];
          this.allModulesName.push(value);
          console.log(this.MainData);
          for (let a = 0; a < this.MainData.length; a++) {
            this.allModulesData.push(this.MainData[a].aopId);
          }
          console.log(this.allModulesData);
        } else {
          this.allModulesName = [];
          this.allModulesData = [];
        }
      } else {
        if (this.MainData.length == this.allModulesData.length) {
          this.allModulesName = [];
          this.allModulesData = [];
        }
        const check = this.allModulesData.includes(value);
        if (check == false) {
          this.allModulesData.push(value);
        } else {
          this.allModulesData.forEach((element: any, index: any) => {
            if (element == value) this.allModulesData.splice(index, 1);
          });
        }

      }
      this.selectedModulesData = this.allModulesData.toString();
      console.log(this.selectedModulesData);
    }
    //-------------Assigned To Data-------------//   
    if (this.filterName == 'stores') {
      if (value == 'allStores') {
        const check = this.allStoresName.includes(value);
        if (check == false) {
          this.storData = [];
          this.allStoresName.push(value);
          console.log(this.MainData);
          for (let a = 0; a < this.MainData.length; a++) {
            this.storData.push(this.MainData[a].asId);
          }
          console.log(this.storData);
        } else {
          this.allStoresName = [];
          this.storData = [];
        }
      } else {
        if (this.MainData.length == this.storData.length) {
          this.allStoresName = [];
          this.storData = [];
        }
        const check = this.storData.includes(value);
        if (check == false) {
          this.storData.push(value);
        } else {
          this.storData.forEach((element: any, index: any) => {
            if (element == value) this.storData.splice(index, 1);
          });
        }
      }
      this.selectedStoreData = this.storData.toString();
      console.log(this.selectedStoreData);
    }

    //-------------Assigned To Data-------------//
    if (this.filterName == 'assign') {
      this.assData = [];
      const check = this.assData.includes(value);
      if (check == false) {
        this.assData.push(value);
      }
      // else {
      //   this.assData.forEach((element: any, index: any) => {
      //     if (element == value) this.assData.splice(index, 1);
      //   });
      // }
      this.selectedAssignData = this.assData.toString();
      console.log(this.selectedAssignData);
    }

    //-------------Status Data-------------//
    if (this.filterName == 'status') {
      const check = this.staData.includes(value);
      if (check == false) {
        this.staData.push(value);
      } else {
        this.staData.forEach((element: any, index: any) => {
          if (element == value) this.staData.splice(index, 1);
        });
      }
      this.selectedStatusData = this.staData.toString();
      console.log(this.selectedStatusData);
    }

    //-------------Due Date Data-------------//
    if (this.filterName == 'ddate') {
      if (value != undefined) {
        this.duData = [];
        this.duData.push(value);
      } else {
        alert('Please Select Date.');
      }
      this.selectedDDateData = this.duData.toString();
      //console.log(this.duData);
      console.log(this.selectedDDateData);
    }

    //-------------Priority Data-------------//
    if (this.filterName == 'priority') {
      const check = this.priData.includes(value);
      if (check == false) {
        this.priData.push(value);
      } else {
        this.priData.forEach((element: any, index: any) => {
          if (element == value) this.priData.splice(index, 1);
        });
      }
      this.selectedPriorityData = this.priData.toString();
      console.log(this.selectedPriorityData);
    }

    //-------------Followers Data-------------//
    if (this.filterName == 'followers') {
      this.follData = [];
      const check = this.follData.includes(value);
      if (check == false) {
        this.follData.push(value);
      }
      // else {
      //   this.follData.forEach((element: any, index: any) => {
      //     if (element == value) this.follData.splice(index, 1);
      //   });
      // }
      this.selectedFollowersData = this.follData.toString();
      console.log(this.selectedFollowersData);
    }

    //-------------Tags Data------------- //
    if (this.filterName == 'tags') {
      this.tData = [];
      const check = this.tData.includes(value);
      if (check == false) {
        this.tData.push(value);
      }
      //  else {
      //   this.tData.forEach((element: any, index: any) => {
      //     if (element == value) this.tData.splice(index, 1);
      //   });
      // }
      this.selectedTagsData = this.tData;
      console.log(this.selectedTagsData);
    }
  }

  cancelM1() {
    this.MainData = [];
    this.clrIs = 'auto';
    this.clearAllData();
  }

  clearAllData() {
    this.allModulesData = [];
    this.storData = [];
    this.assData = [];
    this.staData = [];
    this.duData = [];
    this.priData = [];
    this.follData = [];
    this.tData = [];
    this.filterDate = '';

    this.selectedModulesData = '';
    this.selectedStoreData = '';
    this.selectedAssignData = '';
    this.selectedStatusData = '';
    this.selectedDDateData = '';
    this.selectedPriorityData = '';
    this.selectedFollowersData = '';
    this.selectedTagsData = '';
  }

  // modalOutClick(){
  //   alert()
  // }

  savefilters() {
    this.dataref = '';
    this.QueryArray = [];
    //------------------Modules Data------------------//
    if (
      this.selectedModulesData != '' &&
      this.selectedModulesData != undefined &&
      this.selectedModulesData != null
    ) {
      const sm = 'T_PRJ_ID in' + '(' + this.selectedModulesData + ')';
      this.QueryArray.push(sm);
      //console.log(sm);
      // //console.log(this.QueryArray);
      // //console.log(this.QueryArray.length);
    }
    //------------------Store Data------------------//
    if (
      this.selectedStoreData != '' &&
      this.selectedStoreData != undefined &&
      this.selectedStoreData != null
    ) {
      const sd = 'T_StoreId in' + '(' + this.selectedStoreData + ')';
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + sd);
      } else {
        this.QueryArray.push(sd);
      }
      // this.QueryArray.push(sd);
      // //console.log(sd);
      // //console.log(this.QueryArray);
      // //console.log(this.QueryArray.length);
    }
    //------------------Assign Data------------------//
    if (
      this.selectedAssignData != '' &&
      this.selectedAssignData != undefined &&
      this.selectedAssignData != null
    ) {
      const sAd = 'T_ASSIGNED_UID in' + '(' + this.selectedAssignData + ')';
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + sAd);
      } else {
        this.QueryArray.push(sAd);
      }
      // //console.log(sAd);
      // //console.log(this.QueryArray);
    }
    //------------------Status Data------------------//
    if (
      this.selectedStatusData != '' &&
      this.selectedStatusData != undefined &&
      this.selectedStatusData != null
    ) {
      const std = 'T_STATUS_ID in' + '(' + this.selectedStatusData + ')';
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + std);
      } else {
        this.QueryArray.push(std);
      }
      // //console.log(std);
      // //console.log(this.QueryArray);
    }

    //------------------Due Date Data------------------//

    if (
      this.selectedDDateData != '' &&
      this.selectedDDateData != undefined &&
      this.selectedDDateData != null
    ) {
      const sdd =
        'CAST(T_DUE_DATE AS DATE) =' + "'" + this.selectedDDateData + "'";
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + sdd);
      } else {
        this.QueryArray.push(sdd);
      }
      //console.log('selected Due Date : ', sdd);
      // //console.log(this.QueryArray);
    }

    //------------------Priority Data------------------//
    if (
      this.selectedPriorityData != '' &&
      this.selectedPriorityData != undefined &&
      this.selectedPriorityData != null
    ) {
      const spd = 'T_PRIORITY_ID in' + '(' + this.selectedPriorityData + ')';
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + spd);
      } else {
        this.QueryArray.push(spd);
      }
      // //console.log(spd);
      // //console.log(this.QueryArray);
    }
    //------------------Followers Data------------------//
    if (
      this.selectedFollowersData != '' &&
      this.selectedFollowersData != undefined &&
      this.selectedFollowersData != null
    ) {
      const followersArray: any = [];
      for (let x = 0; x < this.selectedFollowersData.length; x++) {
        followersArray.push(
          // "T_FOLLOWER_UID like '%" + this.selectedFollowersData[x] + "%'"
          "T_FOLLOWER_UID like '" +
          this.selectedFollowersData[x] +
          "[!,]%'" +
          ' or ' +
          "T_FOLLOWER_UID like '%[!,]" +
          this.selectedFollowersData[x] +
          "' or " +
          "T_FOLLOWER_UID like '" +
          this.selectedFollowersData[x] +
          "'"
        );
      }
      // //console.log(followersArray);
      const joinfdata = followersArray.join(' or ');
      // //console.log(joinfdata);
      const sfd = joinfdata.toString();
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + '(' + sfd + ')');
      } else {
        this.QueryArray.push('(' + sfd + ')');
      }
      // //console.log(sfd);
      // //console.log(this.QueryArray);
    }
    //------------------Tags Data------------------//
    if (
      this.selectedTagsData != '' &&
      this.selectedTagsData != undefined &&
      this.selectedTagsData != null
    ) {
      const tagsArray: any = [];
      // const sfd = "T_TAG_ID like ''%107%'' or T_TAG_ID like ''%124%'' " + "(" + this.selectedFollowersData + ")";
      for (let x = 0; x < this.selectedTagsData.length; x++) {
        tagsArray.push(
          "T_TAG_ID like '" +
          this.selectedTagsData[x] +
          "[!,]%'" +
          ' or ' +
          "T_TAG_ID like '%[!,]" +
          this.selectedTagsData[x] +
          "' or " +
          "T_TAG_ID like '" +
          this.selectedTagsData[x] +
          "'"
        );
      }
      // //console.log(followersArray);
      const jointdata = tagsArray.join(' or ');
      // //console.log(joinfdata);
      const std = jointdata.toString();
      if (this.QueryArray.length != 0) {
        this.QueryArray.push('and ' + '(' + std + ')');
      } else {
        this.QueryArray.push('(' + std + ')');
      }
      // //console.log(std);
      //console.log(this.QueryArray);
    }

    //console.log(this.QueryArray.length);
    var FinalData = '';
    if (this.QueryArray.length == 0) {
      FinalData = this.QueryArray.join(' ');
    } else {
      FinalData = this.QueryArray.join(' ') + " and T_STATUS != 'D'";
    }
    //console.log('The Final Data is : ', FinalData);
    this.cancelFilterModal.nativeElement.click();

    this.dashsrvc.setFilterData(FinalData);
    this.dashcom.TasksData();
  }

  filter(ref: any) {
    //console.log(ref);
    this.dataref = '';
    // let dataref:any='';
    if (ref == 'ATM') {
      this.dataref = 'T_ASSIGNED_UID';
      this.dataref = { rs: 'T_ASSIGNED_UID', value: 1 };
    }
    if (ref == 'ABM') {
      this.dataref = 'T_ASSIGNEDBY_UID';
      this.dataref = { rs: 'T_ASSIGNEDBY_UID', value: 1 };
    }
    if (ref == 'FBM') {
      this.dataref = { rs: 'T_FOLLOWER_UID', value: 1 };
    }
    if (ref == 'ALL') {
      this.dataref = { rs: 'ALL', value: 1 };
    }
    if (this.dataref != '') {
      this.dashsrvc.setbuttonData(this.dataref);
      // this.dashcom.TasksData();
    }
  }

  headClick() {
    localStorage.removeItem('ProjectId');
    localStorage.setItem('urlTest', '1');
  }

  closereports() {
    this.repdis = false;
  }

  selectedClear(fname: any) {
    let selectedFields = fname;
    alert(selectedFields);
    if (selectedFields = "allmodules") {
      // alert('all');
      this.allModulesData = [];
      this.selectedModulesData = '';
    }

    if (selectedFields = "stores") {
      // alert('store')
      this.storData = [];
      this.selectedStoreData = '';
    }

    if (selectedFields = "assign") {
      this.assData = [];
      this.selectedAssignData = '';
    }

    if (selectedFields = "status") {
      this.staData = [];
      this.selectedStatusData = '';
    }

    if (selectedFields = "ddate") {
      this.duData = [];
      this.filterDate = '';
      this.selectedDDateData = '';
    }

    if (selectedFields = "priority") {
      // alert('pri')
      this.priData = [];
      this.selectedPriorityData = '';
    }

    if (selectedFields = "followers") {
      this.follData = [];
      this.selectedFollowersData = '';
    }

    if (selectedFields = "tags") {
      this.tData = [];
      this.selectedTagsData = '';
    }
  }
}
