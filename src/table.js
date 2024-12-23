import "./style.css";

const modal = document.getElementById("modal");
const modalDetail = document.getElementById("modal-details");

// 登録モーダル表示、登録処理
document.getElementById("register-button-top").addEventListener("click", () => {
  modal.style.display = "flex";
  const registerButton = document.getElementById("register-button");
  registerButton.hidden = false;
  document.getElementById("delete-button").hidden = true;
  document.getElementById("update-button").hidden = true;

  registerButton.addEventListener("click", async () => {
    const newUser = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
    };

    try {
      const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        modal.style.display = "none";
        // リロード
        await fetchUsers();
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      confirm("ユーザー登録に失敗");
    }
  });
});

// データ取得処理
async function fetchUsers() {
  try {
    // 取得
    const URL = "http://localhost:8080/users/list";
    const response = await fetch(URL);
    const users = await response.json();
    // console.log(users)

    // テーブル生成
    const tbody = document.getElementById("user-tbody");
    tbody.innerHTML = ""; // テーブルの内容をクリア

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td><button class="detail-button">詳細</button</td>
            `;
      tbody.appendChild(row);

      // 詳細モーダル表示
      row.querySelector(".detail-button").addEventListener("click", () => {
        modal.style.display = "flex";
        document.getElementById("register-button").hidden = true;
        document.getElementById("delete-button").hidden = false;
        document.getElementById("update-button").hidden = false;

        // 中身表示
        document.getElementById("user-id").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("phone").value = user.phone;
        document.getElementById("email").value = user.email;

        // モーダル内更新ボタン
        document
          .getElementById("update-button")
          .addEventListener("click", async () => {
            // バリデーション
            if (!validateFields()) return;

            const updatedUser = {
              id: document.getElementById("user-id").value,
              name: document.getElementById("name").value,
              phone: document.getElementById("phone").value,
              email: document.getElementById("email").value,
            };

            try {
              const response = await fetch(
                `http://localhost:8080/users/update/${updatedUser.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedUser),
                }
              );

              if (response.ok) {
                modal.style.display = "none";
                // リロード
                fetchUsers();
                return;
              }
              throw new Error("ユーザー更新失敗");
            } catch (error) {
              console.error("Error:", error);
            }
          });

        // モーダル内削除ボタン
        document
          .getElementById("delete-button")
          .addEventListener("click", async () => {
            const deleteId = document.getElementById("user-id").value;
            try {
              const response = await fetch(
                `http://localhost:8080/users/delete/${deleteId}`,
                {
                  method: "DELETE",
                }
              );

              if (response.ok) {
                modal.style.display = "none";
                // リロード
                fetchUsers();
                return;
              }
              throw new Error("ユーザー削除失敗");
            } catch (error) {
              console.error("Error:", error);
            }
          });
      });
    });
  } catch (error) {
    confirm("ユーザー取得に失敗");
  }
}

// モーダル閉じる
document.querySelector(".close-button").addEventListener("click", () => {
  modal.style.display = "none";
});

// フィールドのバリデーション関数
function validateFields() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    alert("すべてのフィールドを入力してください。");
    return false;
  }
  return true;
}

window.addEventListener("DOMContentLoaded", fetchUsers);
