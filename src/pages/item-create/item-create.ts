import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  employee: { firstName: string, lastName: string, address:string, city: string, zip:string,username:string,password:string} = {
    firstName: '',
    lastName: '',
    address:'',
    city: '',
    zip:'',
    username:'',
    password:''
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public items: Items) {
    this.form = formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      address: ['',Validators.required],
      city:['',Validators.required],
      zip:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save(){
    this.employee.firstName=this.form.value.firstName
    this.employee.lastName = this.form.value.lastName
    this.employee.address = this.form.value.address
    this.employee.city = this.form.value.city
    this.employee.zip = this.form.value.zip
    this.employee.username = this.form.value.username
    this.employee.password = this.form.value.password
    this.items.add(this.employee)
    console.log("In Create item===============================>**SAVE**")
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {

  }

 /* getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }*/

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
