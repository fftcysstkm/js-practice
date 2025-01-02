import ko from "knockout";
import "../../style-copy.css";
import { UserModel } from "../model/UserModel";

class UserViewModel {
  constructor() {
    // ユーザー一覧
    this.users = ko.observableArray([]);
    // 「詳細」ボタンで選択したユーザー
    this.selectedUser = ko.observable({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    // ユーザー詳細モーダル表示モード（新規:trueか編集:false）
    this.isModalCreateMode = ko.observable(true);
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

    // ユーザー登録
    this.registerUser = async () => {
      try {
        const newUser = {
          name: this.selectedUser() ? this.selectedUser().name : "",
          phone: this.selectedUser() ? this.selectedUser().phone : "",
          email: this.selectedUser() ? this.selectedUser().email : "",
        };
        const response = await UserModel.registerUser(newUser);
        if (response.ok) {
          await this.loadUsers();
          this.selectedUser(UserViewModel.getInitUser());
          this.isModalVisible(false);
          return;
        }
      } catch (error) {
        console.error("Error creating users:", error);
        confirm("ユーザー登録に失敗");
      }
    };

    // ユーザー更新
    this.updateUser = async () => {
      try {
        const updateUser = {
          id: this.selectedUser() ? this.selectedUser().id : "",
          name: this.selectedUser() ? this.selectedUser().name : "",
          phone: this.selectedUser() ? this.selectedUser().phone : "",
          email: this.selectedUser() ? this.selectedUser().email : "",
        };
        const response = await UserModel.updateUser(updateUser);
        console.log(response);
        if (response.ok) {
          await this.loadUsers();
          this.selectedUser(UserViewModel.getInitUser());
          this.isModalVisible(false);
          return;
        }
      } catch (error) {
        console.error("Error updating users:", error);
        confirm("ユーザー更新に失敗");
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
    this.registerUserModal = () => {
      this.selectedUser(UserViewModel.getInitUser());
      this.isModalCreateMode(true);
      this.isModalVisible(true);
    };

    //　ユーザー選択（モーダル表示）
    this.selectUser = (user) => {
      // モーダルに選択ユーザー表示
      this.selectedUser(user);
      this.isModalCreateMode(false);
      this.isModalVisible(true);
    };

    // ユーザー選択解除（モーダル非表示）
    this.deSelectUser = () => {
      // モーダル非表示
      this.selectedUser(UserViewModel.getInitUser());
      this.isModalCreateMode(true);
      this.isModalVisible(false);
    };

    /////////////////////////////////////////////////////////////
    // 以下、初期化処理
    /////////////////////////////////////////////////////////////
    // 画面読み込み時、データ取得
    this.loadUsers();
  }

  static getInitUser() {
    return { id: "", name: "", phone: "", email: "" };
  }
}

ko.applyBindings(new UserViewModel());
