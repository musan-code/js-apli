'use strict';


{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      //プロパティ
      //createElement html要素を動的に生成する
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      //timeoutIdの初期化
      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');

      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        //setTimeoutを止める clearTimeoutと設定
        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      //querySekector html要素を取得できる
      //生成されたsectionがhtmlのmain要素に追加される
      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      //setTimeout関数 一定時間後に一度だけ特定の処理を行う
      this.timeoutId = setTimeout(() => {
        this.spin();

      }, 50);
    }

    isUnmatched(p1, p2) {
      //p1 p2 どちらのパネルも同じではなかった時にtrueを返す 今回の場合色を薄くする
      if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        return true;
      } else {
        return false;
      }
      //return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  //最後のSTOPボタンを押したら ccheckResult()が発動する
  //他のパネルと一致していなかったら色を薄くする処理
  function checkResult() {
    //p1にはpanels[1], p2にはpanels[2]が入る
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }

    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }

    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  //インスタンスを生成する
  // new Panel() された時点で クラスの constructorが発動する
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  //あといくつ動いているパネルが残っているのか変数で保持する
  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      //panelのspinメソッドを呼び出す
      panel.spin();
    });
  });
}
