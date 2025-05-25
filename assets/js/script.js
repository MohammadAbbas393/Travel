'use strict';

/**
 * NAVBAR TOGGLE
 */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 * HEADER STICKY & GO TO TOP
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * CHATBOT TOGGLE + LANGUAGE SWITCH (EN/AR)
 */
const toggleBtn = document.getElementById('chatbotToggle');
const chatbotBox = document.getElementById('chatbotContainer');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const languageSelector = document.getElementById('languageSelector');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    chatbotBox.style.display = chatbotBox.style.display === 'none' ? 'block' : 'none';
  });
}

if (chatInput) {
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      const lang = languageSelector.value;
      const userMsg = chatInput.value.trim();
      let botReply;

      if (lang === 'ar') {
        botReply = "مرحباً! كيف يمكنني مساعدتك؟";
      } else {
        botReply = "Hello! How can I help you?";
      }

      chatMessages.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;
      chatMessages.innerHTML += `<div><strong>Ziggy:</strong> ${botReply}</div>`;
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  languageSelector.addEventListener('change', function () {
    const lang = languageSelector.value;
    let greeting;

    if (lang === 'ar') {
      greeting = "مرحباً! كيف يمكنني مساعدتك؟";
    } else {
      greeting = "Hello! How can I help you?";
    }

    chatMessages.innerHTML += `<div><strong>Ziggy:</strong> ${greeting}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}
