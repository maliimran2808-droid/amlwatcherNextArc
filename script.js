window.addEventListener("scroll", function () {
  var bgNav = document.getElementById("nav");
  var colorNav = document.getElementById("nav-link-col");
  var searchNav = document.getElementById("search");
  var logoNav = this.document.getElementById("logo");
  if (this.window.scrollY > 10) {
    bgNav.classList.add("nav-change");
    colorNav.classList.add("color-change");
    searchNav.classList.add("change-search");
    logoNav.src = "./imgs/amlLogoBlack.svg";
  } else {
    bgNav.classList.remove("nav-change");
    colorNav.classList.remove("color-change");
    searchNav.classList.remove("change-search");
    logoNav.src = "./imgs/amlLogoWhite.svg";
  }
});
var menuBtn = document.getElementById("btnClick");
menuBtn.addEventListener("click", function () {
  var navbarToggle = document.getElementById("nav-link-col");
  navbarToggle.classList.toggle("toggleSideMenu");
});

const DURATION_MS = 3000;
const section4 = document.getElementById("section4");
const counterEls = Array.from(section4.querySelectorAll(".count"));
const counters = counterEls.map((el) => ({
  el,
  target: parseInt(String(el.dataset.target).replace(/,/g, ""), 10) || 0,
}));

let hasCountRun = false;

const formatNumber = (n) => n.toLocaleString("en-US");

function startCounters() {
  if (hasCountRun) return;
  hasCountRun = true;
  const start = performance.now();
  counters.forEach((c) => (c.el.textContent = "0"));
  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    for (const c of counters) {
      const value = Math.floor(progress * c.target);
      c.el.textContent = formatNumber(value);
    }
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      counters.forEach((c) => (c.el.textContent = formatNumber(c.target)));
    }
  }

  requestAnimationFrame(frame);
}
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        startCounters();
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: [0, 0.4, 1] }
);
observer.observe(section4);

// ---------------------------------------- STICKY VIDEO ----------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
  const desktopVideo = document.getElementById("desktop-video");
  const contentSections = document.querySelectorAll(".content-section");

  if (desktopVideo && desktopVideo.offsetParent !== null) {
    const handleVideoChange = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newVideoSrc = entry.target.getAttribute("data-video-src");
          if (desktopVideo.src !== newVideoSrc) {
            desktopVideo.src = newVideoSrc;
            desktopVideo.load();
            desktopVideo
              .play()
              .catch((error) => console.log("Autoplay was prevented:", error));
          }
        }
      });
    };
    e;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleVideoChange, options);
    contentSections.forEach((section) => {
      observer.observe(section);
    });

    if (contentSections.length > 0) {
      const firstVideoSrc = contentSections[0].getAttribute("data-video-src");
      if (firstVideoSrc) {
        desktopVideo.src = firstVideoSrc;
      }
    }
  }
});

