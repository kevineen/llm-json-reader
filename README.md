# LLM-Json-Reader

LLM-Json-Readerは、JSONおよびJSONL形式のデータセットを閲覧用です。<br />
大規模言語モデル（LLM）の開発に使用されるデータセット視覚化のためのアプリです。

開発にあたり、参考にさせて頂いたサイト様<br />
[Next.js 14 + TypeScript + Tailwind + ESLint + Prettier 環境構築手順](https://zenn.dev/siakas/articles/05481bdefacd13)

#### 読込データセットの対応状況

- [x] llm-jp-eval
- [ ] Mt-bench

##### llm-jp-eval
複数のデータセットを横断して日本語の大規模言語モデルを自動評価するもの。
【チューニング共通フォーマット】を閲覧できます。<br />
[llm-jp-eval (github)](https://github.com/llm-jp/llm-jp-eval/tree/main)<br />
上記リンク先のダウンロード方法でダウンロードしたものを、データ読込として選択ください。<br />
例: llm-jp-eval/dataset_dir/(version)/tuning/dev/train/chabsa.json

#### フォーマット例
```
[
    {
        "ID": "jemhopqa-0",
        "instruction": "質問を入力とし、回答を出力してください。回答の他には何も含めないことを厳守してください。",
        "input": "質問：クイーンとビートルズはどちらもイギリス出身のバンドですか？",
        "output": "YES",
        "text": "<INSTRUCTION|LLM-jp>質問を入力とし、回答を出力してください。回答の他には何も含めないことを厳守してく>ださい。\n<INPUT|LLM-jp>質問：クイーンとビートルズはどちらもイギリス出身のバンドですか？\n<OUTPUT|LLM-jp>YES"
    },
    {
        "ID": "jemhopqa-1",
        "instruction": "質問を入力とし、回答を出力してください。回答の他には何も含めないことを厳守してください。",
        "input": "質問：東京都中央区と中野区、2005年時点での昼間人口が多いのは中央区ですか？",
        "output": "YES",
        "text": "<INSTRUCTION|LLM-jp>質問を入力とし、回答を出力してください。回答の他には何も含めないことを厳守してく>ださい。\n<INPUT|LLM-jp>質問：東京都中央区と中野区、2005年時点での昼間人口が多いのは中央区ですか？\n<OUTPUT|LLM-jp>YES"
    },
    ...
]

```
<br />

#### MT-bench
対応予定

## アプリ作動に必要となる事前インストール物
#### Node.js (version20.9.0を使用)
Node.jsは、ブラウザ外でJavaScriptを実行するためのプラットフォームです。これにより、JavaScriptを使ってサーバーサイドのアプリケーションを開発することが可能になります。<br />
Node.jsを使用するにあたっては、nvmなどのNode.jsバージョン管理ツールを使用することを推奨します。<br />
pythonで言うところのpyenv（複数のpythonバージョンを切り替えて使用できる技術）。

#### pnpm
pnpmは「performant npm」という意味で、npmやyarnと並ぶJavaScriptのパッケージマネージャーです。<br />
yarnを使用する予定でしたが、インストールの際の高速化、容量の効率化のため採用してあります。

## インストール（使用方法）

1. リポジトリをクローンします。（自分のパソコンにダウンロードするようなもの）

```bash
git clone https://github.com/yourusername/llm-json-reader.git
```

2. 必要な依存関係をインストールするために、フォルダ内に移動し、<br />
   インストールのためのコマンドを入力します。

```bash
cd llm-json-reader
```
```bash
pnpm install
```

（※ フォルダに移動するまえにpnpm installを実行してしまいがち。必ず対象のフォルダに移動してください。<br />
   やってしまった場合は、削除してからやり直すのが一番簡単。<br />
   又は、出来上がったファイルをllm-json-readerフォルダ内に移動。）

3. 開発サーバーを起動します。

```bash
pnpm dev
```

4. ブラウザで`http://localhost:3000`を開きます。
   <br />

5. ファイル読込ボタンから、読み込みたいJSONデータなどを選択してください。<br />
6. 対応データ順次更新中。

### 使用技術

- Next.js (App Router：使ってみたかった)
- TypeScript（型安全：アプリのバグを防ぐための仕組み）
- Tailwind CSS（デザイン：デザイン）
- Recoil（状態管理：変数をうまく使う）
- ESLint（静的検証ツール：コードのエラー検出）
- Prettier（コードフォーマット：コード整形）
- pnpm（パッケージ管理：アプリに使うライブラリーの管理）
- gulp（タスクランナー：コンパイルや圧縮などの自動化）

#### 後日追加予定（必要になれば

- SQLite (将来的にはPostgreSQLへの移行か併用を想定)
- Storybook

### Features (追加機能)

- [ ] 各データのダウンロード・削除などができる機能
- [ ] XML形式対応
- [ ] データベースと連携し、何らかの機能
- [ ] アプリ使用者のTTSと連携した音声出力モード
- [ ] MQTT、又はgRPCを使用したスマホからの操作

## AIからの機能要望リスト（検討中

~~1. JSONおよびJSONL形式のファイルの読み込みと表示~~<br />
2. 複数のJSONファイルの統合表示<br />
3. JSONデータのCSVおよびExcelファイルへのエクスポート<br />
4. JSONデータのグラフィカルな可視化（棒グラフ、円グラフ、折れ線グラフなど）<br />
5. JSONデータ内の特定のキーワード検索<br />
6. JSONデータのソート（特定のキーを基準に昇順または降順）<br />
7. JSONデータのフィルタリング（特定の条件を満たすデータのみ表示）<br />
8. JSONデータの編集（値の変更、要素の追加・削除など）<br />
9. JSONデータのバリデーション（データの整合性チェック）<br />
10. JSONデータのバージョン管理（変更履歴の追跡、特定のバージョンへの復元など）<br />
11. ユーザー認証とアクセス制御（ログイン、ロール別のアクセス制限など）

## 貢献

"プルリクエストは歓迎します。<br />まずIssueを開いて変更内容について議論してください。"

Githubの共同開発経験が不十分なため、どのように他人との更新をしてゆけばよいかなどの経験がありません。<br />
要望はIssueにて頂き、暖かく見守って頂ければ幸いです。

## ライセンス

[MIT](https://choosealicense.com/licenses/mit/)

閲覧用のデータセットは、データ元のライセンスに準じます。
