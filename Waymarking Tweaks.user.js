// ==UserScript==
/* globals showdown */
// @name         Waymarking Tweaks
// @namespace    http://github.com/MaxEtMoritz/WaymarkingTweaks
// @version      0.4
// @description  tweak the waymarking.com site.
// @author       GPSKaninchen
// @match        http*://www.waymarking.com/*
// @run-at       document-start
// @icon         https://www.waymarking.com/images/homepage/biglogo.gif
// @updateURL    https://github.com/MaxEtMoritz/WaymarkingTweaks/raw/main/Waymarking%20Tweaks.user.js
// @downloadURL  https://github.com/MaxEtMoritz/WaymarkingTweaks/raw/main/Waymarking%20Tweaks.user.js
// @grant        none
// ==/UserScript==
function setup() {
  console.debug('setup');
  // append style to document head.
  var css = document.createElement('style');
  css.textContent = `
  #sidebar.sidebarHidden .gutter {
    display: none;
  }
  #sidebar .gutter {
    grid-column: 2;
    overflow: auto;
  }
  #sidebar {
    position: fixed;
    right: 0;
    top: 10vmin;
    bottom: 0;
    display: grid;
    width: auto;
    min-width: unset;
    max-width: min(90vw, 370px);
  }
  #accountBtn {
    background-image: none;
  }
  #toggleSidebar {
    grid-column: 1;
    width: 1.5rem;
    padding: 0;
    background: linear-gradient(#56849b, lightblue);
  }
  #content {
    width: calc(100% - 1.5rem);
    margin-top: 10vmin;
  }
  #wrap {
    max-width: unset;
    min-width: unset;
  }
  .bannerimage {
    display: none;
  }
  #header {
    display: none;
  }
  #searchtabs {
    position: inherit;
  }
  #mobileHeader {
    width: 100%;
    position: fixed;
    background-color: #56849b;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 5;
  }
  #mobileNav.navHidden li {
    display: none;
  }
  #mobileHeader ul {
    margin-block: 0;
    list-style: none;
    padding-inline: 0;
    text-align: center;
  }
  #mobileHeader ul li {
    margin: 10px;
  }
  #mobileHeader ul li a {
    display: block;
    padding: 3vmin;
    color: #333;
    text-decoration: none;
    border: 1px outset #ccc;
    background: #f9e9a9 url(/images/blue.gif) repeat-x top left;
  }
  #mobileHeader ul li a:hover {
    color: #333;
    border-color: #ccc;
    background: #fff url(/images/yellow.gif) repeat-x top left;
  }
  #mobileLogo,
  #mobileProfile img,
  #mobileNavBtn img {
    max-width: 100%;
    max-height: 100%;
    height: 10vmin;
  }
  #mobileProfile {
    float: right;
    margin-right: 10px;
    padding: 0;
  }
  #mobileNavBtn {
    margin-left: 10px;
    margin-right: calc(50% - 15vmin - 10px);
    padding: 0;
  }
  #mobileHeader button {
    color: #333;
    text-decoration: none;
    border: 1px outset #ccc;
    background: #f9e9a9 url(/images/blue.gif) repeat-x top left;
  }
  #AccountActions.profileHidden > li {
    display: none;
  }
  #search_addresstextbox {
    position: relative;
  }
  #search_options{
    left: unset;
  }
  .home-banner {
    display: none;
  }
  #pushwrapper {
    min-width: unset;
  }
  #footerlinks {
    width: auto;
  }
  body {
    padding: 0px;
    width: 100%;
  }
  * {
    min-width: unset;
    overflow-wrap: break-word;
  }
  *:not(textarea){
    white-space: normal;
  }
  #ctl00_ContentBody_HuntUserGridControl1_uxGrid * {
    margin: 0;
    padding: 0;
    width: auto;
    font-weight: normal;
    font-size: inherit;
  }
  select[id*="WMTweaks-inserted"]{
    margin-right: 1%;
  }`;
  document.head.append(css);
  if (navigator.geolocation) {
    //My Location Button(Waymark Search Filter)
    if (document.getElementById('ctl00_ContentBody_FilterControl1_uxSearchLocation')) {
      let input = document.getElementById('ctl00_ContentBody_FilterControl1_uxSearchLocation');
      let btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'InsertMyLocationSearch';
      btn.innerText = 'My Location';
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          input.value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      input.after(btn);
    }

    //My Location Button(Scavenger Hunt Search)
    if (document.getElementById('ctl00_ContentBody_NewSearchControl1_txtGames')) {
      let input = document.getElementById('ctl00_ContentBody_NewSearchControl1_txtGames');
      let btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'InsertMyLocationScaveng';
      btn.innerText = 'My Location';
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          input.value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      input.after(btn);
    }

    //My Location Button (Homepage etc.)
    if (document.getElementById('ctl00_ContentBody_NewSearchControl1_txtAddress')) {
      let input = document.getElementById('ctl00_ContentBody_NewSearchControl1_txtAddress');
      let btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'InsertMyLocationWaym';
      btn.innerText = 'My Location';
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          input.value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      input.after(btn);
    }
  }

  // special handling for profile table
  if (document.getElementById('ctl00_ContentBody_ProfilePanel1_pnlProfile')) {
    let td =
      document.getElementById('ctl00_ContentBody_ProfilePanel1_pnlProfile').firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild // div // table // tbody // tr // td // table // tbody
        .firstElementChild.lastElementChild; // tr // second td

    let newRow = document.createElement('tr');
    td.align = 'left';
    td.parentElement.after(newRow);
    newRow.append(td);
  }

  // Look for "HTML enabled?" checkboxes
  const HTMLBoxes = document.querySelectorAll('input[type="checkbox"][id*="IsHTML" i]');
  if(HTMLBoxes.length > 0) {
    // add showdown-js javascript
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js';
    script.crossOrigin = 'anonymous';
    script.addEventListener('load',()=>{console.debug('showdown script loaded.'); showdown.setFlavor('original');})
    document.head.append(script);
    HTMLBoxes.forEach((/**@type{HTMLInputElement}*/box) => {
      let dropdown = document.createElement('select');
      // plain text option
      let option = document.createElement('option');
      option.text = 'Plain text';
      option.value = 'plain';
      dropdown.append(option);
      // HTML option
      option = document.createElement('option');
      option.text = 'HTML';
      option.value = 'html';
      dropdown.append(option);
      // Markdown option
      option = document.createElement('option');
      option.text = 'Markdown';
      option.value = 'md';
      if(box.checked){
        dropdown.value = 'html';
      }
      dropdown.append(option);
      dropdown.id = box.id + '_WMTweaks-inserted';
      let previousValue = dropdown.value;
      dropdown.addEventListener('focus',(e)=>{previousValue = e.target.value;})
      dropdown.addEventListener('change',(/**@type{Event}*/evt) => {
        const dd = evt.target;
        let originalTArea = box.parentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector('textarea');
        const mdArea = originalTArea.parentElement.querySelector('.WMTweaks-inserted');
        switch (dd.value) {
          case 'plain':
            box.checked = false;
            if(mdArea){
              originalTArea.value = mdArea.value;
              originalTArea.dispatchEvent(new Event('paste'));
              originalTArea.style.display = null;
              mdArea.parentNode.removeChild(mdArea);
            }
            // TODO: probably call SetIsDirty()? or is that wrong? (is on the click handler of the checkboxes)
            break;
          case 'html':
            box.checked = true;
            if(mdArea){
              const converter = new showdown.Converter();
              originalTArea.value = converter.makeHtml(mdArea.value);
              originalTArea.dispatchEvent(new Event('paste'));
              originalTArea.style.display = null;
              mdArea.parentNode.removeChild(mdArea);
            }
            // TODO: probably call SetIsDirty()? or is that wrong? (is on the click handler of the checkboxes)
            break;
          case 'md':
            box.checked = true;
            // find the corresponding textarea!
            let newArea = document.createElement('textarea');
            newArea.rows = originalTArea.rows;
            newArea.cols = originalTArea.cols;
            newArea.classList.add('WMTweaks-inserted');
            newArea.addEventListener('change',(e)=>{
              // TODO: Update x of y chars used!
              console.debug('change');
              const converter = new showdown.Converter();
              originalTArea.value = converter.makeHtml(e.target.value);
              originalTArea.dispatchEvent(new Event('paste'));
            });
            if(originalTArea.value){
              if(previousValue == 'html'){
              // parse html to markdown
              const converter = new showdown.Converter();
              newArea.value = converter.makeMarkdown(originalTArea.value);
              } else{
                // copy the text
                newArea.value = originalTArea.value;
              }
            }
            originalTArea.after(newArea);
            originalTArea.style.display = 'none';
            break;
          default:
            console.error('Unknown dropdown value ' + dd.value);
            break;
        }
        previousValue = dd.value;
      })
      box.parentElement.prepend(dropdown);
      let lbl = document.createElement('label');
      lbl.htmlFor = box.id + '_WMTweaks-inserted';
      lbl.innerText = 'Format: '
      dropdown.before(lbl);
      let td = box.parentElement.parentElement;
      let span = document.createElement('div');
      //span.style.float = 'right';
      Array.from(td.children).forEach((e)=>{span.append(e);})
      td.previousElementSibling.append(span);
      // hide checkbox and label
      box.style.display = 'none';
      box.nextElementSibling.style.display = 'none';
    })
  }
console.debug(window.location.pathname == '/help/default.aspx');
console.debug(window.location.search.indexOf('HTML Enabled'));
console.debug(window.location.search);
  // if help page for HTML enabled checkbox, display help for dropdown instead.
  if(window.location.pathname == '/help/default.aspx' && window.location.search.indexOf('HTML%20Enabled')!=-1){
    document.title = 'Format?'
    let parent = document.querySelector('font');
    parent.lastChild.remove();
    let span = document.createElement('span');
    span.innerHTML = `This dropdown lets you select the format of your content.<br/>
    The options are:
    <ul>
    <li>Plain Text: Your content is submitted as raw text and will display exactly like you entered it.</li>
    <li>HTML: Your content is assumed to be in HTML format. Selecting this option when your content is not in HTML format could cause your content to display improperly.</li>
    <li>Markdown: Your content is assumed to be in Markdown format. It will be converted to HTML before it is submitted to the server. A short overview about the Markdown syntax can be found on <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">markdownguide.org</a></li>
    </ul>
    You can safely switch between Markdown and HTML, your Input will be converted from HTML to Markdown and vice versa.`
    parent.append(span);
  }

  //set max width to prevent overflow
  updateMaxWidth();

  // special handling for category grid
  if (document.getElementById('ctl00_ContentBody_GridPanel1_tblGrid')) {
    let table = document.getElementById('ctl00_ContentBody_GridPanel1_tblGrid');
    let container = document.createElement('div');
    container.style.overflow = 'auto';
    table.before(container);
    container.appendChild(table);
  }
  if(document.getElementById('header')){
  //do a custom header
  var hdr = document.createElement('div');
  hdr.id = 'mobileHeader';
  //Nav Menu Button
  let toggleNav = document.createElement('button');
  toggleNav.type = 'button';
  toggleNav.id = 'mobileNavBtn';
  let menuImg = document.createElement('img');
  menuImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAK0lEQVRYw+3TQQ0AAAgDsfk3DR4IDxLaCdjrEoBramkO5gegZCWD0JQMfNZHz65gLSCfwQAAAABJRU5ErkJggg==';
  toggleNav.append(menuImg);
  toggleNav.onclick = function () {
    if (document.getElementById('mobileNav').classList.length > 0) {
      //show nav
      document.getElementById('mobileNav').classList.remove('navHidden');
      document.getElementById('AccountActions').classList.add('profileHidden');
    } else {
      //hide nav
      document.getElementById('mobileNav').classList.add('navHidden');
    }
  };
  hdr.append(toggleNav);

  //Logo
  let homelink = document.createElement('a');
  homelink.href = '/';
  let logo = document.createElement('img');
  logo.src = '/images/homepage/biglogo.gif';
  logo.id = 'mobileLogo';
  homelink.append(logo);
  hdr.append(homelink);
  document.getElementById('wrap')?document.getElementById('wrap').prepend(hdr):null;

  //Account details / login Button
  let accBtn = document.createElement('button');
  accBtn.type = 'button';
  accBtn.id = 'mobileProfile';
  let accImg = document.createElement('img');
  accImg.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAACvElEQVRYw+2XzUojQRDHf5EgUaKCoihByEE8Cwpxc8ppWdi9qm/gwQGVCBq85BBwniB5AfGWk/Hgim/gQdEnMILfJ3NRA2YPO93z0emZjmEDC1bfqmqquqvrX/0f+JL/QWJkKFDlkltatLjlkioFMsS6D57C5oaWZt1gk/p88FHKvGqDi/VKmdHPhF/mOTK4WM8sdxY8TsUX4I0TLHLMkCTJDDksTnjz+VSIm4YfoOb58B6LobZ+Q1jcezxrDJjt/shT3yLJUO8kRc89HZmcouLZe9boxFnPOSpRzivS9Yppn2WcEhc0aHBBiXGfbZor+d1KWPgxnuTu/eGXePFd6QtLgRTiFE+M6ROUZe2zgfAfSmt+BFJk5V2U9agVLkWffiKwe/cUEz6/otyeBt17jsNdoHNKEg07TDLJjkRAKdBRd45+r134PuqOeS1gOXf021Kz7WjOA55rjr5On5ogI/c5ErCIAk1JzZQskl9G5NkyaoKCYzpWLOYJ4NixFNQEVcdkKRbzEoHlWKpqAgGVnGIxvWSAnISpIgJis4rFtE0BZiXcFBEYaDc5TYAmJqzAgjbBYFuMRI0KIYP6BKJEaQ3Ow4adK2l9icQlL3ZFEhb1lyzadLOrBJv6NhVAO+wqwaEeaGJUNJRREWOePPuc8UCLFg+csU+eeYV4jdDQjwp32G15tAtUeNTSlUcqLHi8t8KGnTuur0kAMMepESs6ZQ6ABNdh49r74NjALu/GxOudXcCOenDcJ7PJQQBWNdb5Rgoc4rVOLQC9A5pRT6b30XfXb35p2E6cn3I8uyv00ffSlr/98iOyMb/72F0EbfETrxarRr2/6mOoHVHHJjb9od792LL2htQxSH7r5Blu6zdMXmKnA/Lbjr43qLFBljQJEqTJskFNorZj+t6DH5Ce/EL14CewJ7+xX/Lv5Q+c7qVytzIenAAAAABJRU5ErkJggg==';
  accBtn.append(accImg);
  accBtn.onclick = function () {
    if (document.getElementById('AccountActions').classList.length > 0) {
      //show account actions
      document.getElementById('AccountActions').classList.remove('profileHidden');
      document.getElementById('mobileNav').classList.add('navHidden');
    } else {
      //hide account actions
      document.getElementById('AccountActions').classList.add('profileHidden');
    }
  };
  hdr.append(accBtn);

  //Nav Menu
  let navContainer = document.createElement('ul');
  navContainer.id = 'mobileNav';
  let navElems = document.querySelectorAll('#main_nav li');
  for (let i = 0; i < navElems.length; i++) {
    let newElem = navElems[i].cloneNode(true);
    newElem.removeAttribute('id');
    navContainer.prepend(newElem);
  }
  hdr.append(navContainer);

  //Account Details/Login List
  let accList = document.createElement('ul');
  accList.id = 'AccountActions';
  if (document.getElementById('ctl00_HomePageHeaderControl1_lnkLoginName') || document.getElementById('ctl00_HeaderControl1_lnkLoginName')) {
    let profItem = document.createElement('li');
    let profLink = document.createElement('a');
    profLink.href = '/users/profile.aspx';
    profLink.innerText = 'My Profile';
    profItem.append(profLink);
    accList.append(profItem);
  }
  let loginItem = document.createElement('li');
  let loginLink = document.createElement('a');
  if (document.getElementById('ctl00_HomePageHeaderControl1_lnkLoginName') || document.getElementById('ctl00_HeaderControl1_lnkLoginName')) {
    loginLink.href = '/login/default.aspx?RESET=Y&redir=' + window.location.pathname;
    loginLink.innerText = 'Log out';
  } else {
    loginLink.href = '/login/default.aspx?redir=' + window.location.pathname;
    loginLink.innerText = 'Log in';
  }
  loginItem.append(loginLink);
  accList.append(loginItem);
  hdr.append(accList);
}

  //TODO Heading!
if(document.getElementById('sidebar')){
  //Sidebar hide Button
  var hideSidebar = document.createElement('button');
  hideSidebar.innerText = '<';
  hideSidebar.type = 'button';
  hideSidebar.id = 'toggleSidebar';
  hideSidebar.onclick = function () {
    if (document.getElementById('sidebar').classList.length > 0) {
      // show the sidebar
      document.getElementById('sidebar').classList.remove('sidebarHidden');
      hideSidebar.innerText = '>';
    } else {
      //hide sidebar
      document.getElementById('sidebar').classList.add('sidebarHidden');
      hideSidebar.innerText = '<';
    }
  };
  document.getElementById('sidebar').prepend(hideSidebar);
}

  //hide all elements by default.
  document.getElementById('sidebar')?document.getElementById('sidebar').classList.add('sidebarHidden'):null;
  if(document.getElementById('header')){
  document.getElementById('AccountActions').classList.add('profileHidden');
  document.getElementById('mobileNav').classList.add('navHidden');
  }
}
/**
 * @param element {HTMLElement}
 * */
