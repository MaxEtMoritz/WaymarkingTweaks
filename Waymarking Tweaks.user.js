// ==UserScript==
// @name         Waymarking Tweaks
// @namespace    http://github.com/MaxEtMoritz/WaymarkingTweaks
// @version      0.2
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
  console.debug("setup");
  // append style to document head.
  var css = document.createElement("style");
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
        top: 6vmin;
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
        width: 1.1em;
        padding: 0;
        background: linear-gradient(#56849b, lightblue);
      }
      #content {
        width: calc(100% - 1.1em);
        margin-top: 6vmin;
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
        padding: 1vw;
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
        height: 6vmin;
      }
      #mobileProfile {
        float: right;
        margin-right: 10px;
        padding: 0;
      }
      #mobileNavBtn {
        margin-left: 10px;
        margin-right: 41vw;
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
      #ctl00_ContentBody_HuntUserGridControl1_uxGrid * {
        margin: 0;
        padding: 0;
        width: auto;
        font-weight: normal;
        font-size: inherit;
      }
    `;
  document.head.append(css);
  if (navigator.geolocation) {
    //My Location Button(Waymark Search Filter)
    if (
      document.getElementById(
        "ctl00_ContentBody_FilterControl1_uxSearchLocation"
      )
    ) {
      let input = document.getElementById(
        "ctl00_ContentBody_FilterControl1_uxSearchLocation"
      );
      let btn = document.createElement("button");
      btn.type = "button";
      btn.id = "InsertMyLocationSearch";
      btn.innerText = "My Location";
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          document.getElementById(
            "ctl00_ContentBody_FilterControl1_uxSearchLocation"
          ).value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      input.parentElement.insertBefore(btn, input.nextElementSibling);
    }

    //My Location Button(Scavenger Hunt Search)
    if (
      document.getElementById("ctl00_ContentBody_NewSearchControl1_txtGames")
    ) {
      let input = document.getElementById(
        "ctl00_ContentBody_NewSearchControl1_txtGames"
      );
      let btn = document.createElement("button");
      btn.type = "button";
      btn.id = "InsertMyLocationScaveng";
      btn.innerText = "My Location";
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          input.value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      input.parentElement.insertBefore(
        btn,
        document.getElementById(
          "ctl00_ContentBody_NewSearchControl1_uxGameTextValidator"
        )
      );
    }

    //My Location Button (Homepage etc.)
    if (
      document.getElementById("ctl00_ContentBody_NewSearchControl1_txtAddress")
    ) {
      let btn = document.createElement("button");
      btn.type = "button";
      btn.id = "InsertMyLocationWaym";
      btn.innerText = "My Location";
      btn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
          document.getElementById(
            "ctl00_ContentBody_NewSearchControl1_txtAddress"
          ).value = `N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
        });
      };
      document
        .getElementById("search_addresstextbox")
        .insertBefore(btn, document.getElementById("search_additional"));
    }
  }

  //set max width to prevent overflow
  updateMaxWidth();

  // special handling for category grid
  if(document.getElementById('ctl00_ContentBody_GridPanel1_tblGrid')){
    let table = document.getElementById('ctl00_ContentBody_GridPanel1_tblGrid');
    let container = document.createElement('div');
    container.style.overflow = 'auto';
    table.parentElement.insertBefore(container,table);
    container.appendChild(table);
  }

  //do a custom header
  var hdr = document.createElement("div");
  hdr.id = "mobileHeader";
  //Nav Menu Button
  let toggleNav = document.createElement("button");
  toggleNav.type = "button";
  toggleNav.id = "mobileNavBtn";
  let menuImg = document.createElement("img");
  menuImg.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAK0lEQVRYw+3TQQ0AAAgDsfk3DR4IDxLaCdjrEoBramkO5gegZCWD0JQMfNZHz65gLSCfwQAAAABJRU5ErkJggg==";
  toggleNav.append(menuImg);
  toggleNav.onclick = function () {
    if (document.getElementById("mobileNav").classList.length > 0) {
      //show nav
      document.getElementById("mobileNav").classList.remove("navHidden");
      document.getElementById("AccountActions").classList.add("profileHidden");
    } else {
      //hide nav
      document.getElementById("mobileNav").classList.add("navHidden");
    }
  };
  hdr.append(toggleNav);

  //Logo
  let homelink = document.createElement("a");
  homelink.href = "/";
  let logo = document.createElement("img");
  logo.src = "/images/homepage/biglogo.gif";
  logo.id = "mobileLogo";
  homelink.append(logo);
  hdr.append(homelink);
  document.getElementById("wrap").prepend(hdr);

  //Account details / login Button
  let accBtn = document.createElement("button");
  accBtn.type = "button";
  accBtn.id = "mobileProfile";
  let accImg = document.createElement("img");
  accImg.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAACvElEQVRYw+2XzUojQRDHf5EgUaKCoihByEE8Cwpxc8ppWdi9qm/gwQGVCBq85BBwniB5AfGWk/Hgim/gQdEnMILfJ3NRA2YPO93z0emZjmEDC1bfqmqquqvrX/0f+JL/QWJkKFDlkltatLjlkioFMsS6D57C5oaWZt1gk/p88FHKvGqDi/VKmdHPhF/mOTK4WM8sdxY8TsUX4I0TLHLMkCTJDDksTnjz+VSIm4YfoOb58B6LobZ+Q1jcezxrDJjt/shT3yLJUO8kRc89HZmcouLZe9boxFnPOSpRzivS9Yppn2WcEhc0aHBBiXGfbZor+d1KWPgxnuTu/eGXePFd6QtLgRTiFE+M6ROUZe2zgfAfSmt+BFJk5V2U9agVLkWffiKwe/cUEz6/otyeBt17jsNdoHNKEg07TDLJjkRAKdBRd45+r134PuqOeS1gOXf021Kz7WjOA55rjr5On5ogI/c5ErCIAk1JzZQskl9G5NkyaoKCYzpWLOYJ4NixFNQEVcdkKRbzEoHlWKpqAgGVnGIxvWSAnISpIgJis4rFtE0BZiXcFBEYaDc5TYAmJqzAgjbBYFuMRI0KIYP6BKJEaQ3Ow4adK2l9icQlL3ZFEhb1lyzadLOrBJv6NhVAO+wqwaEeaGJUNJRREWOePPuc8UCLFg+csU+eeYV4jdDQjwp32G15tAtUeNTSlUcqLHi8t8KGnTuur0kAMMepESs6ZQ6ABNdh49r74NjALu/GxOudXcCOenDcJ7PJQQBWNdb5Rgoc4rVOLQC9A5pRT6b30XfXb35p2E6cn3I8uyv00ffSlr/98iOyMb/72F0EbfETrxarRr2/6mOoHVHHJjb9od792LL2htQxSH7r5Blu6zdMXmKnA/Lbjr43qLFBljQJEqTJskFNorZj+t6DH5Ce/EL14CewJ7+xX/Lv5Q+c7qVytzIenAAAAABJRU5ErkJggg==";
  accBtn.append(accImg);
  accBtn.onclick = function () {
    if (document.getElementById("AccountActions").classList.length > 0) {
      //show account actions
      document
        .getElementById("AccountActions")
        .classList.remove("profileHidden");
      document.getElementById("mobileNav").classList.add("navHidden");
    } else {
      //hide account actions
      document.getElementById("AccountActions").classList.add("profileHidden");
    }
  };
  hdr.append(accBtn);

  //Nav Menu
  let navContainer = document.createElement("ul");
  navContainer.id = "mobileNav";
  let navElems = document.querySelectorAll("#main_nav li");
  for (let i = 0; i < navElems.length; i++) {
    let newElem = navElems[i].cloneNode(true);
    newElem.removeAttribute("id");
    navContainer.prepend(newElem);
  }
  hdr.append(navContainer);

  //Account Details/Login List
  let accList = document.createElement("ul");
  accList.id = "AccountActions";
  if (
    document.getElementById("ctl00_HomePageHeaderControl1_lnkLoginName") ||
    document.getElementById("ctl00_HeaderControl1_lnkLoginName")
  ) {
    let profItem = document.createElement("li");
    let profLink = document.createElement("a");
    profLink.href = "/users/profile.aspx";
    profLink.innerText = "My Profile";
    profItem.append(profLink);
    accList.append(profItem);
  }
  let loginItem = document.createElement("li");
  let loginLink = document.createElement("a");
  if (
    document.getElementById("ctl00_HomePageHeaderControl1_lnkLoginName") ||
    document.getElementById("ctl00_HeaderControl1_lnkLoginName")
  ) {
    loginLink.href =
      "/login/default.aspx?RESET=Y&redir=" + window.location.pathname;
    loginLink.innerText = "Log out";
  } else {
    loginLink.href = "/login/default.aspx?redir=" + window.location.pathname;
    loginLink.innerText = "Log in";
  }
  loginItem.append(loginLink);
  accList.append(loginItem);
  hdr.append(accList);

  //TODO Heading!

  //Sidebar hide Button
  var hideSidebar = document.createElement("button");
  hideSidebar.innerText = "<";
  hideSidebar.type = "button";
  hideSidebar.id = "toggleSidebar";
  hideSidebar.onclick = function () {
    if (document.getElementById("sidebar").classList.length > 0) {
      // show the sidebar
      document.getElementById("sidebar").classList.remove("sidebarHidden");
      hideSidebar.innerText = ">";
    } else {
      //hide sidebar
      document.getElementById("sidebar").classList.add("sidebarHidden");
      hideSidebar.innerText = "<";
    }
  };
  document
    .getElementById("sidebar")
    .insertBefore(
      hideSidebar,
      document.getElementById("sidebar").firstElementChild
    );

  //hide all elements by default.
  document.getElementById("sidebar").classList.add("sidebarHidden");
  document.getElementById("AccountActions").classList.add("profileHidden");
  document.getElementById("mobileNav").classList.add("navHidden");
}
/**
 * @param element {HTMLElement}
 * */