function calculateCurrentCost() {
  const searchVolumeD = document.getElementById("searchVolume").textContent;
  const costPerCheckText = document.getElementById("dollar-sign").textContent;

  const searchVolume = parseFloat(searchVolumeD);
  const currentCost = parseFloat(costPerCheckText);

  const currentAMLCostDiv = document.getElementById("currentCost");
  const savingsFromFalsePositivesDiv = document.getElementById("annualSaving");
  const annualReductionDiv = document.getElementById("annualReduction");
  const estimatedAmlFinalDiv = document.getElementById("estimatedAmlCost");

  if (isNaN(searchVolume) || isNaN(currentCost)) {
    return;
  }
  const totalCost = searchVolume * currentCost;

  const savingsFromFalsePositives_number =
    ((searchVolume * 0.4 * 0.9 * 10) / 60) * 29;

  const annualReduction_number = parseInt(searchVolume * 0.4 * 0.05 * 0.15);

  let ourPrice;
  if (searchVolume >= 1000000) {
    ourPrice = 0.1;
  } else if (searchVolume >= 500000) {
    ourPrice = 0.15;
  } else if (searchVolume >= 300000) {
    ourPrice = 0.2;
  } else if (searchVolume >= 100000) {
    ourPrice = 0.25;
  } else if (searchVolume >= 50000) {
    ourPrice = 0.3;
  } else if (searchVolume >= 30000) {
    ourPrice = 0.4;
  } else if (searchVolume >= 10000) {
    ourPrice = 0.5;
  } else if (searchVolume >= 5000) {
    ourPrice = 0.55;
  } else if (searchVolume >= 1000) {
    ourPrice = 0.6;
  } else {
    ourPrice = 0.75;
  }

  const applicablePrice =
    0.5 * currentCost > ourPrice ? 0.5 * currentCost : ourPrice;

  const estimatedAmlCost_number =
    Math.floor(totalCost - searchVolume * applicablePrice) +
    savingsFromFalsePositives_number * 0.44;

  currentAMLCostDiv.textContent = totalCost.toLocaleString("en-US");
  savingsFromFalsePositivesDiv.textContent =
    savingsFromFalsePositives_number.toLocaleString("en-US");
  annualReductionDiv.textContent =
    annualReduction_number.toLocaleString("en-US");

  estimatedAmlFinalDiv.textContent = parseInt(
    estimatedAmlCost_number
  ).toLocaleString("en-US");
}

document.addEventListener("DOMContentLoaded", function () {
  const allSliders = document.querySelectorAll(".slider-container");

  allSliders.forEach((container) => {
    const slider = container.querySelector(".custom-slider");
    const valueThumb = container.querySelector(".value-thumb");

    function updateSlider() {
      const min = parseFloat(slider.min);
      const max = parseFloat(slider.max);
      const currentValue = parseFloat(slider.value);

      const percentage = ((currentValue - min) / (max - min)) * 100;
      container.style.setProperty("--fill-percent", `${percentage}%`);

      let formattedValue;
      if (slider.step === "0.1") {
        if (currentValue % 1 === 0) {
          formattedValue = currentValue.toFixed(0);
        } else {
          formattedValue = currentValue.toFixed(1);
        }
      } else {
        if (currentValue >= 1000) {
          formattedValue = currentValue;
        } else {
          formattedValue = currentValue.toLocaleString("en-US");
        }
      }
      valueThumb.textContent = formattedValue;

      const sliderWidth = slider.offsetWidth;
      const thumbWidth = valueThumb.offsetWidth;
      const travelDistance = sliderWidth - thumbWidth;
      const thumbPosition = (currentValue - min) / (max - min);
      const thumbLeftPosition = thumbPosition * travelDistance;

      const finalPosition = thumbLeftPosition + thumbWidth / 2;

      valueThumb.style.left = `${finalPosition}px`;
      calculateCurrentCost();
    }

    slider.addEventListener("input", updateSlider);
    updateSlider();
  });
});

const popUpCalc = document.getElementById("popUpBox");
const popUpBtn = document.getElementById("btn_popup");
const popUpClose = document.getElementById("closePopup");

popUpBtn.addEventListener("click", function () {
  popUpCalc.classList.add("showPopup");
});

popUpClose.addEventListener("click", function () {
  popUpCalc.classList.remove("showPopup");
});

const track = document.querySelector(".carousel-track");

const slides = Array.from(track.children);

const nextButton = document.getElementById("button-right");

const prevButton = document.getElementById("button-left");

const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;

const moveToSlide = (targetIndex) => {
  const amountToMove = slideWidth * targetIndex;

  track.style.transform = "translateX(-" + amountToMove + "px)";

  currentIndex = targetIndex;
};

nextButton.addEventListener("click", () => {
  let nextIndex = currentIndex + 1;

  if (nextIndex >= slides.length) {
    nextIndex = 0;
  }
  moveToSlide(nextIndex);
});

prevButton.addEventListener("click", () => {
  let prevIndex = currentIndex - 1;

  if (prevIndex < 0) {
    prevIndex = slides.length - 1;
  }

  moveToSlide(prevIndex);
});
