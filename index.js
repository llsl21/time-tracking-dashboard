const panelDaily = document.getElementById("panel-daily");
const panelWeekly = document.getElementById("panel-weekly");
const panelMonthly = document.getElementById("panel-monthly");

const mq = matchMedia("(768px <= width < 1440px)");
function onChange(e) {
  const spanTags = document.querySelectorAll(".panel__time > span");
  if (e.matches) {
    spanTags.forEach((span) => {
      const hrs = span.previousSibling;
      if (hrs.length >= 3) {
        span.setAttribute("style", "font: var(--text-preset-2)");
      }
    });
  } else {
    spanTags.forEach((span) => span.removeAttribute("style"));
  }
}
mq.addEventListener("change", onChange);
onChange(mq);

function appendItem(data) {
  let daily = "",
    weekly = "",
    monthly = "";

  data.forEach(({ title, timeframes: { daily: d, weekly: w, monthly: m } }) => {
    daily += `<div class="panel panel__${title
      .toLowerCase()
      .replace(/\s+/g, "-")}">
    <div class="panel__content">
            <h3 class="panel__heading">${title}</h3>
            <button class="panel__button">
              <img src="images/icon-ellipsis.svg" />
            </button>
            <p class="panel__time">${d.current}hrs</p>
            <p class="panel__previous">Yesterday - ${
              d.previous
            }<span>hrs</span></p>
          </div></div>`;

    weekly += `<div class="panel panel__${title
      .toLowerCase()
      .replace(/\s+/g, "-")}"><div class="panel__content">
            <h3 class="panel__heading">${title}</h3>
            <button class="panel__button">
              <img src="images/icon-ellipsis.svg" />
            </button>
            <p class="panel__time">${w.current}hrs</p>
            <p class="panel__previous">Last Week - ${
              w.previous
            }<span>hrs</span></p>
          </div></div>`;

    monthly += `<div class="panel panel__${title
      .toLowerCase()
      .replace(/\s+/g, "-")}"><div class="panel__content">
            <h3 class="panel__heading">${title}</h3>
            <button class="panel__button">
              <img src="images/icon-ellipsis.svg" />
            </button>
            <p class="panel__time">${m.current}<span>hrs</span></p>
            <p class="panel__previous">Last Month - ${
              m.previous
            }<span>hrs</span></p>
          </div></div>`;
  });

  panelDaily.innerHTML = daily;
  panelWeekly.innerHTML = weekly;
  panelMonthly.innerHTML = monthly;
}

const tabs = document.querySelectorAll('button[role="tab"');
const tabsContainer = document.querySelector('[role="tablist"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    // セレクトされていたtabのaria-selectedをfalseにする
    const tabSelected = tabsContainer.querySelector('[aria-selected="true"]');
    tabSelected.setAttribute("aria-selected", "false");

    // 今セレクトしているtabのaria-selectedをtrueにする
    // 今セレクトしているtabのaria-controlsをgetする
    tab.setAttribute("aria-selected", "true");
    const panelSelectingId = tab.getAttribute("aria-controls");
    console.log(panelSelectingId);

    // セレクトされたいたtabのaria-controlsをgetする
    // セレクトされていたtabのpanelのDOMのhidden属性をremoveする
    tabSelectedId = tabSelected.getAttribute("aria-controls");
    const panelSelectedDOM = document.getElementById(tabSelectedId);
    panelSelectedDOM.setAttribute("hidden", "");

    // 今セレクトしているtabのpanelのDOMをgetする
    const panelSelectingDOM = document.getElementById(panelSelectingId);
    panelSelectingDOM.removeAttribute("hidden");
  });
});

fetch("/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    appendItem(data);
  });