function getTotalOffsetLeft(element) {
  return element.getBoundingClientRect().left + window.pageXOffset;
}

function updateMaxWidth() {
  let start = new Date();
  console.debug("UpdateMaxWidth started");
  let elems = document.querySelectorAll(
    "#wrap :not(br):not(style):not(#toggleSidebar):not(#mobileHeader):not(#mobileHeader *):not(#header *):not(#sidebar):not(#ctl00_ContentBody_GridPanel1_tblGrid *)"
  );
  elems.forEach(function (elem) {
    setTimeout(
      (args) => {
        let offset = getTotalOffsetLeft(args[0]);
        if (offset >= document.documentElement.clientWidth) {
          args[0].parentElement.insertBefore(
            document.createElement("br"),
            args[0]
          );
          offset = getTotalOffsetLeft(args[0]);
        }
        args[0].style["max-width"] = `calc(100vw - 1.1em - ${offset}px)`;
      },
      0,
      [elem]
    );
  });
  console.debug(
    "UpdateMaxWidth duration: ",
    (new Date() - start) / 1000,
    "seconds."
  );
}

(function () {
  console.debug("Hello how are you?");
  // insert meta element to set viewport to device viewport.
  let meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, height=device-height, initial-scale=1";
  document.head.append(meta);
  // wait until DOM is loaded until setting up the rest.
  document.addEventListener("DOMContentLoaded", setup);
  // re-calculate maximum element width on resize.
  window.addEventListener("resize", updateMaxWidth);
})();
