- DOM 操作

  - 目的の DOM 取得

  ```JavaScript
  const tbody = document.getElementById("user-tbody");
  document.querySelector(".close-button");

  ```

  - 新たな DOM を生成、目的の位置に挿入 ☑

  ```JavaScript
  const row = document.createElement("tr");
  row.innerHTML = `
                 <td>${user.id}</td>
                 <td>${user.name}</td>
                 <td>${user.phone}</td>
                 <td>${user.email}</td>
                 <td><button class="detail-button">詳細</button</td>
             `;

  ```

  - 目的の位置の DOM を削除・改変 ☑

- 非同期処理
  - データ取得 ☑
  - データ送信(form)
    - 登録 ☑
    - 更新 ☑
    - 削除 ☑
    - 処理成功後のリロード ☑
      - リロードしても画面が変わらない ⇒ 一覧表示時は毎回一度テーブルをクリアにすること。
- イベント
  - ウィンドウ読みこみ時 ☑
  - ボタン押下時 ☑
- テーブル表示 ☑
- モーダル表示 ☑
- バリデーション ☑
