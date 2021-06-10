import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SignupInfo } from '../../auth/signup-info';
import { Trainer } from '../../class/trainer';
import { TrainerService } from '../../service/trainer.service';
import Swal from 'sweetalert2';


@Component({

  templateUrl: './add-trainer.component.html',

})
export class AddTrainerComponent implements OnInit {

  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  trainer: Trainer = new Trainer();
  trainerQualification: string;
  trainerQualifications: string[] = [];
  trainerExists: boolean = false;
  Existingtrainername: string;
  fieldTextType: boolean;

  @ViewChild('qualification') qualification;

  constructor(private authService: AuthService, private router: Router, private trainerService: TrainerService) { }

  ngOnInit(): void {
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  handleClear() {
    // clearing the value
    this.trainerQualifications.push(this.trainerQualification);
    console.log(this.trainerQualifications);
    this.qualification.nativeElement.value = ' ';
  }

  onSubmit() {

    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.trainer.name = this.signupInfo.name;
    this.trainer.qualifications = this.trainerQualifications;
    this.trainer.type = this.form.type;



    this.trainerService.getTrainerbyUserName(this.signupInfo.username).subscribe(data => {
      if (data != null) {
        //alert('Trainer Exists By the Name ' + data.name);
        Swal.fire('Exists', 'Trainer Already Exists', 'warning');
        this.trainerExists = true;
      }
    }, error => console.error(error));

    if (this.trainerExists == true) {
      Swal.fire('Exists', 'Trainer Already Exists', 'warning');
    } else {

      this.trainerService.addTrainer(this.trainer).subscribe(data => {
        console.log(data);
        Swal.fire('Added', 'Trainer Added Successfully', 'success');
        this.router.navigate(['manager/trainer-list']).then(() => {
          //window.location.reload();
        });
      }, error => console.error(error));

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          Swal.fire('Exists', 'Trainer Already Exists', 'warning');
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;

        }
      );





    }




  }

  addTrainerQualification() {
    this.trainerQualifications.push(this.trainerQualification);
    console.log(this.trainerQualifications);

  }
}
