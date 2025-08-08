window.addEventListener("DOMContentLoaded", () => {
  // 🐱 Animação do rabinho do gato
  const path = document.querySelector("#tailPath");
  let frame = 0;

  function animateTail() {
    const offset = Math.sin(frame / 8) * 6;
    const newPath = `
      M80,130
      C${70 + offset},${110 - offset} ${80 - offset},${90 + offset} ${60},75
      C${40 + offset},60 ${60 - offset},45 45,30
    `;
    path.setAttribute("d", newPath);
    frame++;
    requestAnimationFrame(animateTail);
  }

  animateTail();

  // 💬 Animação balão "Sobre Nós"
  const bubble = document.querySelector(".speech-bubble");
  if (bubble) bubble.classList.add("loaded");

  // 🐾 Carrossel infinito
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicatorWrapper = document.querySelector('.carousel-dots');

  const cards = Array.from(track.children);
  const cardStyles = window.getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth + parseInt(cardStyles.marginRight);

  const visibleArea = track.parentElement.offsetWidth;
  const cardsPerView = 4;
  const totalSteps = cards.length - cardsPerView + 1;


  let currentIndex = 0;
  let autoplayInterval = null;
  let autoplayTimeout = null;

  // 🟡 Criação dos indicadores (bolinhas)
  for (let i = 0; i < totalSteps; i++) {
    const dot = document.createElement("span");
    dot.className = "carousel-dot";
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarouselPosition();
      pauseAutoplay();
    });

    indicatorWrapper.appendChild(dot);
  }

  const dots = Array.from(indicatorWrapper.children);

  function updateActiveDot() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function updateButtonStates() {
    if (currentIndex === 0) {
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.classList.remove("disabled");
    }

    if (currentIndex === totalSteps - 1) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }
  }

  function updateCarouselPosition(animate = true) {
    track.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateActiveDot();
    updateButtonStates();
  }

  function goToNext() {
    if (currentIndex < totalSteps - 1) {
      currentIndex++;
      updateCarouselPosition();
    }
  }

  function goToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarouselPosition();
    }
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (currentIndex < totalSteps - 1) {
        goToNext();
      } else {
        clearInterval(autoplayInterval);

        setTimeout(() => {
          const rewind = setInterval(() => {
            if (currentIndex > 0) {
              currentIndex--;
              updateCarouselPosition(true);
            } else {
              clearInterval(rewind);
              startAutoplay();
            }
          }, 10);
        }, 30);
      }
    }, 4000);
  }

  function pauseAutoplay() {
    clearInterval(autoplayInterval);
    clearTimeout(autoplayTimeout);
    autoplayTimeout = setTimeout(() => {
      startAutoplay();
    }, 5000);
  }

  nextBtn.addEventListener('click', () => {
    goToNext();
    pauseAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    goToPrev();
    pauseAutoplay();
  });

  nextBtn.addEventListener('touchstart', () => {
    goToNext();
    pauseAutoplay();
  });

  prevBtn.addEventListener('touchstart', () => {
    goToPrev();
    pauseAutoplay();
  });

  // Inicialização
  updateCarouselPosition(false);
  startAutoplay();

  // ===== Chat Flutuante =====
  const chatIcon = document.getElementById('chat-icon');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatSend = document.getElementById('chat-send');
  const chatText = document.getElementById('chat-text');
  const chatMessages = document.querySelector('.chat-messages');

  chatIcon.addEventListener('click', () => {
    chatBox.classList.add('open'); // ativa animação
    chatIcon.style.display = 'none';

    // mensagem de boas-vindas só se não tiver mensagens ainda
    if (!chatMessages.hasChildNodes()) {
      addMessage('Olá! 🐾 Seja bem-vindo(a)! Digite sua dúvida aqui que vamos te ajudar.', 'bot');
    }
  });



  chatClose.addEventListener('click', () => {
    chatBox.classList.remove('open'); // fecha com animação
    setTimeout(() => {
      chatIcon.style.display = 'flex';
    }, 350); // espera animação terminar
  });

  function sendMessage() {
    const text = chatText.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    chatText.value = '';

    setTimeout(() => {
      addMessage('Mensagem recebida! Em breve entraremos em contato. 📩', 'bot');
    }, 1000);
  }

  function addMessage(content, type) {
    const msg = document.createElement('div');
    msg.classList.add('message', type);
    msg.textContent = content;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener('click', sendMessage);
  chatText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  // Ativador de chat no rodapé
  const chatTrigger = document.querySelector('.chat-trigger');

  chatTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    chatBox.classList.add('open');
    chatIcon.style.display = 'none';

    if (!chatMessages.hasChildNodes()) {
      addMessage('Olá! 🐾 Seja bem-vindo(a)! Digite sua dúvida aqui que vamos te ajudar.', 'bot');
    }
  });
  // Menu hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  siteNav.classList.toggle('show');
});

});
