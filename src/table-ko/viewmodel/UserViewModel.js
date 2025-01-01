import ko from "knockout";
import "../../style-copy.css";
import { UserModel } from "../model/UserModel";

class UserViewModel {
  constructor() {
    // ユーザー一覧
    this.users = ko.observableArray([]);
    // 「詳細」ボタンで選択したユーザー
    this.selectedUser = ko.observable(null);
    // モーダル表示、非表示切り替えフラグ
    this.isModalVisible = ko.observable(false);

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

    //　ユーザー削除
    this.deleteUser = async () => {
      try {
        const response = await UserModel.deleteUser(this.selectedUser().id);
        if (response.ok) {
          // ユーザー選択解除、モーダル閉じる
          this.deSelectUser();
          // リロード
          await this.loadUsers();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        confirm("ユーザー削除に失敗");
      }
    };

    // 新規登録モーダル表示
    this.registerUser = () => {
      this.selectedUser(null);
      this.isModalVisible(true);
    };

    //　ユーザー選択（モーダル表示）
    this.selectUser = (user) => {
      // モーダルに選択ユーザー表示
      this.selectedUser(user);
      this.isModalVisible(true);
    };

    // ユーザー選択解除（モーダル非表示）
    this.deSelectUser = () => {
      // モーダル非表示
      this.selectedUser(null);
      this.isModalVisible(false);
    };

    /////////////////////////////////////////////////////////////
    // 以下、初期化処理
    /////////////////////////////////////////////////////////////
    // 画面読み込み時、データ取得
    this.loadUsers();
  }
}

ko.applyBindings(new UserViewModel());
