let hotelHelperScript = document.currentScript;

function loadScripts(urls, callback) {
  let waiting = urls.length;
  for (let url of urls) {
    let script = document.createElement('script');
    script.setAttribute('src', url);
    script.addEventListener('load', () => {
      if (!--waiting) callback();
    });
    document.body.appendChild(script);
  }
}

loadScripts([
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js',
  'https://challenges.cloudflare.com/turnstile/v0/api.js',
], () => {


$('head').append(`
  <script>tailwind.config = {darkMode: 'selector', prefix: 'tw-'}</script>
  <style>#helper *{z-index:1000000000;}.back_2_top{left:15px!important;}</style>
`);
$('html').addClass('tw-dark').css('color-scheme', 'dark');

const TURNSTILE_KEYS = [
  '0x4AAAAAAAgUy1r4aTn9g0my',
  '0x4AAAAAAAgm1bM3TuyVObAy',
  '0x4AAAAAAAgm3UZQWSxcZ4wk',
  '0x4AAAAAAAiB1b81_WCoFAmr',
];
const HOTEL_TURNSTILES = {
  'b7': 0, 'journey': 0, 'bchic': 0, 'bfun': 0, 
  'b6': 1, 'bnight': 1, 'bstay': 1, 'ijourney': 1, 'roumei': 1,
  'starbeauty': 2, 'website': 2, 'o09': 3, 'r13' : 3, 'o11' : 3, 'o12' : 3, 'r12' : 3,
};

const $script = $(hotelHelperScript);
const URL_BASE = 'https://api.hotelchatai.com/';  // MUST END WITH SLASH
// const URL_BASE = 'http://localhost:8080/';  // MUST END WITH SLASH
const BOT_ID = $script.attr('bot');
if (!Object.hasOwn(HOTEL_TURNSTILES, BOT_ID)) return;
const TURNSTILE_KEY = TURNSTILE_KEYS[HOTEL_TURNSTILES[BOT_ID]];
// console.log('turnstile key'+TURNSTILE_KEY);

$('body').append(`
<div id='helper'>
  <div id='helper-activate' class='helper-visible tw-fixed tw-right-0 tw-bottom-0 [&.helper-visible]:tw--bottom-32 tw-p-6 tw-w-28 tw-h-28 tw-pointer-events-none tw-duration-500 tw-ease-in-out'>
    <button id='helper-activate-button' class='tw-rounded-full tw-shadow-lg hover:tw-opacity-80 hover:tw-brightness-105 active:tw-opacity-50 active:tw-brightness-110 active:tw-scale-90 tw-pointer-events-auto tw-duration-300 tw-ease-out'>
      <img src='https://cdn.jsdelivr.net/gh/jwseph/random/chaticon.png' class='tw-rounded-full' draggable='false'>
    </button>
  </div>
  <div id='helper-box' class='tw-group/helper-box tw-hidden tw-fixed tw-w-full tw-h-full tw-right-0 tw-bottom-0 tw-translate-y-32 tw-opacity-0 [&.helper-visible]:tw-translate-y-0 [&.helper-visible]:tw-opacity-100 tw-p-6 tw-flex tw-flex-col tw-justify-end tw-items-end tw-pointer-events-none tw-duration-500 tw-ease-in-out'>
    <div class='tw-min-w-0 tw-max-w-full tw-min-h-0 tw-max-h-full tw-overflow-clip tw-bg-neutral-100 dark:tw-bg-neutral-700 tw-flex tw-flex-col tw-rounded-3xl group-[&.helper-visible]/helper-box:tw-pointer-events-auto tw-shadow-2xl tw-shadow-neutral-800/50 dark:tw-shadow-black'>
      <div class='tw-min-w-0 tw-max-w-full tw-w-96 tw-min-h-24 tw-p-6 tw-bg-white dark:tw-bg-neutral-600 tw-z-10 tw-shadow-lg tw-shadow-neutral-400/20 dark:tw-shadow-neutral-950/20 tw-flex tw-items-center tw-gap-4' style='z-index:1000000001!important;'>
        <div class='tw-w-12 tw-h-12'>
          <div class='tw-absolute tw-drop-shadow-sm'>
            <div class='tw-absolute tw-right-0 tw-bottom-0 tw-w-3 tw-h-3 tw-rounded-full tw-bg-white dark:tw-bg-neutral-600 tw-flex tw-flex-col tw-justify-center tw-items-center'>
              <div class='tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-700 dark:tw-bg-green-400'></div>
            </div>
            <img src='https://cdn.jsdelivr.net/gh/jwseph/random/chaticon.png' class='tw-w-12 tw-h-12 tw-rounded-full'>
          </div>
        </div>
        <div class='tw-grow'>
          <h1 class='tw-text-lg tw-font-bold tw-text-neutral-800 dark:tw-text-neutral-100'>Assistant</h1>
          <div class='tw-text-sm tw-text-green-700 dark:tw-text-green-400 tw-flex tw-items-center tw-gap-2'>
            <div>Online</div>
          </div>
        </div>
        <div class='tw-min-h-full tw-flex tw-items-center tw-gap-2'>
          <button id='helper-reset-button' class='tw-p-1 tw-text-neutral-600 dark:tw-text-neutral-300 hover:tw-opacity-80 active:tw-opacity-50 tw-duration-200 tw-ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> 
          </button>
          <button id='helper-close-button' class='tw-p-1 tw-text-neutral-600 dark:tw-text-neutral-300 hover:tw-opacity-80 active:tw-opacity-50 tw-duration-200 tw-ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>
      <div id='helper-message-box' class='tw-min-h-0 tw-h-[32rem] tw-max-w-96 tw-px-6 tw-scroll-py-8 tw-py-8 tw-overflow-auto tw-flex tw-flex-col tw-gap-4'>
        <div id='helper-ellipsis' class='tw-order-last tw-group tw-flex tw-flex-col tw-gap-2 [&.helper-from-user]:tw-items-end' style='display: none;'>
          <div class='tw-flex group-[&.helper-from-user]:tw-justify-end tw-items-center tw-gap-1.5'>
            <img src='https://cdn.jsdelivr.net/gh/jwseph/random/chaticon.png' class='tw-w-4 tw-h-4 tw-rounded-full group-[&.helper-from-user]:tw-hidden'>
            <div class='tw-text-sm tw-text-neutral-800 dark:tw-text-neutral-100 group-[&.helper-from-user]:tw-hidden'>Assistant</div>
            <div class='tw-text-sm tw-text-neutral-800 dark:tw-text-neutral-100 tw-hidden group-[&.helper-from-user]:tw-block'>You</div>
          </div>
          <div class='helper-text-box tw-min-w-0 tw-max-w-full tw-w-fit tw-flex tw-items-center tw-bg-white dark:tw-bg-neutral-600 tw-text-neutral-800 dark:tw-text-neutral-100 group-[&.helper-from-user]:tw-bg-blue-500 group-[&.helper-from-user]:tw-text-white tw-px-4 tw-rounded-sm tw-rounded-b-xl group-[&:not(.helper-from-user)]:tw-rounded-tr-xl group-[&.helper-from-user]:tw-rounded-tl-xl tw-shadow-sm tw-shadow-neutral-400/5 dark:tw-shadow-neutral-950/5'>
            <div class='tw-inline-block tw-align-baseline tw-py-3 tw-animate-bounce' style='animation-delay:-200ms'>
              <div class='tw-w-2 tw-h-2 tw-rounded-full tw-bg-neutral-400'></div>
            </div>
            <div class='tw-inline-block tw-align-baseline tw-py-3 tw-animate-bounce tw-pl-1.5' style='animation-delay:-100ms'>
              <div class='tw-w-2 tw-h-2 tw-rounded-full tw-bg-neutral-400'></div>
            </div>
            <div class='tw-inline-block tw-align-baseline tw-py-3 tw-animate-bounce tw-pl-1.5'>
              <div class='tw-w-2 tw-h-2 tw-rounded-full tw-bg-neutral-400'></div>
            </div>
            <div class='tw-inline-block tw-py-3'>
              &ZeroWidthSpace;
            </div>
          </div>
        </div>
      </div>
      <div class='tw-min-h-16 tw-max-w-96 tw-bg-white dark:tw-bg-neutral-600 tw-text-neutral-800 dark:tw-text-neutral-100 tw-flex tw-border-2 tw-border-transparent focus-within:tw-border-blue-500 dark:focus-within:tw-border-blue-400 tw-rounded-b-3xl tw-shadow-xl dark:tw-shadow-2xl tw-shadow-slate dark:tw-shadow-black tw-z-10' style='z-index:1000000001!important;'>
        <form id='helper-form' class='tw-min-w-0 tw-flex-1 tw-pl-6'>
          <input type='text' id='helper-input' class='tw-w-full tw-h-full tw-text-base tw-outline-none tw-bg-transparent placeholder:tw-text-neutral-300 dark:placeholder:tw-text-neutral-400' placeholder='Enter message...'>
          <input type='submit' class='tw-hidden'>
        </form>
        <button id='helper-send-button' class='tw-pr-6 tw-pl-4 tw-flex tw-justify-center tw-items-center [&.helper-can-send]:hover:tw-opacity-80 disabled:tw-opacity-50 [&.helper-can-send]:active:tw-opacity-50 tw-duration-200 tw-ease-in-out' disabled='true'>
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal">
            <path d="m3 3 3 9-3 9 19-9Z" class="!tw-text-blue-500 dark:!tw-text-blue-400 group-[.helper-can-send]:!tw-text-blue-500 dark:group-[.helper-can-send]:!tw-text-blue-400"/>
            <path d="M6 12h16" class="!tw-text-blue-500 dark:!tw-text-blue-400 group-[.helper-can-send]:!tw-text-blue-500 dark:group-[.helper-can-send]:!tw-text-blue-400"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div id='helper-message-template' class='tw-hidden tw-group tw-flex tw-flex-col tw-gap-2 [&.helper-from-user]:tw-items-end'>
    <div class='tw-flex group-[&.helper-from-user]:tw-justify-end tw-items-center tw-gap-1.5'>
      <img src='https://cdn.jsdelivr.net/gh/jwseph/random/chaticon.png' class='tw-w-4 tw-h-4 tw-rounded-full group-[&.helper-from-user]:tw-hidden'>
      <div class='tw-text-sm tw-text-neutral-800 dark:tw-text-neutral-100 group-[&.helper-from-user]:tw-hidden'>Assistant</div>
      <div class='tw-text-sm tw-text-neutral-800 dark:tw-text-neutral-100 tw-hidden group-[&.helper-from-user]:tw-block'>You</div>
    </div>
    <div class='helper-text-box tw-min-w-0 tw-max-w-full tw-w-fit tw-bg-white dark:tw-bg-neutral-600 tw-text-neutral-800 dark:tw-text-neutral-100 tw-text-base group-[&.helper-from-user]:tw-bg-blue-500 dark:group-[&.helper-from-user]:tw-bg-blue-500 group-[&.helper-from-user]:tw-text-white tw-px-4 tw-py-3 tw-rounded-sm tw-rounded-b-xl group-[&:not(.helper-from-user)]:tw-rounded-tr-xl group-[&.helper-from-user]:tw-rounded-tl-xl tw-shadow-sm tw-shadow-neutral-400/5 dark:tw-shadow-neutral-950/5 tw-whitespace-wrap [&.helper-from-user]:tw-whitespace-pre-wrap tw-break-words'>
    </div>
  </div>
</div>
`);

let widgetId = turnstile.render('#helper', { sitekey: TURNSTILE_KEY });  // turnstile widget id

const md = markdownit();
function getMarkdown(text, caret = false) {
  let $el = $('<div>'+md.render(text).trim()+'</div>');
  $el.find('a').addClass('tw-underline tw-underline-offset-2 tw-decoration-neutral-400').attr('target', '_blank');
  $el.find('ul').addClass('tw-list-disc tw-pl-4');
  $el.find('ol').addClass('tw-list-decimal tw-pl-4');
  if (caret) {
    let descendants = $el.find('p:last-child, li:last-child')
    if (descendants.length) {
      descendants[descendants.length-1].innerHTML += '|';
    }
  }
  return $el;
}

const showButton = () => $('#helper-activate').removeClass('helper-visible');
const hideButton = () => $('#helper-activate').addClass('helper-visible');
const showChat = () => {
  localStorage.setItem('wasShowing', true);
  // turnstile.reset();
  return $('#helper-box').addClass('helper-visible');
};
const hideChat = () => {
  localStorage.removeItem('wasShowing');
  return $('#helper-box').removeClass('helper-visible');
};

setTimeout(() => $('#helper-box').removeClass('tw-hidden'), 1);
setTimeout(() => {
  localStorage.getItem('wasShowing') ? showChat() : showButton();
}, 1000);

$('#helper-activate-button').on('click', () => {
  hideButton();
  setTimeout(showChat, 500);
});

$('#helper-close-button').on('click', () => {
  hideChat();
  setTimeout(showButton, 500);
});

function resetMessages() {
  if (localStorage.getItem('messages') == undefined) {
    localStorage.setItem('messages', JSON.stringify([
      {
        role: 'assistant',
        content: 'Hello, how may I help you today? 😊 您好,今天有什麼需要幫忙的嗎? 😊',
      },
    ]));
  }
  updateBlockSends(false);
  messages = JSON.parse(localStorage.getItem('messages'));
  $('#helper-message-box > :not(#helper-ellipsis)').remove();
  for (let n = messages.length, i = 0; i < n; i++) {
    addMessage(messages[i].content, messages[i].role == 'user', false);
    if (!i) {
      addSuggestions();
    }
  }
}

$('#helper-reset-button').on('click', () => {
  console.log('meow!');
  localStorage.removeItem('messages');
  resetMessages();
});

let blockSends = false;
const enableSend = () => !blockSends && $('#helper-send-button').addClass('helper-can-send').attr('disabled', false);
const disableSend = () => $('#helper-send-button').removeClass('helper-can-send').attr('disabled', true);
const refreshSend = () => $('#helper-input').val().trim() ? enableSend() : disableSend();
const updateBlockSends = (val) => {
  (blockSends = val) ? $('#helper-ellipsis').show() : $('#helper-ellipsis').hide();
  refreshSend();
};

$('#helper-input').on('input', refreshSend);

function scroll() {
  $('#helper-message-box').scrollTop($('#helper-message-box')[0].scrollHeight);
}
function updateLocalStorage() {
  let messages2 = [...messages];
  for (let i = messages2.length-1; i >= 0; i--) {
    if (!messages2[i].content) messages2.splice(i, 1);
  }
  localStorage.setItem('messages', JSON.stringify(messages2));
}
function addMessage(text, isUser, updateMessages = true) {
  let idx = messages.length;
  if (updateMessages) {
    messages.push({
      role: isUser ? 'user' : 'assistant',
      content: text,
    });
    updateLocalStorage();
  }
  let msg = $('#helper-message-template').clone().attr('id', '').removeClass('tw-hidden');
  if (isUser) {
    msg.addClass('helper-from-user');
    msg.find('.helper-text-box').text(text);
  } else {
    msg.find('.helper-text-box').html(getMarkdown(text));
    if (!text.length && !isUser) {
      msg.html($('#helper-ellipsis').html())
    }
  }
  $('#helper-message-box').append(msg);
  scroll();
  return {msg, idx};
}
const asyncIterate = (stream) => (async function* () {
  const reader = stream.getReader();
  for (;;) {
    let {done, value} = await reader.read();
    if (done) break;
    yield value;
  }
})();
async function addMessageFromStream(stream, success) {
  $('#helper-ellipsis').hide();
  const {msg, idx} = addMessage('', false);
  const decoder = new TextDecoder();
  let text = '';
  for await (const chunk of asyncIterate(stream)) {
    await new Promise(r => setTimeout(r, 40));
    text += decoder.decode(chunk);
    if (!text.length) continue;
    msg.find('.helper-text-box').addClass('tw-py-3').html(getMarkdown(text, true));
    messages[idx].content = text;
    updateLocalStorage();
    scroll();
  }
  msg.find('.helper-text-box').addClass('tw-py-3').html(getMarkdown(text));
  updateBlockSends(false);
  success(text);
}
function addSuggestions() {
  const suggestions = [
    ['🛏️ Rooms', 'What rooms do you offer?'],
    ['🪴 Amenities', 'What are some amenities I can expect?'],
    ['🗼 Attractions', 'What are some attractions I can visit nearby?'],
    ['🍽️ Restaurants', 'What are some nearby restaurants?'],
    ['🚄 Transportation', 'What are some ways I can get to the hotel?'],
    ['🛏️ 房間', '你們有提供什麼房間?'],
    ['🪴 設施', '你們有提供哪些設施?'],
    ['🗼 景點', '飯店附近有哪些景點?'],
    ['🍽️ 餐廳', '飯店附近有哪些餐廳?'],
    ['🚄 交通', '我可以透過哪些方式到達飯店?'],
  ];
  let suggestionContainer = $("<div class='tw-flex tw-flex-wrap tw-text-sm tw-gap-2'></div>");
  for (let [name, prompt] of suggestions) {
    let suggestionButton = $("<button class='tw-py-1 tw-px-2 tw-rounded-md tw-bg-white dark:tw-bg-neutral-700 tw-border tw-border-blue-500 dark:tw-border-blue-400 !tw-text-blue-500 dark:!tw-text-blue-400 hover:tw-opacity-80 active:tw-opacity-40 tw-duration-200 tw-ease-in-out'></button>");
    suggestionButton.text(name);
    suggestionButton.on('click', () => {
      if (blockSends) return;
      $('#helper-input').val(prompt);
      sendMessage();
    });
    suggestionContainer.append(suggestionButton);
  }
  $('#helper-message-box').append(suggestionContainer);
}

let messages;
resetMessages();

let resetting = 0;
async function getTurnstile() {
  if (!turnstile.isExpired(widgetId) && turnstile.getResponse(widgetId)) return turnstile.getResponse(widgetId);
  if (!resetting) turnstile.reset(widgetId);
  while (!turnstile.getResponse(widgetId)) {
    await new Promise(r => setTimeout(r, 50));
  }
  resetting = 0;
  return turnstile.getResponse(widgetId);
}

let helpAsked = 0;
function giveNeedHelp() {
  if (helpAsked) return;
  helpAsked = 1;
  // addMessage(`Need help? You can leave a note [here](${HELP_FORM_URL}), and we'll do our best to get back.`, false);
}

async function sendMessage() {
  if (blockSends) return;
  let text = $('#helper-input').val().trim();
  if (!text) return;
  $('#helper-input').val('');
  disableSend();
  updateBlockSends(true);

  addMessage(text, true);
  try {
    let cfToken = await getTurnstile();
    turnstile.reset(widgetId);
    resetting = 1;
    let resp = await fetch(URL_BASE+'get_response_stream', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        bot: BOT_ID,
        token: cfToken,
      }),
    });
    addMessageFromStream(resp.body, (respText) => {
      const flags = [
        'not have access',
        'do not know',
        '無法訪問',
        '無法提供',
        'unable to access',
        'information',
        'specific ',
      ];
      let flagged = resp.length <= 2;
      for (const flag of flags) {
        flagged |= respText.includes(flag);
      }
      if (flagged) {
        logFailure(text, respText);
        giveNeedHelp();
      }
    });
  } catch (e) {
    console.error(e);
    logFailure(text, '');
    addMessage('Sorry! An error occurred.', false);
    updateBlockSends(false);
  }

}
$('#helper-form').on('submit', (e) => {
  e.preventDefault();
  sendMessage();
});
$('#helper-send-button').on('click', sendMessage);

function corsProtect(url) {
  return 'https://corsproxy.io/?' + encodeURIComponent(url);
}
async function logFailure(userText, assistantText) {
  const FORM_ID = await $.get(URL_BASE+'get_form', {bot: BOT_ID});
  let url = corsProtect(`https://docs.google.com/forms/d/e/${FORM_ID}/viewform`);
  let text = await $.get(url);
  function getEntryName(index) {
    let params = $(text).find('div[jsmodel]').eq(index).data('params');
    let i = params.indexOf('[[')+2;
    let j = params.indexOf(',', i);
    return 'entry.' + params.substring(i, j);
  }
  $.post(corsProtect(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`), {
    [getEntryName(0)]: userText,
    [getEntryName(1)]: assistantText,
  });
}


});