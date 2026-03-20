const fs = require('fs');

// Inject JS into main.js
const jsPath = 'js/main.js';
let js = fs.readFileSync(jsPath, 'utf8');
if (!js.includes('showChannelTab')) {
  const toggleFn = `
// TV Channels Modal Tabs Logic
window.showChannelTab = function(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("channel-tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("channel-tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active-tab", "border-brand-primary", "bg-brand-purple/40", "text-white", "font-bold");
    tablinks[i].classList.add("border-transparent", "hover:bg-white/5", "text-gray-400", "hover:text-white", "font-medium");
  }
  document.getElementById(tabName).style.display = "grid";
  evt.currentTarget.classList.remove("border-transparent", "hover:bg-white/5", "text-gray-400", "hover:text-white", "font-medium");
  evt.currentTarget.classList.add("active-tab", "border-brand-primary", "bg-brand-purple/40", "text-white", "font-bold");
};
`;
  fs.writeFileSync(jsPath, js + toggleFn);
}

// Inject HTML into index.html
const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const modalGenContent = fs.readFileSync('modal-gen.html', 'utf8');

// Extract just the modal block from modal-gen.html
const modalBlock = modalGenContent.substring(
  modalGenContent.indexOf('    <!-- Modal de Canales -->'),
  modalGenContent.lastIndexOf('</div>') 
);
// Above lastIndexOf('</div>') excludes the closing div of "fixed bottom-6..."

if (!html.includes('id="modal-canales"')) {
  // We insert it right before the WhatsApp Modal
  html = html.replace(
    '    <!-- Modal de WhatsApp -->', 
    modalBlock + '    <!-- Modal de WhatsApp -->'
  );
  fs.writeFileSync(htmlPath, html);
  console.log("Success! index.html and main.js have been updated.");
} else {
  console.log("Modal already injected.");
}
