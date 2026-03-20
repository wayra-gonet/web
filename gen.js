const fs = require('fs');
const data = {
  nacionales: { icon: 'ph-flag', color: 'text-brand-primary', name: 'Nacionales', list: ['America', 'Frecuencia Latina', 'Panamericana', 'TV Peru', 'ATV', 'Zona Latina', 'ATV+', 'Willax'] },
  series: { icon: 'ph-film-strip', color: 'text-brand-cyan', name: 'Series', list: ['MTV', 'A&E', 'Syfy', 'Warner', 'TNT', 'Lifetime', 'TBS', 'AXN'] },
  infantil: { icon: 'ph-baby', color: 'text-pink-500', name: 'Infantil', list: ['Cartoon Network', 'Disney Channel', 'Disney Jr', 'BabyFirst', 'Nick Jr', 'Discovery Kids', 'Nickelodeon'] },
  peliculas: { icon: 'ph-popcorn', color: 'text-yellow-500', name: 'Peliculas', list: ['Universal Cinemax', 'FX Movies', 'HBO 2', 'HBO Family', 'HBO Plus', 'Space', 'Universal', 'TCM', 'Max Prime', 'Cinecanal', 'Golden', 'Studio Universal', 'Cinemax'] },
  deportes: { icon: 'ph-soccer-ball', color: 'text-green-500', name: 'Deportes', list: ['TyC Sports', 'ESPN', 'ESPN 2', 'ESPN 3', 'ESPN 4', 'Fox Sports 2', 'Fox Sports 3', 'Liga 1 Max', 'Gol Peru'] },
  factuales: { icon: 'ph-planet', color: 'text-orange-400', name: 'Factuales', list: ['Discovery Turbo', 'NatGeo', 'History Channel', 'Discovery Channel', 'Animal Planet', 'H2'] },
  variados: { icon: 'ph-star', color: 'text-purple-400', name: 'Variados', list: ['TLC', 'Discovery ID', 'Home & Health', 'TLN', 'Universal Crime', 'Canal de las Estrellas', 'E! Entertainment', 'RCN Novelas', 'Telemundo', 'Universal Comedia'] },
  documentales: { icon: 'ph-book-open-text', color: 'text-blue-400', name: 'Documentales', list: ['Love Nature', 'TVE', 'Bethel'] }
};

let htmlTabs = '';
let htmlContent = '';
let first = true;

for (const [key, val] of Object.entries(data)) {
  const activeBtnClass = first ? 'active-tab border-brand-primary bg-brand-purple/40 text-white font-bold' : 'border-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium';
  htmlTabs += `<button onclick="showChannelTab(event, 'tab-${key}')" class="channel-tab-link text-left whitespace-nowrap md:whitespace-normal px-4 py-3 rounded-xl border ${activeBtnClass} transition-all flex items-center group" type="button">\n`;
  htmlTabs += `  <i class="ph-fill ${val.icon} mr-3 ${val.color} text-lg group-hover:scale-110 transition-transform"></i> ${val.name}\n`;
  htmlTabs += `</button>\n`;

  const displayClass = first ? 'grid' : 'hidden';
  htmlContent += `<div id="tab-${key}" class="channel-tab-content ${displayClass} grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">\n`;
  
  for (const ch of val.list) {
    htmlContent += `  <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/10 hover:border-brand-primary/50 hover:shadow-[0_0_15px_rgba(236,102,8,0.3)] transition-all cursor-default group text-center h-20">\n`;
    htmlContent += `    <span class="font-bold text-gray-300 group-hover:text-white group-hover:scale-105 transition-all text-sm">${ch}</span>\n`;
    htmlContent += `  </div>\n`;
  }
  htmlContent += `</div>\n`;
  first = false;
}

const finalHtml = `
<!-- Botón Flotante y Modal de WhatsApp -->
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <!-- Modal de Canales -->
    <div id="modal-canales" class="fixed inset-0 z-[99999] hidden">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onclick="document.getElementById('modal-canales').classList.add('hidden')"></div>
      <!-- Contenedor del Modal -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl max-h-[90vh] flex flex-col border border-brand-cyan/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] rounded-3xl bg-[#0a0410]/95 overflow-hidden animate-scale-up">
        
        <!-- Header -->
        <div class="flex justify-between items-center p-5 md:p-6 border-b border-white/10 shrink-0 bg-gradient-to-r from-transparent to-brand-cyan/5">
          <div>
            <h3 class="text-xl md:text-2xl font-black text-white flex items-center">
              <i class="ph-fill ph-television-simple text-brand-cyan mr-3 md:text-3xl text-2xl"></i> 
              Parrilla de Canales
              <span class="bg-brand-primary/20 text-brand-primary text-[10px] md:text-xs ml-3 px-3 py-1 rounded-full border border-brand-primary/30 uppercase tracking-wider hidden sm:inline-block">Plan Dúo</span>
            </h3>
            <p class="text-gray-400 text-xs md:text-sm mt-1 hidden md:block">Más de 100 canales con la mejor programación en Full HD.</p>
          </div>
          <button onclick="document.getElementById('modal-canales').classList.add('hidden')" class="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none flex-shrink-0">
            <i class="ph-bold ph-x text-xl"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
          <!-- Tabs Laterales (MD+) / Superiores (Mobile) -->
          <div class="w-full md:w-64 bg-black/40 border-r border-white/5 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col p-4 gap-2 custom-scrollbar">
${htmlTabs.replace(/^/gm, '            ').trim()}
          </div>

          <!-- Contenidos de los Tabs -->
          <div class="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar bg-gradient-to-br from-transparent to-brand-primary/5">
${htmlContent.replace(/^/gm, '            ').trim()}
          </div>
        </div>
      </div>
    </div>
  </div>`;

fs.writeFileSync('modal-gen.html', finalHtml);
console.log('Done!');
