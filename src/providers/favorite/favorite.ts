import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Dish } from "../../shared/dish";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { DishProvider } from "../dish/dish";
import { Storage } from "@ionic/storage";
import { User } from "../../shared/user";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

/*/
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;
  user: User = { username: "", password: "" };
  favorite: Text;
  constructor(
    public http: Http,
    private dishservice: DishProvider,
    private storage: Storage
  ) {
    console.log("Hello FavoriteProvider Provider");
    this.favorites = [];
    storage.get("favorites").then((favorites) => {
      if (favorites) {
        this.favorites = favorites;
      } else {
        console.log("null");
      }
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set("favorites", this.favorites);
    }
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some((el) => el === id);
  }
  getFavorites(): Observable<Dish[]> {
    return this.dishservice
      .getDishes()
      .map((dishes) =>
        dishes.filter((dish) => this.favorites.some((el) => el === dish.id))
      );
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set("favorites", this.favorites);
      return this.getFavorites();
    } else {
      console.log("Deleting non-existant favorite", id);
      return Observable.throw("Deleting non-existant favorite" + id);
    }
  }
}
