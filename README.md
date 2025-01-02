# やったこと

- DOM 操作**Vanilla JavaScript でのみ実装**

  - 目的の DOM 取得
  - 新たな DOM を生成、目的の位置に挿入 ☑
  - 目的の位置の DOM を削除・改変 ☑

- 非同期処理
  - データ取得 ☑
  - データ送信(form)
    - 登録 ☑
    - 更新 ☑
    - 削除 ☑
    - 処理成功後のリロード ☑
- イベント
  - ウィンドウ読みこみ時 ☑
  - ボタン押下時 ☑
- テーブル表示 ☑
- モーダル表示 ☑
- バリデーション ☑

# Knockout.js メモ

以下の設定により、値の変化に応じてビューが変化する。

- Viewmodel に変更監視させたいプロパティを記述
  - `observable`や`observableArray`として定義
- html 側の要素の`data-bind`属性に、ViewModel 内の変数や関数を指定する。

## class 構文を ViewModel の定義に使用する際の注意

- ES2015 以降の class 構文を使用して ViewModel を定義する場合、**メソッド内の this が ViewModel 自身を指すことが保証される書き方**をしないといけない。
  - 例えば...
    - 関数はコンストラクタ内でアロー関数で書く。（アロー関数は this を持たないので関数外のスコープの this を自動で指す）。
    - コンストラクタ内で self プロパティに this を代入して、インスタンス関数内では this ではなく self を使う
    - bind を使って this を ViewModel 自身に束縛する
- 公式ドキュメントのレガシーなコンストラクタ関数で書けば、this は必ず ViewModel インスタンスを指す。

## `click`バインディングに指定する関数の書き方で躓いた点

- foreach でテーブルを描画する際、`data-bind="click:$root.selectUser($data)"`のように、関数の括弧ありで記載すると、DOM 生成時に関数が実行されてしまう。
  - `data-bind="click:$root.selectUser"`か`data-bind="click:()=>$root.selectUser($data)"`などの関数の参照を渡すようにする必要がある。前者は Knockout が user インスタンスを指定した関数に渡してくれるとのこと。
- テーブル内のボタンなど、繰り返しで生成したイベントハンドラ（イベントを処理する処理）内では this が繰り返しのインスタンスになる模様。例えばユーザー一覧では、クリックしたユーザーインスタンス自身で ViewModel にならない。上述の **this が ViewModel 自身を指すような実装**が必要。

## `visible` バインディングの指定の仕方で躓いた点

- 表示フラグの**反転**を評価するとき、observable を()付きで取得しないと正しく動作しなかった。これは、observable 自体を参照してしまい、常に observable インスタンスがあるので true と評価されるためとのこと。
- 反転をしない場合は、knockout.js が自動で()を付けて評価してくれるらしい。反転の場合も自動でつけてくれよ。。。

```html
<!-- ダメなパターン -->
<button
  class="register-button"
  id="register-button"
  data-bind="visible: !selectedUser"
>
  登録
</button>

<!-- OKなパターン -->
<button
  class="register-button"
  id="register-button"
  data-bind="visible: !selectedUser()"
>
  登録
</button>
```
