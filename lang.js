// Shows Swedish for visitors whose browser language is Swedish, English for everyone else.
// The visitor can switch with the button; the choice is remembered.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var param = new URLSearchParams(location.search).get("lang");
  var browser = (navigator.language || "en").toLowerCase().indexOf("sv") === 0 ? "sv" : "en";
  var lang = param === "sv" || param === "en" ? param : (stored || browser);

  function apply(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    var t = document.querySelector("title[data-" + l + "]");
    if (t) document.title = t.getAttribute("data-" + l);
  }
  apply(lang);

  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    var btn = document.querySelector(".lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      lang = lang === "sv" ? "en" : "sv";
      try { localStorage.setItem("lang", lang); } catch (e) {}
      apply(lang);
    });
  });
})();
