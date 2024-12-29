export class UserModel {
  static BASE_URL = "http://localhost:8080/users";

  // ユーザー取得処理
  static async fetchUsers() {
    const URL = this.BASE_URL + "/list";
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("ユーザー一覧の取得に失敗しました");
    }
    const users = await response.json();
    return users;
  }

  // ユーザー削除処理
  static async deleteUser(id) {
    const URL = this.BASE_URL + `/delete/${id}`;
    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("ユーザー一覧の取得に失敗しました");
    }

    return response;
  }
}
