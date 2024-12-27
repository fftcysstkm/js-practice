export class UserModel {
  static BASE_URL = "http://localhost:8080/users";

  static async fetchUsers() {
    // 取得
    const URL = this.BASE_URL + "/list";
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("ユーザー一覧の取得に失敗しました");
    }
    const users = await response.json();
    return users;
  }
}
