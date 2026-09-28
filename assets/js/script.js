'use strict';

/* ------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------ */

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };


/* ------------------------------------------------------------
 * Sidebar (mobile contacts toggle)
 * ------------------------------------------------------------ */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    const label = sidebarBtn.querySelector("span");
    if (label) label.textContent = sidebar.classList.contains("active") ? "Hide Contacts" : "Show Contacts";
  });
}


/* ------------------------------------------------------------
 * Testimonials modal
 * ------------------------------------------------------------ */

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


/* ------------------------------------------------------------
 * Portfolio filter (buttons on desktop, select on mobile)
 * ------------------------------------------------------------ */

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (key) {
  filterItems.forEach(function (item) {
    if (key === "all" || item.dataset.category === key) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

const setActiveFilterBtn = function (key) {
  filterBtn.forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filterBtn === key);
  });
};

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const key = this.dataset.selectItem;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(key);
    setActiveFilterBtn(key);
  });
});

filterBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const key = this.dataset.filterBtn;
    selectValue.innerText = this.innerText;
    filterFunc(key);
    setActiveFilterBtn(key);
  });
});


/* ------------------------------------------------------------
 * Contact form: enable button only when valid
 * ------------------------------------------------------------ */

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});


/* ------------------------------------------------------------
 * Page navigation
 * ------------------------------------------------------------ */

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const showPage = function (target) {
  let found = false;
  pages.forEach(function (page) {
    const match = page.dataset.page === target;
    page.classList.toggle("active", match);
    if (match) found = true;
  });
  if (!found) return;
  navigationLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.navLink === target);
  });
  window.scrollTo(0, 0);
};

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const target = this.dataset.navLink;
    showPage(target);
    if (history.replaceState) history.replaceState(null, "", "#" + target);
  });
});

// open the page named in the URL (e.g. .../Portfolio/#publications)
if (location.hash) showPage(location.hash.slice(1));


/* ------------------------------------------------------------
 * Footer year
 * ------------------------------------------------------------ */

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ------------------------------------------------------------
 * Lightbox: click a project to view it large on the same page
 * ------------------------------------------------------------ */

(function () {

  const box = document.querySelector("[data-lightbox]");
  if (!box) return;

  const img = box.querySelector("[data-lightbox-img]");
  const loader = box.querySelector("[data-lightbox-loader]");
  const titleEl = box.querySelector("[data-lightbox-title]");
  const catEl = box.querySelector("[data-lightbox-category]");
  const counterEl = box.querySelector("[data-lightbox-counter]");
  const descEl = box.querySelector("[data-lightbox-desc]");
  const linksEl = box.querySelector("[data-lightbox-links]");
  const prevBtn = box.querySelector("[data-lightbox-prev]");
  const nextBtn = box.querySelector("[data-lightbox-next]");
  const closeEls = box.querySelectorAll("[data-lightbox-close]");

  let slides = [];      // flat list of {src, item, figIndex, figTotal}
  let current = 0;
  let lastFocus = null;

  // Build the list of slides from the projects currently visible in the filter
  const buildSlides = function () {
    slides = [];
    document.querySelectorAll(".project-item.active [data-project]").forEach(function (link) {
      const item = link.closest(".project-item");
      const srcs = (link.dataset.images || link.getAttribute("href")).split("|");
      srcs.forEach(function (src, i) {
        slides.push({ src: src, item: item, figIndex: i, figTotal: srcs.length });
      });
    });
  };

  const render = function () {
    const s = slides[current];
    if (!s) return;

    const title = s.item.querySelector(".project-title").textContent;
    const category = s.item.querySelector(".project-category").innerHTML;
    const details = s.item.querySelector(".project-details");

    box.classList.add("is-loading");
    img.onload = function () { box.classList.remove("is-loading"); };
    img.onerror = function () { box.classList.remove("is-loading"); };
    img.src = s.src;
    img.alt = title + (s.figTotal > 1 ? " (figure " + (s.figIndex + 1) + ")" : "");

    titleEl.textContent = title;
    catEl.innerHTML = category;
    counterEl.textContent = s.figTotal > 1
      ? "Figure " + (s.figIndex + 1) + " of " + s.figTotal + "  ·  " + (current + 1) + " / " + slides.length
      : (current + 1) + " / " + slides.length;

    descEl.innerHTML = details ? details.querySelector(".project-desc").innerHTML : "";

    linksEl.innerHTML = "";
    if (details) {
      details.querySelectorAll(".project-links a").forEach(function (a) {
        const btn = document.createElement("a");
        btn.href = a.href;
        btn.target = "_blank";
        btn.rel = "noopener";
        btn.className = "lightbox-link";
        btn.innerHTML = '<ion-icon name="' + (a.dataset.icon || "open-outline") + '"></ion-icon><span>' + a.textContent + "</span>";
        linksEl.appendChild(btn);
      });
    }

    const single = slides.length < 2;
    prevBtn.hidden = single;
    nextBtn.hidden = single;

    // preload neighbours for smooth browsing
    [current + 1, current - 1].forEach(function (i) {
      const n = slides[(i + slides.length) % slides.length];
      if (n) { const p = new Image(); p.src = n.src; }
    });
  };

  const open = function (link) {
    buildSlides();
    const item = link.closest(".project-item");
    current = Math.max(0, slides.findIndex(function (s) { return s.item === item; }));
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(function () { box.classList.add("active"); });
    render();
    box.querySelector(".lightbox-close").focus();
  };

  const close = function () {
    box.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    setTimeout(function () { box.hidden = true; img.src = ""; }, 250);
    if (lastFocus) lastFocus.focus();
  };

  const step = function (dir) {
    if (slides.length < 2) return;
    current = (current + dir + slides.length) % slides.length;
    render();
  };

  document.querySelectorAll("[data-project]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      open(this);
    });
  });

  closeEls.forEach(function (el) { el.addEventListener("click", close); });
  prevBtn.addEventListener("click", function () { step(-1); });
  nextBtn.addEventListener("click", function () { step(1); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  // swipe on phones and tablets
  let touchX = null;
  box.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

})();
