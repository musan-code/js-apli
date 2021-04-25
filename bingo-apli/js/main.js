'use strict';

{
  function createColumn(colom) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      //1...15
      //sourece[i] = i + 1 + 15 * 0;
      //16 ... 30
      //source[i] = i + 1 + 15 * 1;
      source[i] = i + 1 + 15 * colom;
    }
    // const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    //Math.floor(Math.random() * (14 + 1))

    const column = [];
    for (let i = 0; i < 5; i++) {
      //ループが周り ランダムに5つの要素を取り出すことができる
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    return column;
  }


  function createColumns() {
    const columns = [];

    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'Free';
    return columns;
  }

  function createBingo(columns) {
    const bingo = [];
    for (let row = 0; row < 5; row++) {
      bingo[row] = [];
      for (let col = 0; col < 5; col++) {
        bingo[row][col] = columns[col][row];
      }
    }
    return bingo;
  }


  function renderBingo(bingo) {
    //行を表す
    for (let row = 0; row < 5; row++) {
      //createElement trタグを用意する
      const tr = document.createElement('tr');
      for (let col = 0; col < 5; col++) {
        const td = document.createElement('td');
        td.textContent = bingo[row][col];
        tr.appendChild(td);
      }

      // querySelector html要素を取得することができる
      document.querySelector('tbody').appendChild(tr);
    }

  }

  const columns = createColumns();
  const bingo = createBingo(columns);
  renderBingo(bingo);
}



