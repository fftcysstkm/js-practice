import "./style.css";

const modal = document.getElementById("modal");
const modalDetail = document.getElementById("modal-details");

async function fetchData(params) {
  try {
    // 取得
    const response = await fetch("http://localhost:8080/users/list");
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

        // 中身表示
        document.getElementById("user-id").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("phone").value = user.phone;
        document.getElementById("email").value = user.email;

        // モーダル内更新ボタン
        document
          .getElementById("update-button")
          .addEventListener("click", () => {
            const updatedUser = {
              id: document.getElementById("user-id").value,
              name: document.getElementById("name").value,
              phone: document.getElementById("phone").value,
              email: document.getElementById("email").value,
            };

            fetch(`http://localhost:8080/users/update/${updatedUser.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedUser),
            })
              .then((response) => {
                if (response.ok) {
                  modal.style.display = "none";
                  // リロード
                  fetchData();
                  return;
                }
                throw new Error("ユーザー更新失敗");
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });

        // モーダル内削除ボタン
        document
          .getElementById("delete-button")
          .addEventListener("click", () => {
            const deleteId = document.getElementById("user-id").value;
            fetch(`http://localhost:8080/users/delete/${deleteId}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  modal.style.display = "none";
                  // リロード
                  fetchData();
                  return;
                }
                throw new Error("ユーザー削除失敗");
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
      });
    });
  } catch (error) {}
}

// モーダル閉じる
document.querySelector(".close-button").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("DOMContentLoaded", fetchData);
