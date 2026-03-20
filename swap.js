const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startT2 = html.indexOf('        <!-- Tarjeta 2 (Duo Plan - Featured) -->');
const endT2 = html.indexOf('        <!-- Tarjeta 3 (250 Mbps) -->');
const tarjeta2 = html.slice(startT2, endT2);

const startT3 = html.indexOf('        <!-- Tarjeta 3 (250 Mbps) -->');
const endT3 = html.indexOf('        <!-- Tarjeta 4 (300 Mbps) -->');
const tarjeta3 = html.slice(startT3, endT3);

if (startT2 !== -1 && startT3 !== -1 && endT3 !== -1) {
  html = html.replace(tarjeta2 + tarjeta3, tarjeta3 + tarjeta2);
  fs.writeFileSync('index.html', html);
  console.log("Swapped Tarjeta 2 and Tarjeta 3 successfully.");
} else {
  console.log("Could not find the cards.");
}
