const writtenNumber = require('written-number');

module.exports = () => {
  const dictionary = {
    '1': 'Копії',
    '2': 'Шт.',
  };

  const data = [
    {
      name: 'nameUKR => привіт',
      type: 1,
      amount: 10,
      price: 1,
    },
    { name: 'nameRUS => привет', type: 1, amount: 20, price: 2 },
    { name: 'name 3', type: 1, amount: 30, price: 3 },
    { name: 'name 4', type: 1, amount: 40, price: 4 },
    { name: 'name 5', type: 1, amount: 50, price: 5 },
    { name: 'name 6', type: 1, amount: 60, price: 6 },
    { name: 'name 7', type: 1, amount: 70, price: 7 },
    { name: 'name 8', type: 1, amount: 80, price: 8 },
    { name: 'name 9', type: 1, amount: 90, price: 9 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    /*{ name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },
    { name: 'name 10', type: 1, amount: 100, price: 10 },*/
  ];

  const pdv = {
    withPDV: 1,
  };

  const global = {
    '1': 0,
    '2': 0.2,
  };

  return `
    <!DOCTYPE html>
<html lang="en" style="padding: 0;">

<head>
    <meta charset="UTF-8">
    <title>new pdf</title>
    <style>
      html, body {
        min-height: 297mm;
        background: white;
        margin: 0;
      }
      
      body {
        width: calc(210mm - 48mm);
        padding: 24mm;
      }
      .container-1{
      display: -webkit-box; 
      flex-direction: row; 
      margin-top: 25px,
      }
      .container-2{
      display: -webkit-box; 
      flex-direction: column; 
      }
      .container-3{
      
      }
    </style>
</head>
<body>
    <div>УВАГА ! Рахунок має бути сплачений протягом 3 банківських днів</div>
        <div class="container-1">
          <div style="width: 135px">ПОСТАЧАЛЬНИК:</div>
          <div style="margin-left: 15px">
            <div>MY FOP NAME</div>
            <div style="margin-top: 15px">ЄДРПО/ДРФО: 3253008234</div>
            <div>Р/рахунок: 26003052119396 в АТ КБ ПриватБанк.</div>
            <div>МФО: 351533</div>
            <div style="margin-top: 15px">Адреса: 61145, м. Харків, вул. Новгородська, 4, кв. 92.</div>
            <div>Платник единого податку на прибуток</div>
          </div>
        </div>
        <div class="container-1">
          <div style="width: 135px">ОДЕРЖУВАЧ:</div>
          <div style="margin-left: 15px">SOME CLIENT NAME</div>
        </div>
        <div style="display: -webkit-flex; flex-direction: column; margin-top: 20px; margin-left: 150px">
          <div style="display: -webkit-flex; flex-direction: row">
            <div>Рахунок-фактура №:</div>
            <div style="margin-left: 5px">06/19</div>
          </div>
          <div>SOME DATE with format "dd" mmmm YYYY </div>
        </div>

        <div style="background-color: #89d289; border: 1px solid black; border-bottom-width: 0; margin-top: 15px">
          <div style="border: 1px solid black; height: 3px" />
          <div style="display: -webkit-flex; flex-direction: row">
            <div style="text-align: center; border: 1px solid black; flex: 1">№</div>
            <div style="text-align: center; border: 1px solid black; flex: 1">НАЙМЕНУВАННЯ</div>
            <div style="text-align: center; border: 1px solid black; flex: 1">Од.</div>
            <div style="text-align: center; border: 1px solid black; flex: 1">Кількість</div>
            <div style="text-align: center; border: 1px solid black; flex: 1">Ціна, грн.</div>
            <div style="text-align: center; border: 1px solid black; width: 125px">Сума, грн.</div>
          </div>
          <div style="border: 1px solid black; height: 3px" />
        </div>
        <div style="border: 1px solid black; border-top-width: 0 "
          <div style="text-align: center; border: 1px solid black">
            Послуги з комплексного ослуговування виробнитства копій або відбитків
          </div>
          ${data.reduce(
            (result, item, index) =>
              result +
              `
            <div style="display: -webkit-flex; flex-direction: row">
              <div style="text-align: center; border: 1px solid black; flex: 1">${index + 1}</div>
              <div style="text-align: center; border: 1px solid black; flex: 1">${item.name}</div>
              <div style="text-align: center; border: 1px solid black; flex: 1">${
                dictionary[item.type]
              }</div>
              <div style="text-align: center; border: 1px solid black; flex: 1">${item.amount}</div>
              <div style="text-align: center; border: 1px solid black; flex: 1">${item.price}</div>
              <div style="border: 1px solid black; width: 125px; text-align: right; padding: 0 2px">${item.amount *
                item.price}</div>
            </div>
          `,
            '',
          )}
          <div style="border: 1px solid black; height: 3px"/>
        </div>
        <div style="display: -webkit-flex; flex-direction: column">
          <div style="display: -webkit-flex; flex-direction: row; justify-content: flex-end">
            <div
              style=
                "display: -webkit-flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
                padding: 0 5px;
                height: calc(100% - 3px)">
              <div style="margin: 1px 0">Ітого:</div>
              <div style="margin: 1px 0">ПДВ:</div>
              <div style="margin: 1px 0">Всього:</div>
            </div>
            <div>
              <div style="width: 127px; border: 1px solid black; border-top-width: 0">
                <div style="border: 1px solid black; border-top-width: 0; text-align: right; padding: 0 2px">
                  ${data.reduce((result, item) => result + item.amount * item.price, 0)}
                </div>
                <div style="border: 1px solid black; text-align: right; padding: 0 2px">
                  ${
                    global[pdv.withPDV]
                      ? data.reduce((result, item) => result + item.amount * item.price, 0) *
                        global[pdv.withPDV]
                      : 'не передбачено'
                  }
                </div>
                <div style="border: 1px solid black; text-align: right; padding: 0 2px">
                  ${data.reduce((result, item) => result + item.amount * item.price, 0) *
                    (global[pdv.withPDV] ? global[pdv.withPDV] + 1 : 1)}
                </div>
              </div>
              <div style="border: 2px solid black; height: 3px; width: 127px; border-top-width: 0" />
            </div>
          </div>
        </div>
        <div style="display: -webkit-flex; flex-direction: column; padding: 10px">
          <div>Всього на сумму:</div>
          <div>${writtenNumber(
            data.reduce((result, item) => result + item.amount * item.price, 0) *
              (global[pdv.withPDV] ? global[pdv.withPDV] + 1 : 1),
            { lang: 'uk' },
          )} грн.</div>
          <div>
            ПДВ:${' '}
            ${
              global[pdv.withPDV]
                ? `${data.reduce((result, item) => result + item.amount * item.price, 0) *
                    global[pdv.withPDV]} грн.`
                : 'не передбачено'
            }
          </div>
        </div>
        <div style="display: -webkit-flex; justify-content: flex-end">
          Виписав(ла) _________________ ФОП М.І. Озаровський
        </div>
</body>
</html>
  `;
};
