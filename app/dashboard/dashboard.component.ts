import { Component, OnInit, ViewChild } from '@angular/core';
import { DashService } from 'src/app/core/_services/dashboard/dash.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { HeaderserviceService } from '../core/_services/dashboard/headerservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

declare var alertify: any;
alertify.set('notifier', 'position', 'top-right');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closeFollowers') closeFollowers: any;
  @ViewChild('actionClose') actionClose: any;
  allUsers: any = [];
  public HideStore = false;
  assignedUsers: any = [];
  allStores: any = [];
  storeid: any = [];
  selectedStore: any = '';
  selectValue: any;
  assignedFollowers: any = [];
  assigneeFilter: any = '';
  followersFilter: any = '';
  totalUsers: any = [];
  selectAlpha: any;
  imgURL: any;
  mainAssignUsers: any = [];
  task: any;
  priority: any;
  show: any = '';
  b: any;
  show1: any;
  visible: boolean = false;
  view: boolean = false;
  display = document.getElementById('date1');
  modulesArray: any = [];
  url: any;
  select: any;
  filePath: any;
  lastpart: any;
  mainAssignFollowers: any = [];
  assignString: any;
  divexpand: boolean = false;
  currentDate = new Date();
  panelIsOpencomplete: boolean = true;
  panelIsOpenhigh: boolean = true;
  panelIsOpenlow: boolean = true;
  panelIsOpenmedium: boolean = true;

  highp: any = [];
  midp: any = [];
  lowp: any = [];
  complete: any = [];
  panelmid: boolean = true;
  panelhigh: boolean = true;
  panellow: boolean = true;
  panelcomp: boolean = true;

  editfile: boolean = false;
  /*-----tags----*/
  public hidecard = false;
  FormSubmitted = false;
  public date = new Date();
  tagsData: any = [];
  filtered: any = [];
  selectTagList: any = [];
  selectdata: any = [];
  tagIdsPush: any = [];
  finalTagIds: any = '';
  FilteredIds: any;
  TagSliceData: any;
  /*----------------------*/
  selectedModule: any = '';
  actionName: any = '';
  description: any = '';
  selectedPriority: any = '';
  finalFollowersId: any = [];
  dateObj: any;
  /*--------tasks--------*/
  tasksArray: any = [];
  highPriority: any[] = [];
  lowPriority: any[] = [];
  completedArray: any[] = [];
  mediumPriority: any[] = [];
  highPriority1: any[] = [];
  lowPriority1: any[] = [];
  completedArray1: any[] = [];
  mediumPriority1: any[] = [];
  highPlength: any;
  lowPlength: any;
  mediumPlength: any;
  completedlength: any;
  item: any;
  pnameId: any;
  projectsData: any = [];
  lowDummy: any = [];
  mediumDummy: any = [];
  highDummy: any = [];
  completedDummy: any = [];
  // filePrefix: any = 'https://devtraxapi.axelautomotive.com/';
  public dateTime1: any;
  expand: boolean = true;
  assignedRef!: boolean;
  moduleRef!: boolean;
  nameRef!: boolean;

  descRef!: boolean;

  statusRef!: boolean;

  priorityRef!: boolean;
  tasksbyId: any;
  tasksingle: any = [];
  add: boolean = false;
  edit: boolean = false;
  data: any;
  highHover = -1;
  editData: any;
  editValue: any;
  lastpart1: any;
  image: any;
  addfile: boolean = false;
  userId: any;
  projectId: any;
  attachment: any = [];
  ext: any;
  viewpath: any = [];
  urls: any = [];
  ext1: string | undefined;
  filterQuery: any = '';
  userTitle: any = '';
  uname: any = '';
  username: any = '';
  userToken: any;
  userDetails: any;
  hoverIdx: any = -1;
  appuserid: any;
  public startAt = new Date();
  // Min moment: Today
  public min = new Date();
  // Max moment: April 25 2018, 20:30
  year: any = new Date().getFullYear();
  ExtensionArray = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'csv', 'xlsx', 'xls', 'txt', 'docx', 'doc', 'ods', 'heic', 'md'];
  norepeateName: boolean = false;

  public max = new Date(this.year + 1, 12, 31, 20, 30);
  urlTest: any = '';
  alreadySelectTag: any = '';
  tagRef!: boolean;
  constructor(
    private dsboard: DashService,
    private spinner: NgxSpinnerService,
    private hdrService: HeaderserviceService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }
  tagForm = this.fb.group({
    addtagname: ['', Validators.required],
  });

  ngOnInit() {
    this.userId = localStorage.getItem('UserId');
    this.username = localStorage.getItem('UserName');
    this.projectId = localStorage.getItem('ProjectId');
    //console.log(this.projectId);
    this.urlTest = localStorage.getItem('urlTest');
    this.storeid = localStorage.getItem('StoreId');

    if (this.projectId == null) {
      this.projectId = '';
      if (this.urlTest == null)
        window.location.href = 'https://dev.axelautomotive.com/';
    }
    else {
      this.selectedModule = this.projectId;
    }
    this.TasksData();
    this.viewstatus();
    this.viewpriority();
    this.selectAlpha = '';
    this.getAllStores();
    this.imgURL = environment.thumbUrl;
    //////console.log(this.imgURL);
    this.modules();
    this.AllTagsData();
    this.assignedRef = false;
    this.moduleRef = false;
    this.nameRef = false;
    this.descRef = false;
    this.statusRef = false;
    this.priorityRef = false;
  }

  ngAfterViewInit() {
    this.dsboard.getbuttonData().subscribe((data) => {
      //console.log(data);
      if (data.value == 1) {
        this.filterQuery = '';
        this.tasksArray = [];
        this.highPriority = [];
        this.lowPriority = [];
        this.mediumPriority = [];
        this.completedArray = [];
        if (this.projectId == '') {
          if (data.rs == 'T_FOLLOWER_UID') {
            this.filterQuery = "(" +
              data.rs + ' ' + 'like ' + "'" + this.userId + '[!,]%' + "'" + ' or ' + data.rs + ' like ' + "'" + '%[!,]' + this.userId + "'" + ' or ' + data.rs + ' like ' + "'" + this.userId + "'" + ') and ' + 'T_STATUS' + '!=' + "'D'";
          } else if (data.rs == 'ALL') {
            // this.filterQuery = '';
            this.filterQuery = "(T_ASSIGNED_UID =" + this.userId + ') OR ((T_ASSIGNEDBY_UID =' + this.userId + ') or (T_FOLLOWER_UID like ' + "'" + this.userId + "[!,]%' or  T_FOLLOWER_UID like '%[!,]" + this.userId + "' or T_FOLLOWER_UID like '" + this.userId + "')) and T_STATUS !=" + "'D'";
          } else {
            this.filterQuery = data.rs + ' ' + 'in' + '(' + this.userId + ") and T_STATUS != 'D'";
          }
        } else {
          const ViaParamsData = 'T_PRJ_ID in' + '(' + this.projectId + ')';
          if (data.rs == 'T_FOLLOWER_UID') {
            this.filterQuery = "(" +
              ViaParamsData +
              ' and ' + data.rs + ' ' + 'like ' + "'" + this.userId + '[!,]%' + "'" + ' or ' + data.rs + ' like ' + "'" + '%[!,]' + this.userId + "'" + ' or ' + data.rs + ' like ' + "'" + this.userId + "'" + ') and ' + 'T_STATUS' + '!=' + "'D'";
          } else if (data.rs == 'ALL') {
            this.filterQuery = ViaParamsData + ' and ' + "((T_ASSIGNED_UID =" + this.userId + ') OR (T_ASSIGNEDBY_UID =' + this.userId + ') or (T_FOLLOWER_UID like ' + "'" + this.userId + "[!,]%' or  T_FOLLOWER_UID like '%[!,]" + this.userId + "' or T_FOLLOWER_UID like '" + this.userId + "')) and T_STATUS !=" + "'D'";
          } else {
            this.filterQuery = "(" + ViaParamsData + ' ' + 'and' + ' ' + data.rs + ' ' + 'in' + '(' + this.userId + '))' + " and T_STATUS != 'D'";
          }
        }
        //console.log('the final Query : ', this.filterQuery);
        let Obj = {
          expression: this.filterQuery,
          sortby: 'T_DUE_DATE',
          rowno: 0,
        };
        //console.log(Obj);
        this.gridFilter(Obj);
      }
    });
  }

  /*-----tags----*/
  AddTagData() {
    this.norepeateName = false;
    if (this.tagForm.invalid) {
      this.FormSubmitted = true;
      this.showTags = false;
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Empty Tag Not Allowed');
    }
    else {
      this.FormSubmitted = false;
      for (let i = 0; i < this.tagsData.length; i++) {
        if (this.tagsData[i].tagTitle.toLowerCase() == this.tagForm.value.addtagname.toLowerCase()) {
          this.norepeateName = true;
          this.alreadySelectTag = this.tagsData[i];
        };
      }
      //console.log(this.norepeateName);
      // //console.log(newTag)
      if (this.norepeateName == true) {
        this.SelectTag(this.alreadySelectTag);

        this.showTags = false;
      }
      else {
        const obj = {
          tagId: 0,
          tagTitle: this.tagForm.value.addtagname,
          tagStatus: 'Y',
          tagCts: this.date,
          tagUts: this.date,
          tagCuid: 0,
          tagUuid: 0,
        };
        //console.log(obj);
        this.dsboard.PostTagsData(obj).subscribe((res: any) => {
          // //// //console.log(res);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Tag added Successfully');
          this.showTags = false;
          this.selectdata = res;
          this.SelectTag(res);
          this.AllTagsData();
        });
      }
    }
  }
  AllTagsData() {
    this.dsboard.GetTagsData().subscribe((res: any) => {
      //// //console.log(res);
      this.tagsData = res;
      //console.log(this.tagsData);
      this.TagSliceData = this.tagsData.slice(0, 3);
      //console.log(this.TagSliceData);
    });
  }
  FilterTags(val: any) {
    return this.tagsData.filter(
      (option: { tagTitle: any }) =>
        option.tagTitle.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) ===
        0
    );
  }
  OnChange(e: any) {
    this.hidecard = true;
    this.filtered = this.FilterTags(e.target.value.toLocaleLowerCase());
    // //console.log(this.filtered);
  }
  SelectTag(item: any) {
    this.tagIdsPush = [];
    // //// //console.log(this.tagIdsPush);
    this.filtered = this.filtered.filter(
      (x: { tagId: any }) => x.tagId == item.tagId
    );
    const index = this.selectTagList.findIndex(
      (object: any) => object.tagId === item.tagId
    );
    // alert(index);
    if (index === -1) {
      this.selectTagList.push(item);
    } else {
      alert('Tag Already Exist');
    }
    for (let a = 0; a < this.selectTagList.length; a++) {
      this.tagIdsPush.push(this.selectTagList[a].tagId);
      // //console.log(this.tagIdsPush);
      this.FilteredIds = this.tagIdsPush.filter(
        (n: any, i: any) => this.tagIdsPush.indexOf(n) === i
      );
      // //console.log(this.FilteredIds);
      this.finalTagIds = this.FilteredIds.join(',');
      // //console.log(this.finalTagIds);
    }
  }

  RemoveTags(index: any, id: any) {
    if (this.editData.tStatus != "Y") {
      this.showTags = true;
      this.selectTagList.splice(index, 1);
      const index1 = this.FilteredIds.findIndex((a: any) => a == id);
      this.FilteredIds.splice(index1, 1);
      this.finalTagIds = this.FilteredIds.join(',');
      // //console.log(this.FilteredIds);
      // //console.log(this.finalTagIds);
    }
  }
  removedata() {
    this.filtered = [];
    this.FormSubmitted = false;
    this.tagForm.reset();
    this.hidecard = false;
  }

  /*Tags End*/
  modules() {
    this.hdrService.projectinfo().subscribe((res: any) => {
      this.modulesArray = res;
      //console.log(this.modulesArray);
    });
  }
  getAllStores() {
    this.spinner.show();
    this.dsboard.getAllStores().subscribe((data) => {
      //console.log(data);
      this.allStores = data;
      // this.selectedStore = this.allStores[0];
      // this.getUsersByStore(this.selectedStore.asDealername);
      this.allStores.sort((a: any, b: any) =>
        a.asDealername.localeCompare(b.asDealername)
      );
    });
  }
  //File Upload

  selectFile(event: any) {
    //console.log(event.target.files);
    let filename: string = event.target.files[0].name;
    let fileExtension: string = event.target.files[0].name
      .split('?')[0]
      .split('.')
      .pop();
    if (this.ExtensionArray.indexOf((fileExtension)) != -1) {
      const formData = new FormData();
      let d = new Date();
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      let min = d.getMinutes();
      let hrs = d.getHours();
      let sec = d.getSeconds();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      let da = [year, month, day, hrs, min, sec].join('_').toString();
      formData.append('file', event.target.files[0], da + '~' + filename);
      if (this.attachment.length < 3) {
        this.dsboard.upload(formData).subscribe((res: any) => {
          this.filePath = 'https://devtaskapi.axelautomotive.com/' + res.dbPath;
          this.attachment.push(this.filePath);
          //console.log(this.attachment.length);
          let pattern = /\\/;
          let pat = /~/;
          let ls = String(this.attachment).split(pattern).pop();
          this.lastpart = String(ls).split(pat).pop();
          this.ext = this.lastpart.split('.').pop();
          this.viewpath.push({ name: this.lastpart, type: this.ext, link: this.filePath });
        });
      }
      else {
        alertify.error('Maxmium number of files should be 3');
      }
    }
    else
      alertify.error('You have unsupported format documents/media.')
  }


  Removeimage(index: any, item: any) {
    if (this.editData.tStatus != "Y") {
      if (confirm('Are you Want To Remove the file')) {
        //console.log(index, item);
        for (let i = 0; i < this.viewpath.length; i++) {
          if (this.viewpath[i].name == item) {
            this.viewpath.splice(index, 1);
            this.attachment.splice(index, 1);
          }
        }
      }
      //console.log(this.viewpath);
      //console.log("after remove", this.attachment);
    }
  }



  storeChange() {
    //console.log(this.selectedStore);

    this.getUsersByStore(this.selectedStore.asDealername);
  }
  getUsersByStore(value: any) {
    this.allUsers = [];
    // this.selectedStore = value;
    //console.log(value);
    this.dsboard.getUsersByStore(value).subscribe((data: any) => {
      //console.log(data);
      this.allUsers = data;
      this.totalUsers = data;
      this.spinner.hide();
      if (this.editData != '') {
        this.totalUsers.forEach((user: any) => {
          if (user.uid == this.editData.tAssignedUid) {
            user.checked = true;
            user.name = 'A';
            //console.log(user);
            this.mainAssignUsers.push(user);
            this.assignedUsers.push(user);
          }
        });
        const followerIds = this.editData.tFollowerUid.split(',');
        //console.log(followerIds);
        followerIds.map((ob: any) => {
          this.totalUsers.forEach((a: any) => {
            if (a.uid == ob) {
              a.checked = true;
              a.name = 'F';
              // this.mainAssignFollowers.push(a);

              this.assignedFollowers.push(a);
            }
          });

          //console.log(this.assignedFollowers);

          this.mainAssignFollowers = this.assignedFollowers;

          //////console.log(this.mainAssignFollowers);

          // for (let i = 0; i < this.mainAssignFollowers.length; i++) {

          //   this.finalFollowersId.push(this.mainAssignFollowers[i].uid);

          // }

          this.finalFollowersId = followerIds;
        });
      }
    });
  }
  alphaFilter(letter: any) {
    if (this.editData.tStatus != "Y") {
      this.priorityHide = false;
      this.showTags = false;
      this.StatusHide = false;
      if (this.selectedStore == '') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Please Select Store');
        this.HideStore = false;
      } else {
        this.HideStore = true;
        this.selectAlpha = letter;
        this.allUsers = [];
        if (letter == '') {
          this.allUsers = this.totalUsers;
        } else {
          this.totalUsers.forEach((element: any) => {
            let a: any = Array.from(element.ufname)[0];
            if (a.toUpperCase() == letter) {
              this.allUsers.push(element);
            }
          });
        }
      }
    }
  }

  userSelect(event: any, data: any) {
    for (let i = 0; i < this.assignedUsers.length; i++) {
      delete this.assignedUsers[i].name;
      delete this.assignedUsers[i].checked;
    }
    this.assignedUsers = [];
    if (event.target.checked == true) {
      data.checked = true;
      data.name = 'A';
      this.assignedUsers.push(data);
    }
  }

  followerSelect(e: any, data: any) {
    if (e.target.checked == true) {
      data.checked = true;
      data.name = 'F';
      this.assignedFollowers.push(data);
    } else {
      const index = this.assignedFollowers.findIndex(
        (a: any) => a.uid === data.uid
      );
      //console.log(index);
      this.assignedFollowers[index].name = '';
      this.assignedFollowers[index].checked = false;
      if (
        this.assignedFollowers[index].name == '' &&
        this.assignedFollowers[index].checked == false
      ) {
        this.assignedFollowers.splice(index, 1);
      }
    }
    //console.log(this.assignedFollowers);
  }

  assignFollowers() {
    this.finalFollowersId = [];
    if (this.assignedFollowers.length != 0) {
      this.closeFollowers.nativeElement.click();

      this.mainAssignFollowers = this.assignedFollowers;
      //////console.log(this.mainAssignFollowers);
      for (let i = 0; i < this.mainAssignFollowers.length; i++) {
        this.finalFollowersId.push(this.mainAssignFollowers[i].uid);
      }
      this.finalFollowersId.toString();
    }
  }
  assignUsers() {
    if (this.assignedUsers.length != 0) {
      this.closebutton.nativeElement.click();
      this.mainAssignUsers = this.assignedUsers;
      this.assignString = this.mainAssignUsers[0].uid;
      // this.assignString.toString();
    }
  }
  closeActionModel() {
    // if (confirm('Are you Want To Close Action')) {
    //   //console.log('test if');


    // }
    this.actionClose.nativeElement.click();
  }

  open(item: any) {
    //////console.log(item);
    this.show = item;
    this.visible = true;
    const box = document.querySelector('#status') as HTMLElement | null;
    if (box != null) {
      box.style.display = 'none';
    }
  }
  open1(item: any) {
    //////console.log(item);
    this.selectedPriority = item;
    this.show1 = item.tpTitle;
    this.b = item.tpColorCode;
    // this.view = true;
  }
  viewstatus() {
    this.dsboard.statusview().subscribe((res: any) => {
      this.task = res;
      //console.log(this.task);
    });
  }
  viewpriority() {
    this.dsboard.priority().subscribe((res: any) => {
      this.priority = res;
      //////console.log(this.priority);
    });
  }
  saveAction() {
    this.appuserid = localStorage.getItem('UserId');
    if (
      this.mainAssignUsers.length == 0 ||
      this.selectedModule == '' ||
      this.actionName == '' ||
      this.description == '' ||
      this.show == '' ||
      this.selectedPriority == ''
    ) {
      if (this.mainAssignUsers.length == 0) {
        this.assignedRef = true;
      }
      if (this.selectedModule == '') {
        this.moduleRef = true;
      }
      if (this.actionName == '') {
        this.nameRef = true;
      }
      if (this.description == '') {
        this.descRef = true;
      }
      if (this.show == '') {
        this.statusRef = true;
      }
      if (this.selectedPriority == '') {
        this.priorityRef = true;
      }
      if (this.finalTagIds == '') { 
        this.tagRef = true; 
      }
    } else {
      this.dateObj = '';
      this.dateObj = new Date();
      let obj;
      obj = {
        tId: 0,
        tPrjId: this.selectedModule,
        tTitle: this.actionName,
        tDesc: this.description,
        tDueDate: this.dateTime1,
        tStatusId: this.show.tsId,
        tPriorityId: this.selectedPriority.tpId,
        tTagId: this.finalTagIds,
        tFileUpload: this.attachment.toString(),
        tAssignedbyUid: this.userId,
        tAssignedbyTs: this.dateObj,
        tClosedby: 0,
        tClosedbyTs: this.dateObj,
        tStatus: 'N',
        tAssignedUid: this.assignString.toString(),
        tFollowerUid: this.finalFollowersId.toString(),
        tCts: this.dateObj,
        tCuid: this.userId,
        tUpdatedUid: this.userId,
        tUts: this.dateObj,
        tStoreId: this.selectedStore.asId,
        tDealno: ''
      };
      console.log(obj);
      
      this.dsboard.createAction(obj).subscribe((data: any) => {
        console.log(data);
        this.actionClose.nativeElement.click();
        this.TasksData();
        this.dsboard.setbuttonData('');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Action Created ');
      });
    }
    // //console.log("assign",this.assignString);
    // //console.log("module",this.selectedModule);
    // //console.log("actionName",this.actionName);
    // //console.log("Description",this.description);
    // //console.log("statusId",this.show.tsId);
    // //console.log("selectedPriority",this.selectedPriority.tpId);
    // //console.log("finalTagIds",this.finalTagIds);
    // //console.log("finalFollowersId",this.finalFollowersId.toString());
  }
  ClickToHide() {
    this.priorityHide = false;

    this.showTags = false;

    this.StatusHide = false;
  }
  tagsShowHide() {
    if (this.editData.tStatus != "Y") {
      this.showTags = true;
    }
  }

  /*-----Tasks-----*/
  TasksData() {
    this.spinner.show();
    this.tasksArray = [];
    this.highPriority = [];
    this.lowPriority = [];
    this.mediumPriority = [];
    this.completedArray = [];
    this.filterQuery = '';

    if (this.projectId == '') {
      this.userId = localStorage.getItem('UserId');
      const ViaParamsData = '';
      const ViaAssignId = '(T_ASSIGNED_UID in' + '(' + this.userId + ')' + ' or ' + 'T_ASSIGNEDBY_UID in' + '(' + this.userId + ')'
        + ' or ' + "(T_FOLLOWER_UID like '" + this.userId + "[!,]%'" + ' or ' + "T_FOLLOWER_UID like '%[!,]"
        + this.userId + "' or " + "T_FOLLOWER_UID like '" + this.userId + "')) and T_STOREID in (" + this.storeid + ") and T_STATUS != 'D'";
      this.dsboard.getFilterData().subscribe((data) => {
        if (data.obj != '') {
          if (data == '') {
            this.filterQuery = ViaAssignId;
          } else {
            this.filterQuery = data;
          }
        } else {
          this.filterQuery = ViaAssignId;
        }
      });
    } else {
      const ViaParamsData = 'T_PRJ_ID in' + '(' + this.projectId + ')' + ' and ' + '(T_ASSIGNED_UID in' + '(' + this.userId + ')'
        + ' or ' + 'T_ASSIGNEDBY_UID in' + '(' + this.userId + ')' + ' or ' + "(T_FOLLOWER_UID like '" + this.userId + "[!,]%'"
        + ' or ' + "T_FOLLOWER_UID like '%[!,]" + this.userId + "' or " + "T_FOLLOWER_UID like '" + this.userId + "')) and T_STOREID in (" + this.storeid + ") and T_STATUS != 'D'";
      const ViaProjId = 'T_PRJ_ID in' + '(' + this.projectId + ')';
      this.dsboard.getFilterData().subscribe((data) => {
        if (data.obj != '') {
          if (data == '') {
            this.filterQuery = ViaParamsData;
          } else {
            // this.filterQuery = ViaProjId + ' and ' + data;
            this.filterQuery = data;
          }
        } else {
          this.filterQuery = ViaParamsData;
        }
      });
    }
    //console.log('the final Query : ', this.filterQuery);

    let Obj = {
      expression: this.filterQuery,
      sortby: 'T_DUE_DATE',
      rowno: 0,
    };

    this.gridFilter(Obj);
  }
  gridFilter(Obj: any) {
    this.spinner.show();
    this.dsboard.GetTasksByFilters(Obj).subscribe((data) => {
      this.tasksArray = data;
      //console.log(this.tasksArray);

      for (let x = 0; x < this.tasksArray.length; x++) {
        const overDue = new Date(this.tasksArray[x].tDueDate);
        const overd = Math.floor(
          (Date.UTC(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            this.currentDate.getDate()
          ) -
            Date.UTC(
              overDue.getFullYear(),
              overDue.getMonth(),
              overDue.getDate()
            )) /
          (1000 * 60 * 60 * 24)
        );
        if (this.tasksArray[x].tStatus != 'Y') {
          if (this.tasksArray[x].tPriorityName == 'LOW') {
            const followerNames = this.tasksArray[x].tFollowerNames.split(',');
            const followerPics =
              this.tasksArray[x].tFollowerprofilepic.split(',');
            const tagNames = this.tasksArray[x].tTagName.split(',');
            this.lowPriority.push({
              details: this.tasksArray[x],
              fnames: followerNames,
              fpics: followerPics,
              tagname: tagNames,
              overDue: overd,
              isExpand: true,
            });
          } else {
            if (this.tasksArray[x].tPriorityName == 'MEDIUM') {
              const followerNames =
                this.tasksArray[x].tFollowerNames.split(',');
              const followerPics =
                this.tasksArray[x].tFollowerprofilepic.split(',');
              const tagNames = this.tasksArray[x].tTagName.split(',');
              this.mediumPriority.push({
                details: this.tasksArray[x],
                fnames: followerNames,
                fpics: followerPics,
                tagname: tagNames,
                overDue: overd,
                isExpand: true,
              });
            } else {
              if (this.tasksArray[x].tPriorityName == 'HIGH') {
                const followerNames =
                  this.tasksArray[x].tFollowerNames.split(',');
                const followerPics =
                  this.tasksArray[x].tFollowerprofilepic.split(',');
                const tagNames = this.tasksArray[x].tTagName.split(',');
                this.highPriority.push({
                  details: this.tasksArray[x],
                  fnames: followerNames,
                  fpics: followerPics,
                  tagname: tagNames,
                  overDue: overd,
                  isExpand: true,
                });
              }
            }
          }
        } else {
          const followerNames = this.tasksArray[x].tFollowerNames.split(',');
          const followerPics =
            this.tasksArray[x].tFollowerprofilepic.split(',');
          const tagNames = this.tasksArray[x].tTagName.split(',');
          this.completedArray.push({
            details: this.tasksArray[x],
            fnames: followerNames,
            fpics: followerPics,
            tagname: tagNames,
            isExpand: true,
          });
        }
      }
      this.lowPlength = this.lowPriority.length;
      this.mediumPlength = this.mediumPriority.length;
      this.highPlength = this.highPriority.length;
      this.completedlength = this.completedArray.length;

      this.highPriority1 = this.highPriority;
      this.mediumPriority1 = this.mediumPriority;
      this.lowPriority1 = this.lowPriority;
      this.completedArray1 = this.completedArray;
      this.spinner.hide();
      //console.log(this.mediumPriority);

    });
  }

  typeOf(value: any) {
    if (typeof value == 'string') {
      const checkWord = value.split('T')[0];
      // if (checkWord == true) {
      const dateIs = checkWord;
      const year = dateIs.slice(2, 4);
      const month = dateIs.slice(5, 7);
      const day = dateIs.slice(8, 10);
      this.item = month + '.' + day + '.' + year;
      ////console.log(this.item);
    }
    return typeof value;
  }

  getProjectNameData() {
    this.pnameId = localStorage.getItem('pnameVid');
    //console.log(this.pnameId);

    if (this.pnameId == 'AllModules') {
      // alert("if");
      this.TasksData();
    } else {
      // alert('else');
      this.spinner.show();
      this.hdrService.projectinfo().subscribe((data) => {
        this.projectsData = data;

        for (let a = 0; a < this.projectsData.length; a++) {
          if (this.pnameId == this.projectsData[a].aopId) {
            const pname = this.projectsData[a].aopName;
            // alert(pname);
            this.highDummy = [];
            this.highPriority = this.highPriority1;

            for (let k = 0; k < this.highPriority.length; k++) {
              // alert('high');
              if (this.highPriority[k].details.tPrjName == pname) {
                this.highDummy.push(this.highPriority[k]);
              }
            }
            this.highPriority = this.highDummy;
            this.highPlength = this.highPriority.length;
            this.mediumDummy = [];
            this.mediumPriority = this.mediumPriority1;

            for (let l = 0; l < this.mediumPriority.length; l++) {
              // alert('medium');
              if (this.mediumPriority[l].details.tPrjName == pname) {
                this.mediumDummy.push(this.mediumPriority[l]);
              }
            }
            this.mediumPriority = this.mediumDummy;
            this.mediumPlength = this.mediumPriority.length;
            this.lowDummy = [];
            this.lowPriority = this.lowPriority1;

            for (let m = 0; m < this.lowPriority.length; m++) {
              // alert('low')
              if (this.lowPriority[m].details.tPrjName == pname) {
                this.lowDummy.push(this.lowPriority[m]);
              }
            }
            this.lowPriority = this.lowDummy;
            this.lowPlength = this.lowPriority.length;
            this.completedDummy = [];
            this.completedArray = this.completedArray1;

            for (let n = 0; n < this.completedArray.length; n++) {
              // alert('complete')
              if (this.completedArray[n].details.tPrjName == pname) {
                this.completedDummy.push(this.completedArray[n]);
              }
            }
            this.completedArray = this.completedDummy;
            this.completedlength = this.completedArray.length;
            this.spinner.hide();
          }
        }
      });
    }
  }

  tabopenlow() {
    this.panelIsOpenlow = !this.panelIsOpenlow;
    this.panellow = this.panelIsOpenlow;
    this.lowp.length = this.lowPriority.length;
    for (let n = 0; n < this.lowPriority.length; n++) {
      this.lowPriority[n].isExpand = true;
    }
  }
  tabopenhigh() {
    this.panelIsOpenhigh = !this.panelIsOpenhigh;
    this.panelhigh = this.panelIsOpenhigh;
    this.highp.length = this.highPriority.length;
    for (let n = 0; n < this.highPriority.length; n++) {
      this.highPriority[n].isExpand = true;
    }
  }
  tabopenmedium() {
    this.panelIsOpenmedium = !this.panelIsOpenmedium;
    this.panelmid = this.panelIsOpenmedium;
    this.midp.length = this.mediumPriority.length;
    //console.log(this.midp.length);
    for (let n = 0; n < this.mediumPriority.length; n++) {
      this.mediumPriority[n].isExpand = true;
    }
  }
  tabopencomplete() {
    this.panelIsOpencomplete = !this.panelIsOpencomplete;
    this.panelcomp = this.panelIsOpencomplete;
    this.complete.length = this.completedArray.length;
    for (let n = 0; n < this.completedArray.length; n++) {
      this.completedArray[n].isExpand = true;
    }
  }



  opendiv1(n: any, index: any) {
    if (n == 1) {
      this.highPriority[index].isExpand = !this.highPriority[index].isExpand;
      this.highp.push({ value: this.highPriority[index].isExpand, type: index });
      //console.log(this.midp);
      if (this.highp.length == this.highPriority.length) {
        this.panelhigh = false;
      }
    }
    else if (n == 2) {
      this.mediumPriority[index].isExpand = !this.mediumPriority[index].isExpand;
      this.midp.push({ value: this.mediumPriority[index].isExpand, type: index });
      //console.log(this.midp);
      if (this.midp.length == this.mediumPriority.length) {
        this.panelmid = false;
      }

    }
    else if (n == 3) {
      this.lowPriority[index].isExpand = !this.lowPriority[index].isExpand;
      this.lowp.push({ value: this.lowPriority[index].isExpand, type: index });
      //console.log(this.lowp);
      if (this.lowp.length == this.lowPriority.length) {
        this.panellow = false;
      }
    }
    else {
      this.completedArray[index].isExpand = !this.completedArray[index].isExpand;
      this.complete.push({ value: this.completedArray[index].isExpand, type: index });
      //console.log(this.complete);
      if (this.complete.length == this.completedArray.length) {
        this.panelcomp = false;
      }
    }
  }
  closediv1(n: any, index: any) {
    if (n == 1) {
      this.highPriority[index].isExpand = !this.highPriority[index].isExpand;
      const index1 = this.highp.findIndex((a: any) => a == index);
      this.highp.splice(index1, 1);
      //console.log(this.highp)
      if (this.highp.length == 0)
        this.panelhigh = true;
    }
    else if (n == 2) {
      this.mediumPriority[index].isExpand = !this.mediumPriority[index].isExpand;
      const index1 = this.midp.findIndex((a: any) => a == index);
      this.midp.splice(index1, 1);
      //console.log(this.midp)
      if (this.midp.length == 0)
        this.panelmid = true;
    }
    else if (n == 3) {
      this.lowPriority[index].isExpand = !this.lowPriority[index].isExpand;
      const index1 = this.lowp.findIndex((a: any) => a == index);
      this.lowp.splice(index1, 1);
      //console.log(this.lowp)
      if (this.lowp.length == 0)
        this.panellow = true;
    }
    else {
      this.completedArray[index].isExpand = !this.completedArray[index].isExpand;
      const index1 = this.complete.findIndex((a: any) => a == index);
      this.complete.splice(index1, 1);
      //console.log(this.complete)
      if (this.complete.length == 0)
        this.panelcomp = true;
    }
  }

  //Delete

  deleteTask(item: any) {
    //console.log(item);
    alertify.confirm('Confirmation...!', 'Do you want to delete action ?.', () => {
      this.dsboard.gettasksbyid(item.details.tId).subscribe((res: any) => {
        this.data = res[0];
        //console.log('abc', this.data);
        if (this.data.tStatus != 'D') {
          const obj = {
            tId: this.data.tId,
            tPrjId: this.data.tPrjId,
            tTitle: this.data.tTitle,
            tDesc: this.data.tTitle,
            tDueDate: this.data.tDueDate,
            tStatusId: this.data.tStatusId,
            tPriorityId: this.data.tPriorityId,
            tTagId: this.data.tTagId,
            tFileUpload: this.data.tFileUpload,
            tAssignedbyUid: this.data.tAssignedbyUid,
            tAssignedbyTs: this.data.tAssignedbyTs,
            tClosedby: this.data.tClosedby,
            tClosedbyTs: this.data.tClosedbyTs,
            tStatus: 'D',
            tAssignedUid: this.data.tAssignedUid,
            tFollowerUid: this.data.tFollowerUid,
            tCts: this.data.tCts,
            tCuid: this.data.tCuid,
            tUpdatedUid: this.data.tUpdatedUid,
            tUts: this.data.tUts,
            tStoreId: this.data.tStoreId,
            tDealno: this.data.tDealno
          };
          //console.log('status', obj);
          this.dsboard.tasksbyid(obj, this.data.tId).subscribe((res: any) => {
            console.log(res);
            this.TasksData();
            if (res.tDealno != '' && res.tDealno != null) {
              let obj1 = {
                "dealno": res.tDealno,
                "coraAcctId": res.tStoreId,
                "taskStatus": "N"
              }
              this.dsboard.updateTaskStatus(obj1).subscribe((data: any) => {
                console.log(data);
                if (data == 1) {
                }
              });


            }

          });
        }
      });
    }, function () { })
      .set({ transition: 'zoom', 'movable': false, 'closable': false, 'labels': { ok: 'Yes', cancel: 'No' } });
  }
  markcompleted(item: any) {
    let date = new Date();
    //console.log(item);
    alertify.confirm('Confirmation...!', 'Do you want to mark as complete ?.', () => {
      this.dsboard.gettasksbyid(item.details.tId).subscribe((res: any) => {
        this.data = res[0];
        //console.log('abc', this.data);
        if (this.data.tStatus != 'Y') {
          const obj = {
            tId: this.data.tId,
            tPrjId: this.data.tPrjId,
            tTitle: this.data.tTitle,
            tDesc: this.data.tTitle,
            tDueDate: this.data.tDueDate,
            tStatusId: this.data.tStatusId,
            tPriorityId: this.data.tPriorityId,
            tTagId: this.data.tTagId,
            tFileUpload: this.data.tFileUpload,
            tAssignedbyUid: this.data.tAssignedbyUid,
            tAssignedbyTs: this.data.tAssignedbyTs,
            tClosedby: this.userId,
            tClosedbyTs: date,
            tStatus: 'Y',
            tAssignedUid: this.data.tAssignedUid,
            tFollowerUid: this.data.tFollowerUid,
            tCts: this.data.tCts,
            tCuid: this.data.tCuid,
            tUpdatedUid: this.userId,
            tUts: date,
            tStoreId: this.data.tStoreId,
            tDealno: this.data.tDealno
          };
          //console.log('status', obj);
          this.dsboard.tasksbyid(obj, this.data.tId).subscribe((res: any) => {
            this.TasksData();
            this.dsboard.setbuttonData('');
          });
        }
      });
    }, function () { })
      .set({ transition: 'zoom', 'movable': false, 'closable': false, 'labels': { ok: 'Yes', cancel: 'No' } });
  }

  // ---------------------------------------------update method-------------------------------------------------//
  editTask(item: any) {
    this.appuserid = localStorage.getItem('UserId');
    this.selectedStore = '';
    this.addfile = false;
    this.finalFollowersId = [];
    this.editfile = true;
    this.editValue = item;
    this.add = false;
    this.edit = true;
    this.mainAssignUsers = [];
    this.assignedUsers = [];
    this.selectTagList = [];
    this.mainAssignFollowers = [];
    this.assignedFollowers = [];
    //console.log(item.tId);
    this.dsboard.gettasksbyid(item.tId).subscribe((data: any) => {
      //console.log(data);
      this.editData = data[0];
      //console.log(this.editData);
      this.allStores.forEach((data: any) => {
        if (data.asId == this.editData.tStoreId) {
          this.selectedStore = data;
          this.getUsersByStore(this.selectedStore);
        }
      });

      this.task.forEach((item: any) => {
        if (item.tsId == this.editData.tStatusId) {
          //console.log(item);
          this.show = item;
          this.visible = true;
        }
      });
      this.priority.forEach((item: any) => {
        if (item.tpId == this.editData.tPriorityId) {
          this.selectedPriority = item;
          this.show1 = item.tpTitle;
          this.b = item.tpColorCode;
          this.view = true;
        }
      });
      this.selectedModule = this.editData.tPrjId;
      this.actionName = this.editData.tTitle;
      this.description = this.editData.tDesc;
      this.dateTime1 = this.editData.tDueDate;
      this.attachment = [];
      this.attachment = this.editData.tFileUpload.split(',');
      //console.log(this.attachment);
      this.viewpath = [];
      for (let i = 0; i < this.attachment.length; i++) {
        var pattern = /\\/;
        let pat = /~/;
        let ls = String(this.attachment).split(pattern).pop();
        this.lastpart1 = String(ls).split(pat).pop();
        this.ext1 = this.lastpart1.split('.').pop();
        this.viewpath.push({ name: this.lastpart1, type: this.ext1, link: this.attachment });
        //console.log('edit', this.viewpath);

      }
      const tagIds = this.editData.tTagId.split(',');
      //console.log(tagIds);

      tagIds.map((ob: any) => {
        this.tagsData.forEach((a: any) => {
          if (a.tagId == ob) {
            this.SelectTag(a);
          }
        });
        //console.log(this.selectTagList);
      });
    });
  }
  updateAction() {
    console.log(this.editData);

    if (
      this.mainAssignUsers.length == 0 ||
      this.selectedModule == '' ||
      this.actionName == '' ||
      this.description == '' ||
      this.show == '' ||
      this.selectedPriority == ''
    ) {
      if (this.mainAssignUsers.length == 0) {
        this.assignedRef = true;
      }
      if (this.selectedModule == '') {
        this.moduleRef = true;
      }
      if (this.actionName == '') {
        this.nameRef = true;
      }
      if (this.description == '') {
        this.descRef = true;
      }
      if (this.show == '') {
        this.statusRef = true;
      }
      if (this.selectedPriority == '') {
        this.priorityRef = true;
      }
    } else {
      this.dateObj = '';
      this.dateObj = new Date();
      let obj;
      obj = {
        tId: this.editData.tId,
        tPrjId: this.selectedModule,
        tTitle: this.actionName,
        tDesc: this.description,
        tDueDate: this.dateTime1,
        tStatusId: this.show.tsId,
        tPriorityId: this.selectedPriority.tpId,
        tTagId: this.finalTagIds,
        tFileUpload: this.attachment.toString(),
        tAssignedbyUid: this.editData.tAssignedbyUid,
        tAssignedbyTs: this.editData.tAssignedbyTs,
        tClosedby: 0,
        tClosedbyTs: this.dateObj,
        tStatus: this.editData.tStatus,
        tAssignedUid: this.editData.tAssignedUid.toString(),
        tFollowerUid: this.finalFollowersId.toString(),
        tCts: this.editData.tCts,
        tCuid: this.editData.tCuid,
        tUpdatedUid: this.userId,
        tUts: this.dateObj,
        tStoreId: this.editData.tStoreId,
        tDealno: this.editData.tDealno
      };
      console.log(obj);
      this.dsboard
        .updateAction(obj, this.editData.tId)
        .subscribe((data: any) => {
          console.log(data);
          this.actionClose.nativeElement.click();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Action Updated ');
          this.TasksData();
          this.dsboard.setbuttonData('');
        });
    }
  }
  addAction() {
    this.editData = '';
    this.priorityHide = false;
    this.StatusHide = false;
    this.showTags = false;
    this.allUsers = [];
    this.addfile = true;
    this.editfile = false;
    //console.log('hai');
    this.add = true;
    this.edit = false;
    this.mainAssignUsers = [];
    this.assignedUsers = [];
    this.mainAssignFollowers = [];
    this.assignedFollowers = [];
    this.assignString = '';
    this.actionName = '';
    this.description = '';
    this.finalTagIds = '';
    this.finalFollowersId = [];
    this.show = this.task[1];
    this.visible = false;
    this.view = false;
    this.show1 = this.priority[1].tpTitle;
    this.b = this.priority[1].tpColorCode;
    this.selectTagList = [];
    this.lastpart = '';
    this.filePath = '';
    this.selectedStore = '';
    // this.getUsersByStore(this.selectedStore.asDealername);
    this.assignedRef = false;
    this.moduleRef = false;
    this.nameRef = false;
    this.descRef = false;
    this.statusRef = false;
    this.priorityRef = false;
    this.dateTime1 = '';
    this.viewpath = [];
    this.attachment = [];
    this.priorityHide = false;
    this.selectedPriority = this.priority[1];
    this.StatusHide = false;
    this.showTags = false;
    if (this.projectId == '') {
      this.selectedModule = '';
    }
  }
  // fileChangeEvent() {
  //   window.open(this.image, '_blank');
  //   this.closebutton.nativeElement.click();
  // }
  openMenu() {
    const box = document.querySelector('#status') as HTMLElement | null;
    if (box != null) {
      box.style.display = 'block';
    }
  }
  public showTags: boolean = false;
  TagsClick() {
    if (this.editData.tStatus != "Y") {
      this.removedata();
      this.showTags = !this.showTags;
      this.priorityHide = false;
      this.StatusHide = false;
    }
  }
  public StatusHide = false;
  StatusClick() {
    if (this.editData.tStatus != "Y") {
      this.StatusHide = !this.StatusHide;
      this.priorityHide = false;
      this.showTags = false;
    }
  }
  public priorityHide = false;
  PriorityClick() {
    if (this.editData.tStatus != "Y") {
      this.priorityHide = !this.priorityHide;
      this.showTags = false;
      this.StatusHide = false;
    }

  }
}
