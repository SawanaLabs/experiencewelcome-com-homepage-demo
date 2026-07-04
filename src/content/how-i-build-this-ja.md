---
title: "How I Build This: Figma の課題から始める"
description: "Figma の Landing Page 課題を、保守しやすく Agent-ready なフロントエンド delivery system に進めていく構築の振り返り。"
---

# How I Build This: Figma の課題から始める

## 目次

- [0. 未来の AI Native Product Engineer](#0-未来の-ai-native-product-engineer)
- [1. Figma の課題から始める](#1-figma-の課題から始める)
- [2. プロジェクトを作り始める](#2-プロジェクトを作り始める)
  - [2.1 伸び続けられるプロジェクトを先に作る](#21-伸び続けられるプロジェクトを先に作る)
  - [2.2 Agent に読めるコンテキストを残す](#22-agent-に読めるコンテキストを残す)
  - [2.3 要件を読むように Figma を読む](#23-要件を読むように-figma-を読む)
  - [2.4 デザインを実際のページへ進める](#24-デザインを実際のページへ進める)
  - [2.5 検証ループで delivery を受け止める](#25-検証ループで-delivery-を受け止める)
- [3. 最後に何になったのか](#3-最後に何になったのか)

## 0. 未来の AI Native Product Engineer

以前は、新しいメンバーが本当にプロジェクトへ landing するには、たいていコンテキスト引き継ぎのコストがかかった。その一部はチームからの説明であり、もう一部は本人がコードを読み、ドキュメントを読み、コマンドを実行する時間だった。誰かがディレクトリ構造を説明し、誰かがなぜコンポーネントをこのように分けたのかを説明し、誰かがどのコマンドを実行できるか、どのチェックを必ず通すか、どの場所を軽く触ってはいけないかを伝える必要があった。プロジェクトが成熟するほど知識は増え、新しく入る人が吸収すべきコンテキストも重くなる。チームに人が増えても、すぐに生産性が上がるとは限らない。コミュニケーション、同期、手戻りが先に摩擦として現れることも多い。

AI が開発者の日常的なワークフローに入ると、この状況には別の可能性が生まれる。新しいメンバーがプロジェクトを引き継ぐとき、まず AI に質問するかもしれない。この機能はなぜこう実装されているのか。どんな背景と判断があったのか。プロジェクトはどんな技術スタックを使っているのか。あるモジュールを変更するなら、最初にどのディレクトリとどのドキュメントを見るべきか。AI は、その人がプロジェクトへ landing するためのコンテキスト入口になる。だから、良いプロジェクトの engineering practice は、人間の開発者と Coding Agent の両方に向けて設計される必要がある。ディレクトリ、ドキュメント、テスト、品質ゲート、実装の習慣、検証パスは、新しく入る人や新しい Agent session がより早くプロジェクトを理解し、どこから始めるかを知り、自分の作業が正しいかを判断できるようにするべきだ。

より理想的な状態はこうだ。新しいメンバーがプロジェクトに landing したあと、暗黙知を補うために長い時間を使わなくてよい。コード、ドキュメント、AI を使って素早くプロジェクトの地図を作り、既存の判断の上に自分の判断を重ねられる。この新しいメンバーは同僚でもよいし、新しく開いた Agent session でもよい。どちらもプロジェクトに入ったあと、プロダクトの表面、エンジニアリング制約、既存の判断を読み取り、そのコンテキストの上で作業を進められるべきだ。

この状態を作るには、少なくとも二つの線が同時に成立する必要がある。

一つ目は project engineering practice である。これはリポジトリの中で delivery に実際に関わるすべての硬い内容を含む。ディレクトリ構造、具体的なコード、コンポーネント、スタイル、コンテンツ、i18n、アセット、ドキュメント、テスト、品質ゲート。これらは一緒になって、そのチームに合った best practice になる。人間の開発者も Coding Agent も、同じ材料を通してプロジェクトを理解し、変更し、検証できる。その価値は、プロジェクトをそれっぽく構造化して見せることにはない。後続のあらゆる変更に、明確な場所、境界、判断材料を与えることにある。

二つ目は Agent Harness である。ここでいう Harness は、Agent の働き方を設計する仕組みとして理解できる。プロジェクトコンテキスト、skills、tools、検証習慣、delivery standard を組み合わせ、新しい session の中で Agent がタスクをどう理解し、どの道を選び、どう実装し、どう結果を検証し、どう人間に作業結果を届けるかを示す。目的は、Agent の自律性を検証可能なエンジニアリングの軌道に載せることだ。Agent はプロジェクトのコンテキストを知り、使える skill と tool を知り、Figma や要求から制約を取り出す方法を知り、実装後にどのチェックを走らせ、どのページを開き、どんな証拠を残すかを知る必要がある。

この二つの線が十分に整うと、非常に具体的なビジネスシナリオが現れる。チームが新しい Landing Page を追加したい、あるいは homepage のある section を調整したい。人間の開発者はドキュメント、ディレクトリ、コードを通じて素早く作業を理解できる。Coding Agent も新しい session で同じコンテキストを読み、同じ実装入口を見つけ、同じ検証フローを実行できる。プロジェクト delivery は、一人の頭の中にある暗黙知への依存から、読めて、実行できて、再利用できるシステムへの依存へ移っていく。

この働き方の中で、AI Native Product Engineer という役割が具体的になる。まず、この人はシステムの利用者である。AI、コード、ドキュメントを通じてプロジェクトを理解し、特定のモジュールやページを delivery する。同時に、この人は delivery system を継続的に改善する。コンテキスト、ドキュメント、best practice、検証パスをさらに明確にし、次の landing をより簡単にする。

これらの考えは抽象概念から始まったわけではない。非常に具体的な実装タスクから生まれた。タスクの材料は、Awwwards 2024 のサイトを集めた Community file にある静的な Figma visual reference で、その中の Experience homepage が再現対象だった。本当に達成すべきことは、画面を似せることだけではなかった。静的なページを評価可能な front-end work へ進める必要があった。合理的な responsive behavior、必要な interaction enhancement、多言語に向いた content organization、そして performance と SEO の検証可能な基礎が必要だった。

## 1. Figma の課題から始める

それは、完全な design system、component notes、interaction annotations を備えた正式な handoff ではなかった。ファイルを開くと、Community file の中に複数の長い homepage visual が横に並んでおり、そのうち Experience のページが実装範囲として指定されていた。より近いのは静的な visual reference だった。ページの視覚的な結果はそこにあり、階層、リズム、色、画像、テキストも見える。しかし、front-end implementation に入るときに必要な多くのものは自動では出てこない。

たとえば、Figma の中ではページはとても長い一枚の visual mockup でよい。しかしブラウザでは、幅が変わるたびに再び流れ直す必要がある。Figma のボタンは形と文字だけでもよいが、プロダクトでは hover、active、focus、mobile touch feedback が必要になる。ページ内の英語コンテンツは見た目に合わせて再現できるが、タスクは多言語も求めている。つまり content organization は現在の一枚の見た目だけに合わせるわけにはいかない。Performance と SEO も同じだ。それらは Figma layer から自然に出てくるものではなく、実装時にエンジニアリング構造へ意識的に入れる必要がある。

だから最初の一歩は、急いでコードを書くことではなかった。より重要だったのは、タスクを正しく読むことだった。Figma は視覚目標であり、Experience homepage は境界であり、最終 deliverable は開けて、レビューできて、テストできて、保守を続けられる front-end work である。この work は元の visual を尊重しつつ、静的な材料が自然には持たない responsive、interaction、content、accessibility、performance、verification evidence を補う必要があった。

ここから、このタスクは面白くなった。表面上は Landing Page の再現に見える。要求を最後まで読むと、圧縮された front-end delivery scenario のように見えてくる。AI を使うことが求められ、同時にどの部分が自分の判断、調整、取捨選択を経たのかを説明することも求められる。言い換えると、AI の参加そのものが delivery quality の一部になった。コードを生成することは難しくない。難しいのは、AI の出力を review、修正、検証できるエンジニアリングプロセスへ入れることだ。

そのため、このプロジェクトは最初から一度きりのページ模写として扱うには向いていなかった。より妥当な出発点は、Figma を input とし、webpage を output とし、人間と Agent が理解し、協力し、検証できる中間プロセスを本当に構築すべきシステムとして扱うことだった。後に出てくる project structure、docs、i18n、component boundary、verification command、browser review は、すべてこの判断から育っていった。

## 2. プロジェクトを作り始める

この章では実際の構築プロセスに入る。時間と判断に沿って、空のプロジェクトから repository、Harness、Figma reading、page implementation、verification loop をどのように作っていったかを書いていく。

### 2.1 伸び続けられるプロジェクトを先に作る

ここでは初期のプロジェクト判断を扱う。app structure、package management、docs system、i18n、component boundary、asset management、quality gate がどのように保守性を作ったかを書く。

### 2.2 Agent に読めるコンテキストを残す

ここではプロジェクトを通じて Harness を説明する。Model、repository context、skills、tools がどのように組み合わさり、新しい session の Agent でも end-to-end に作業できるようになるかを書く。

### 2.3 要件を読むように Figma を読む

ここでは Figma file を確認し、範囲を決め、読み解く方法を扱う。design information を implementation constraints に変換し、元の座標を最終 layout API として扱わないことも含める。

### 2.4 デザインを実際のページへ進める

ここでは実際の開発に入る。components、responsive layout、real assets、localized content、motion、interaction、そして開発中に起きた具体的な trade-off を扱う。

### 2.5 検証ループで delivery を受け止める

ここでは結果をどう検証するかを書く。tests、quality commands、browser checks、visual review、performance feedback、deployment evidence がどのように loop を作るかを扱う。

## 3. 最後に何になったのか

この章では全文を収束させる。このプロジェクトは最終的に Landing Page work のための Agent-ready front-end delivery system になり、同時に他のプロジェクトへ移せる方法論も残した。
