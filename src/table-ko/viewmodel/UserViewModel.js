import ko from "knockout";
import "../../style-copy.css";
import { UserModel } from "../model/UserModel";

class UserViewModel {
  constructor() {
    // ユーザー一覧
    this.users = ko.observableArray([]);
    // 「詳細」ボタンで選択したユーザー
    this.selectedUser = ko.observable(null);

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

  // ユーザー選択
  selectUser(user) {
    // モーダル表示
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.add("show");
    }
    this.selectedUser(user);
  }

  // ユーザー選択解除
  deSelectUser() {
    // モーダル非表示
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("show");
    }
    this.selectedUser(null);
  }
}

ko.applyBindings(new UserViewModel());
