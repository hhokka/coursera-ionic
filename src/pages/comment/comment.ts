import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-comment",
  templateUrl: "comment.html",
})
export class CommentPage {
  commentEntry: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.commentEntry = this.formBuilder.group({
      rating: 3,
      author: false,
      comment: ["", Validators.required],
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentPage");
  }
  onSubmit() {
    console.log(this.commentEntry.value);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
