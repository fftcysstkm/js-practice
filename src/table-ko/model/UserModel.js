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

  // ユーザー登録
  static async registerUser(newUser) {
    const URL = this.BASE_URL + "/create";
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("ユーザー登録に失敗しました");
    }
    return response;
  }

  // ユーザー更新
  static async updateUser(user) {
    const URL = this.BASE_URL + `/update/${user.id}`;
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("ユーザー更新に失敗しました");
    }
    return response;
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
