/* global document */

let numElementsTable00 = 10,
namesColumnsTable00 = [
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
],
elemTable00 = {
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

let table00 = document.createElement('table');
document.querySelector('.wr').appendChild(table00);

let tr = document.createElement('tr');

namesColumnsTable00.forEach(function (el){
  let td = document.createElement('td');
  td.innerHTML = el;
  tr.appendChild(td);
});

table00.appendChild(tr);

for(let i = 0; i < numElementsTable00; i++){
  let row = document.createElement('tr');

  for(let key in elemTable00){
    let td = document.createElement('td');
    td.innerHTML = elemTable00[key];
    row.appendChild(td);
  }

  table00.appendChild(row);
}

