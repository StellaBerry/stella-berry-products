(function () {
  function normalize(url) {
    return new URL(url, window.location.href).href;
  }

  function bindLanguageSelect() {
    var select = document.querySelector("[data-language-select]");
    if (!select) return;
    select.addEventListener("change", function () {
      var next = select.value;
      if (!next) return;
      var target = normalize(next);
      if (target !== window.location.href) {
        window.location.href = target;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLanguageSelect);
  } else {
    bindLanguageSelect();
  }
}());
