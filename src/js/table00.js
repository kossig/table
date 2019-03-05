/* global document */
let htmlBox = document.querySelector('.wr');
let table00 = document.createElement('table');
htmlBox.appendChild(table00);

let rowTable00 = [
  'Table Name',
  'Stake',
  'Limit',
  'Players',
  'Wait',
  'Known',
  'AvgPot',
  'Pir/FLP',
  'H/hr',
  'Vpip'
];

let tableItems = 10;

let tableItem = {
  name : 'Sylvania',
  stake: '0.25/0.50',
  limit: 'No Limit',
  players: '6/6',
  wait: 12,
  known: '0/6',
  avg: '$12',
  plr_flp: '33%',
  h_hr: '77%',
  vpip: NaN
};


let rowItem = document.createElement('tr');
rowTable00.forEach(function (el){

let td = document.createElement('td');
  td.innerHTML = el;
  rowItem.appendChild(td);
});

    table00.appendChild(rowItem);
for(let i = 0; i < tableItems; i++){

let rowItem = document.createElement('tr');

    for(let key in tableItem){

let td = document.createElement('td');
      td.innerHTML = tableItem[key];
      rowItem.appendChild(td);
    }

    table00.appendChild(rowItem);
}

