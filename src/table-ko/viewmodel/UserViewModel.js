import ko from "knockout";
import "../../style.css";
import { UserModel } from "../model/UserModel";

class UserViewModel {
  constructor() {
    this.users = ko.observableArray([]);

    // 画面読み込み時にデータ取得
    this.loadUsers();
  }

  // データ取得処理
  async loadUsers() {
    try {
      // 取得
      const users = await UserModel.fetchUsers();
      this.users(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      confirm("ユーザー取得に失敗");
    }
  }
}

ko.applyBindings(new UserViewModel());
