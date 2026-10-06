/* Revela os blocos .reveal por três caminhos: IntersectionObserver, varredura a cada
   scroll/resize/load e um prazo final. Sem JS, o CSS não esconde nada (ver .js-reveal). */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!items.length) return;

  function show(el) { el.classList.add('is-in'); }

  function sweep() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    items = items.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.95 && r.bottom > 0) { show(el); return false; }
      return !el.classList.contains('is-in');
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep);
  window.addEventListener('load', sweep);
  sweep();

  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(show);
  }, 2500);
})();
