function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://v2.hotelchatai.com/bot.js';
    script.async = true;
    document.body.appendChild(script);
}
  
if (document.readyState === 'complete') {
    loadScript();
} else {
    window.addEventListener('load', loadScript);
}