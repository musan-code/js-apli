'use strict';

{

  function setWord() {
    //Math.floor 数値の切り捨て Math.random ランダムで整数を返す
    //[0]は、spliceで取り出された配列のうち、0番目の要素を取り出す
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');

  //クリックしたら単語をセットする
  document.addEventListener('click', () => {

    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    startTime = Date.now();
    //一つ目の単語を打ち終えたら、次の単語がランダムにセット
    setWord();
  })

  //キー入力の際に実行される処理の登録
  //addEventListnerはページを一度ロードすると、それ以降も実行される
  document.addEventListener('keydown', e => {

    //word の loc 番目でなかった場合、つまり不正解だった場合はこれ以降の処理をする必要がない
    if (e.key !== word[loc]) {
      return;
    }
    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    //'_'.repeat(loc) としてあげると、アンダーバーを loc の個数分繋げた文字列を作ってくれます。
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {

      if (words.length === 0) {
        //1000 で割って秒単位 小数点以下を二桁まで表示したいので、 toFixed()
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        //関数の処理を抜ける
        return;
      }
      //新しいワードが表示される(2ゲーム目、1回目)
      setWord();
    }
  });
}

