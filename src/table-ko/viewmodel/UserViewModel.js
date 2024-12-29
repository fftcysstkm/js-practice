import ko from "knockout";
import "../../style-copy.css";
import { UserModel } from "../model/UserModel";

class UserViewModel {
  constructor() {
    // ユーザー一覧
    this.users = ko.observableArray([]);
    // 「詳細」ボタンで選択したユーザー
    this.selectedUser = ko.observable(null);

    /////////////////////////////////////////////////////////////
    // thisが指す対象をViewModel自身となることを保証するため、
    // メソッドはコンストラクタ内のアロー関数とする。
    // アロー関数内のthisは、関数外側のスコープのthisを継承する。つまり、コンストラクタ内のthisであるインスタンス自身
    // コンストラクタ内の関数定義にしないと、インスタンスでメソッドが共有されてしまうため。
    /////////////////////////////////////////////////////////////

    // ユーザー一覧取得
    this.loadUsers = async () => {
      try {
        // 取得
        const users = await UserModel.fetchUsers();
        this.users(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        confirm("ユーザー取得に失敗");
      }
    };

    //　ユーザー選択
    this.selectUser = (user) => {
      // モーダル表示
      const modal = document.querySelector(".modal");
      if (modal) {
        modal.classList.add("show");
      }
      this.selectedUser(user);
    };

    // 画面読み込み時にデータ取得
    this.loadUsers();
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
