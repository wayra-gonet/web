// Preloader logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // Sticky Navbar implementation
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('glass-nav-scrolled');
      header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      header.classList.remove('glass-nav-scrolled');
      header.classList.add('bg-transparent', 'border-transparent');
    }
  });

  // Init Swiper for Hero
  if (document.querySelector('.hero-swiper')) {
    const swiper = new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('flex', 'flex-col');
      } else {
        mobileMenu.classList.remove('flex', 'flex-col');
      }
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex', 'flex-col');
      });
    });
  }

  // Map Toggling Logic
  const mapUripaBtn = document.getElementById('btn-map-uripa');
  const mapChincherosBtn = document.getElementById('btn-map-chincheros');
  const mapContainer = document.getElementById('map-iframe');

  // Embedded Maps IFrames provided by User Shortlinks
  const mapUrls = {
    uripa: "https://maps.google.com/maps?q=-13.533265,-73.678339&hl=es&z=15&output=embed",
    chincheros: "https://maps.google.com/maps?q=-13.5167887,-73.7216478&hl=es&z=15&output=embed"
  };

  if (mapUripaBtn && mapChincherosBtn && mapContainer) {
    mapUripaBtn.addEventListener('click', () => {
      mapUripaBtn.classList.add('active');
      mapChincherosBtn.classList.remove('active');
      mapContainer.style.opacity = '0';
      setTimeout(() => {
        mapContainer.src = mapUrls.uripa;
        mapContainer.style.opacity = '1';
      }, 300);
    });

    mapChincherosBtn.addEventListener('click', () => {
      mapChincherosBtn.classList.add('active');
      mapUripaBtn.classList.remove('active');
      mapContainer.style.opacity = '0';
      setTimeout(() => {
        mapContainer.src = mapUrls.chincheros;
        mapContainer.style.opacity = '1';
      }, 300);
    });
  }

  // WhatsApp Modal Toggle
  const waBtn = document.getElementById('wa-btn');
  const waModal = document.getElementById('wa-modal');
  const closeWaModal = document.getElementById('close-wa-modal');

  if (waBtn && waModal && closeWaModal) {
    waBtn.addEventListener('click', () => {
      if (waModal.classList.contains('hidden')) {
        waModal.classList.remove('hidden');
        // Small delay to allow display:block before opacity toggle
        setTimeout(() => {
          waModal.classList.remove('scale-0', 'opacity-0');
          waModal.classList.add('scale-100', 'opacity-100');
        }, 10);
      } else {
        waModal.classList.remove('scale-100', 'opacity-100');
        waModal.classList.add('scale-0', 'opacity-0');
        setTimeout(() => {
          waModal.classList.add('hidden');
        }, 300);
      }
    });

    closeWaModal.addEventListener('click', () => {
      waModal.classList.remove('scale-100', 'opacity-100');
      waModal.classList.add('scale-0', 'opacity-0');
      setTimeout(() => {
        waModal.classList.add('hidden');
      }, 300);
    });
  }
});

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
