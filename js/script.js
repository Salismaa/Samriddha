/* =========================================
   HELPER
========================================= */

const $ = id => document.getElementById(id);


/* =========================================
   PAGE NAVIGATION
========================================= */

function go(id) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = $(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /* Load letter when opening it */

  if (id === "letter") {
    showLetter();
  }


  /* Load story when opening it */

  if (id === "story") {
    renderStory();
  }


  /* Load coupons when opening it */

  if (id === "coupons") {
    renderCoupons();
  }

}


/* =========================================
   PASSWORD
========================================= */

$("hint").textContent = C.hint;

$("ttl").textContent = `For ${C.to} 🎀`;


function tryOpen() {

  const password =
    $("pw").value.trim().toLowerCase();

  if (password === C.password.toLowerCase()) {

    $("err").textContent = "";

    go("home");

    createConfetti();

  } else {

    $("err").textContent =
      "Hehe, not quite. Try again, cutie! 💗";

    $("pw").focus();

  }

}


$("open").onclick = tryOpen;


$("pw").addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      tryOpen();

    }

  }
);


/* =========================================
   LOVE LETTER
========================================= */

let letterShown = false;


function showLetter() {

  if (letterShown) {
    return;
  }

  letterShown = true;

  const container = $("letterText");

  container.textContent = "";

  let index = 0;


  function typeLetter() {

    if (index < C.letter.length) {

      container.textContent +=
        C.letter[index];

      index++;

      setTimeout(
        typeLetter,
        18
      );

    }

  }


  typeLetter();

}


/* =========================================
   OUR STORY
========================================= */

function renderStory() {

  const container = $("storyList");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  C.story.forEach((item, index) => {

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "story-item";


    const title =
      document.createElement("h3");

    title.textContent =
      item.d;


    const description =
      document.createElement("p");

    description.textContent =
      item.x;


    const polaroid =
      document.createElement("div");

    polaroid.className = "pol";


    const photo =
      document.createElement("div");

    photo.className = "ph";


    /*
      If an image exists,
      show it as the background.
    */

    if (item.img) {

      photo.style.backgroundImage =
        `url("images/${item.img}")`;

    } else {

      photo.innerHTML = "📸";

    }


    const caption =
      document.createElement("div");

    caption.className =
      "caption";

    caption.textContent =
      item.d;


    polaroid.appendChild(photo);

    polaroid.appendChild(caption);

    wrapper.appendChild(title);

    wrapper.appendChild(description);

    wrapper.appendChild(polaroid);

    container.appendChild(wrapper);

  });

}


/* =========================================
   LOVE JAR
========================================= */

let lastReason = -1;


function getRandomReason() {

  if (!C.reasons.length) {
    return "";
  }


  let randomIndex;


  do {

    randomIndex =
      Math.floor(
        Math.random() *
        C.reasons.length
      );

  } while (
    C.reasons.length > 1 &&
    randomIndex === lastReason
  );


  lastReason = randomIndex;

  return C.reasons[randomIndex];

}


$("reasonBtn").addEventListener(
  "click",
  () => {

    const reason =
      $("reason");

    reason.style.opacity = "0";


    setTimeout(() => {

      reason.textContent =
        getRandomReason();

      reason.style.opacity = "1";

    }, 150);

  }
);


/* =========================================
   COUPONS
========================================= */

function renderCoupons() {

  const container =
    $("couponList");

  container.innerHTML = "";


  C.coupons.forEach(
    (coupon, index) => {

      const item =
        document.createElement("div");

      item.className =
        "coupon";


      item.innerHTML = `

        <div class="icon">
          ${coupon.i}
        </div>

        <h3>
          ${coupon.t}
        </h3>

        <p>
          ${coupon.d}
        </p>

      `;


      container.appendChild(item);

    }
  );

}


/* =========================================
   SURPRISE
========================================= */

$("surpriseBtn").addEventListener(
  "click",
  () => {

    $("finale").textContent =
      C.finale;

    $("gift").textContent =
      "💝";

    createConfetti();

  }
);


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

  const symbols = [
    "💗",
    "💕",
    "💖",
    "✨",
    "🎀",
    "🌸"
  ];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const confetti =
      document.createElement("div");

    confetti.className =
      "confetti";

    confetti.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    confetti.style.left =
      Math.random() * 100 + "vw";


    confetti.style.top =
      "-20px";


    confetti.style.fontSize =
      12 +
      Math.random() * 15 +
      "px";


    confetti.style.animationDuration =
      1.8 +
      Math.random() * 2 +
      "s";


    document.body.appendChild(
      confetti
    );


    setTimeout(() => {

      confetti.remove();

    }, 4500);

  }

}


/* =========================================
   INITIAL SETUP
========================================= */

function initialize() {

  /*
    Make sure the lock page is visible
    when the website first opens.
  */

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active");

    });


  $("lock").classList.add("active");


  /*
    Prepare content
  */

  renderStory();

  renderCoupons();

}


initialize();