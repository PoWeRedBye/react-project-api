module.exports = (
  invoiceNumber,
  edrpo,
  bankCardNumber,
  mfo,
  clientName,
  itemsList,
  clientDirectorName,
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
      html, body {
        width: 210mm;
        min-height: 297mm;
        background: white;
      }
    </style>
</head>
<body>
    <div>
      УВАГА ! Рахунок  має  бути сплачений протягом  3 банківських днів
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 25px">
      <div style="width: 135px" >ПОСТАЧАЛЬНИК:</div>
      <div style="display: flex; flex-direction: column; margin-left: 15px;">
        <div>MY FOP NAME</div>
        <div style="margin-top: 15px" >ЄДРПО/ДРФО: ${edrpo}3253008234</div>
        <div>Р/рахунок: ${bankCardNumber} 26003052119396  в  АТ  КБ  ПриватБанк.</div>
        <div>МФО: ${mfo} 351533</div>
        <div style="margin-top: 15px">
          Адреса:  61145, м. Харків, вул. Новгородська,  4, кв. 92.
        </div>
        <div>
          Платник единого податку на прибуток
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 25px">
      <div style="width: 135px">
        ОДЕРЖУВАЧ:
      </div>
      <div style="display: flex; flex-direction: column; margin-left: 15px;">${clientName} SOME CLIENT NAME</div>
    </div>
    <div style="display: flex; flex-direction: column; margin-top: 20px; margin-left: 150px">
      <div style="display: flex; flex-direction: row">
        <div>Рахунок-фактура №: ${invoiceNumber} </div>
      </div>
      <div>SOME DATE with format "dd" mmmm YYYY </div>
    </div>
    <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Наименование</th>
        <th>Од.</th>
        <th>Ко-во</th>
        <th>Цена, грн.</th>
        <th>Сумма</th>
      </tr>
    </thead>
    <tbody>    
        ${itemsList.map(item => ({}))}
    </tbody>
    </table>
    <div>

    </div>
    <div>

    </div>
</body>
</html>
  `;
};
