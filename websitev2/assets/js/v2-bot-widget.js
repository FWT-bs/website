class HotelChataiWidget extends HTMLElement {
  connectedCallback() {
    this.connected = true;
    this.attached = false;

    if (document.readyState === 'complete') {
      this.attach_();
    } else {
      this.attach_fn = () => this.attach_();
      window.addEventListener('load', this.attach_fn);
    }
  }

  disconnectedCallback() {
    this.connected = false;
    // Clean up the event listener when the element is removed.
    window.removeEventListener('load', this.attach_fn);
    if (this.attached) {
      window.removeEventListener('message', this.messageHandler, false);
    }
  }

  attach_() {
    this.attached = true;
    // Create a shadow DOM to encapsulate the component.
    const shadow = this.attachShadow({ mode: 'open' });

    // Set up a message listener to handle resizing from the iframe.
    this.messageHandler = (e) => {
      const prefix = 'hotelchatai-size:';
      if (typeof e.data === 'string' && e.data.includes(prefix)) {
        const data = JSON.parse(e.data.replace(prefix, ''));
        if (this.iframeEl) {
          this.iframeEl.style.width = data.width;
          this.iframeEl.style.height = data.height;
        }
      }
    };
    window.addEventListener('message', this.messageHandler, false);

    // Get configuration from the element's dataset or from a global config.
    const bot = window.hotelchataiConfig?.bot ?? this.dataset.bot ?? '';
    const theme = window.hotelchataiConfig?.theme ?? this.dataset.theme ?? '';
    const enableTickets = window.hotelchataiConfig?.enableTickets ?? this.dataset.enabletickets ?? '';
    const displayName = window.hotelchataiConfig?.name ?? this.dataset.name ?? '';
    console.log('theme', theme);
    console.log('bot', bot);
    console.log('enableTickets', enableTickets);
    console.log('displayName', displayName);


    // Build the iframe's source URL.
    const iframeSrc = (
      `https://v2.hotelchatai.com/?bot=${encodeURIComponent(bot)}&theme=${encodeURIComponent(theme)}` +
      `&enableTickets=${encodeURIComponent(enableTickets)}&displayName=${encodeURIComponent(displayName)}`
    );

    // Create the iframe element.
    const iframeEl = document.createElement('iframe');
    iframeEl.src = iframeSrc;
    iframeEl.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    iframeEl.setAttribute('allowTransparency', 'true');
    iframeEl.id = 'hotelchatai-iframe';
    // Set inline styles matching your original bot.js.
    Object.assign(iframeEl.style, {
      position: 'fixed',
      right: '0',
      bottom: '0',
      border: 'none',
      width: '0',
      height: '0',
      maxWidth: '100%',
      maxHeight: '100dvh',
      zIndex: '2147483647',
      colorScheme: 'auto'
    });

    // Save reference for later use and append it to the shadow DOM.
    this.iframeEl = iframeEl;
    shadow.appendChild(iframeEl);
  }
}

// Register the custom element.
customElements.define('hotelchatai-widget', HotelChataiWidget);