function getTotalOffsetLeft(element) {
  return element.getBoundingClientRect().left + window.pageXOffset;
}
/**@param e {HTMLElement} if specified, query this element */
function updateMaxWidth(e = null) {
  let start = new Date();
  let elems = [];
  try {
    if (!e) {
      console.debug('UpdateMaxWidth started');
      e = document;
    } else {
      console.debug('UpdateMaxWidth started for',e);
      elems.push(e);
    }
    const nodes = e.querySelectorAll('#wrap :not(br):not(style):not(#toggleSidebar):not(#mobileHeader):not(#mobileHeader *):not(#header *):not(#sidebar):not(#ctl00_ContentBody_GridPanel1_tblGrid *)');
    for (let i = 0; i < nodes.length; i++) {
      elems.push(nodes[i]);
    }
  } catch (x) {
    alert('This Browser is not fully supported. try another one. Kiwi Browser and Yandex Browser are known to work.' + x);
  }
  // compute what 1.5 rem is in pixels (to subtract from the viewport width). https://stackoverflow.com/a/42769683
  const oneDot5rem = 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  elems.forEach(function (elem) {
    setTimeout(
      args => {
        if (args[0].style.display == 'none' || (args[0].id == 'search_options' && getComputedStyle(args[0]).display == 'none')) {
          const observer = new MutationObserver((mutations, observer) => {
            mutations.forEach(record => {
              if (record.target.style.display != 'none') {
                updateMaxWidth(record.target);
                observer.disconnect();
              }
            });
          });
          observer.observe(args[0], { childList: false, attributes: true, attributeFilter: ['style'] });
        } else {
          let offset = getTotalOffsetLeft(args[0]);
          if (offset >= document.documentElement.clientWidth - oneDot5rem) {
            args[0].before(document.createElement('br'));
            offset = getTotalOffsetLeft(args[0]);
          }
          args[0].style['max-width'] = `calc(100vw - 1.5rem - ${offset}px)`;
        }
      },
      0,
      [elem]
    );
  });
  console.debug('UpdateMaxWidth duration: ', (new Date() - start) / 1000, 'seconds.');
}

(function () {
  console.debug('Hello how are you?');
  // insert meta element to set viewport to device viewport.
  let meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1';
  document.head.append(meta);
  if(document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM is already completely loaded, directly set things up. (this happened a lot on the small help page)
    console.debug('DOM was already loaded.')
    setup();
  } else {
    // wait until DOM is loaded until setting up the rest.
    document.addEventListener('DOMContentLoaded', setup);
  }
  // re-calculate maximum element width on resize.
  window.addEventListener('resize', ()=>updateMaxWidth());
})();
