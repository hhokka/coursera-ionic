import { Component, Inject } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController,
} from "ionic-angular";
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import { FavoriteProvider } from "../../providers/favorite/favorite";
import { CommentPage } from "../../pages/comment/comment";
import { Nav, Platform, ModalController } from "ionic-angular";
/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-dishdetail",
  templateUrl: "dishdetail.html",
})
export class DishdetailPage {
  favorite: boolean;
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject("BaseURL") private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this.dish = navParams.get("dish");
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach((comment) => (total += comment.rating));
    this.avgstars = (total / this.numcomments).toFixed(2);
  }
  addToFavorites() {
    console.log("Adding to Favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl
      .create({
        message: "Dish " + this.dish.id + " added as favorite successfully",
        position: "middle",
        duration: 3000,
      })
      .present();
  }
  addComment() {
    console.log("addComment triggered");
    this.openCommentModal();
  }
  openCommentModal() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad DishdetailPage");
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Actions",
      buttons: [
        {
          text: "Add to Favorites",
          role: "add",
          handler: () => {
            this.addToFavorites();
            console.log("Add to Favorites clicked");
          },
        },
        {
          text: "Add Comment",
          role: "add",
          handler: () => {
            this.addComment();
            console.log("Add Comment clicked");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    actionSheet.present();
  }
}
