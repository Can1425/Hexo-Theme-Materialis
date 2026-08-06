(function initFancybox() {
  if (typeof window.jQuery !== 'function' || !window.jQuery.fn || typeof window.jQuery.fn.fancybox !== 'function') {
    window.addEventListener('load', initFancybox, { once: true });
    return;
  }

  window.jQuery(function ($) {
    $('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return;
      if ($(this).hasClass('nofancybox')) return;
      if ($(this).closest('s-avatar').length) return;
      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
      $(this).wrap('<a href="' + ($(this).attr('data-src') == null ? this.src : $(this).attr('data-src')) + '" title="' + alt + '" class="fancybox"></a>');
    });
    $('.fancybox').attr('rel', 'article');
    $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']").attr('rel', 'gallery').fancybox({
      helpers: { title: { type: 'inside' } }
    });
  });
})();
