// ==UserScript==
// @name         Waymarking Tweaks
// @namespace    http://github.com/MaxEtMoritz/WaymarkingTweaks
// @version      0.1
// @description  tweak the waymarking.com site.
// @author       GPSKaninchen
// @match        http*://www.waymarking.com/*
// @icon         https://www.waymarking.com/images/homepage/biglogo.gif
// @updateURL    https://github.com/MaxEtMoritz/WaymarkingTweaks/raw/main/Waymarking%20Tweaks.user.js
// @downloadURL  https://github.com/MaxEtMoritz/WaymarkingTweaks/raw/main/Waymarking%20Tweaks.user.js
// @grant        none
// ==/UserScript==

var extender = {
    setup: function(){
        var css = document.createElement('style');
    css.textContent=`
    #sidebar.sidebarHidden .gutter {
        display: none;
      }
      #sidebar .gutter {
        grid-column: 2;
        overflow-x:scroll;
      }
      #sidebar {
        position: fixed;
        right: 0;
        display: grid;
        height: 100%;
        width: auto;
        min-width: unset;
        margin-top: 6vmin;
        max-width: min(90vw, 370px);
      }
      #toggleSidebar {
        grid-column: 1;
        width: 1.1em;
        padding: 0;
        background: linear-gradient(#56849b,lightblue);
      }
      #content {
        width: calc(100vw - 1.1em);
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
        max-height:100vh;
        overflow:scroll;
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
        border: 1px solid #ccc;
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
        border: 1px solid #ccc;
        background: #f9e9a9 url(/images/blue.gif) repeat-x top left;
      }
      #AccountActions.profileHidden > li {
        display: none;
      }
      #search_addresstextbox {
        position: inherit;
      }
      .home-banner {
        display: none;
      }
      #pushwrapper{
      min-width:unset;
      }
      #footerlinks {
        width: auto;
      }
      body {
        padding: 0px;
        width: 100vw;
      }
      *{
      min-width:unset;
      overflow-wrap:break-word;
      }
      #ctl00_ContentBody_HuntUserGridControl1_uxGrid *{
      margin:0;
      padding:0;
      width:auto;
      font-weight:normal;
      font-size:inherit;
      }
      `;
    document.head.append(css);
        if(navigator.geolocation){
            //My Location Button(Waymark Search Filter)
            if(document.getElementById('ctl00_ContentBody_FilterControl1_uxSearchLocation')){
                let btn = document.createElement('button');
                btn.type='button';
                btn.id='InsertMyLocationSearch';
                btn.innerText='My Location';
                btn.onclick=function(){
                    navigator.geolocation.getCurrentPosition(function(loc){
                        document.getElementById('ctl00_ContentBody_FilterControl1_uxSearchLocation').value=`N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
                    });
                }
            }

            //My Location Button(Scavenger Hunt Search)
            if(document.getElementById('ctl00_ContentBody_NewSearchControl1_txtGames')){
                let input = document.getElementById('ctl00_ContentBody_NewSearchControl1_txtGames');
                let btn = document.createElement('button');
                btn.type='button';
                btn.id='InsertMyLocationScaveng';
                btn.innerText='My Location';
                btn.onclick=function(){
                    navigator.geolocation.getCurrentPosition(function(loc){
                        input.value=`N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
                    });
                };
                input.parentElement.insertBefore(btn, document.getElementById('ctl00_ContentBody_NewSearchControl1_uxGameTextValidator'));
            }

            //My Location Button (Homepage etc.)
            if(document.getElementById('ctl00_ContentBody_NewSearchControl1_btnSearch')){
                let btn = document.createElement('button');
                btn.type='button';
                btn.id='InsertMyLocationWaym';
                btn.innerText='My Location';
                btn.onclick=function(){
                    navigator.geolocation.getCurrentPosition(function(loc){
                        document.getElementById('ctl00_ContentBody_NewSearchControl1_txtAddress').value=`N ${loc.coords.latitude}° E ${loc.coords.longitude}°`;
                    });
                };
                document.getElementById('search_addresstextbox').insertBefore(btn, document.getElementById('search_additional'));
            }
        }

        //set max width to prevent overflow
        updateMaxWidth();

        //do a custom header
        var hdr = document.createElement('div');
        hdr.id='mobileHeader';
        //Nav Menu Button
        let toggleNav = document.createElement('button');
        toggleNav.type='button';
        toggleNav.id='mobileNavBtn';
        toggleNav.classList.add('material-icons');
        let menuImg = document.createElement('img');
        menuImg.src='https://github.com/google/material-design-icons/raw/master/png/navigation/menu/materialicons/48dp/2x/baseline_menu_black_48dp.png'
        toggleNav.append(menuImg);
        toggleNav.onclick=function(){
            if(document.getElementById('mobileNav').classList.length > 0){
                //show nav
                document.getElementById('mobileNav').classList.remove('navHidden');
                document.getElementById('AccountActions').classList.add('profileHidden');
            } else{
                //hide nav
                document.getElementById('mobileNav').classList.add('navHidden');
            }
        };
        hdr.append(toggleNav);

        //Logo
        let homelink = document.createElement('a');
        homelink.href="/";
        let logo = document.createElement('img');
        logo.src='/images/homepage/biglogo.gif';
        logo.id='mobileLogo';
        homelink.append(logo);
        hdr.append(homelink);
        document.getElementById('wrap').prepend(hdr);

        //Account details / login Button
        let accBtn = document.createElement('button');
        accBtn.type='button';
        accBtn.classList.add('material-icons');
        accBtn.id='mobileProfile';
        let accImg = document.createElement('img');
        accImg.src='https://github.com/google/material-design-icons/raw/master/png/action/account_circle/materialicons/48dp/2x/baseline_account_circle_black_48dp.png';
        accBtn.append(accImg);
        accBtn.onclick=function(){
            if(document.getElementById('AccountActions').classList.length > 0){
                //show account actions
                document.getElementById('AccountActions').classList.remove('profileHidden');
                document.getElementById('mobileNav').classList.add('navHidden');
            } else{
                //hide account actions
                document.getElementById('AccountActions').classList.add('profileHidden');
            }
        };
        hdr.append(accBtn);

        //Nav Menu
        let navContainer = document.createElement('ul');
        navContainer.id='mobileNav';
        let navElems = document.querySelectorAll('#main_nav li');
        for(let i = 0; i < navElems.length; i++){
            let newElem = navElems[i].cloneNode(true);
            newElem.removeAttribute('id');
            navContainer.prepend(newElem);
        }
        hdr.append(navContainer);

        //Account Details/Login List
        let accList=document.createElement('ul');
        accList.id='AccountActions';
        if(document.getElementById('ctl00_HomePageHeaderControl1_lnkLoginName') || document.getElementById('ctl00_HeaderControl1_lnkLoginName')){
            let profItem = document.createElement('li');
            let profLink = document.createElement('a');
            profLink.href='/users/profile.aspx';
            profLink.innerText='My Profile';
            profItem.append(profLink);
            accList.append(profItem);
        }
        let loginItem = document.createElement('li');
        let loginLink = document.createElement('a');
        if(document.getElementById('ctl00_HomePageHeaderControl1_lnkLoginName') || document.getElementById('ctl00_HeaderControl1_lnkLoginName')){
            loginLink.href='/login/default.aspx?RESET=Y&redir='+window.location.pathname;
            loginLink.innerText='Log out';}else{
                loginLink.href='/login/default.aspx?redir='+window.location.pathname;
                loginLink.innerText='Log in';
            }
        loginItem.append(loginLink);
        accList.append(loginItem);
        hdr.append(accList);

        //TODO Heading!

        //Sidebar hide Button
        var hideSidebar = document.createElement('button');
        hideSidebar.innerText='<';
        hideSidebar.type='button';
        hideSidebar.id='toggleSidebar';
        hideSidebar.onclick=function(){
            if(document.getElementById('sidebar').classList.length > 0){
                // show the sidebar
                document.getElementById('sidebar').classList.remove('sidebarHidden');
                hideSidebar.innerText='>';
            }
            else{
                //hide sidebar
                document.getElementById('sidebar').classList.add('sidebarHidden');
                hideSidebar.innerText='<';
            }
        };
        document.getElementById('sidebar').insertBefore(hideSidebar,document.getElementById('sidebar').firstElementChild);

        //hide all elements by default.
        document.getElementById('sidebar').classList.add('sidebarHidden');
        document.getElementById('AccountActions').classList.add('profileHidden');
        document.getElementById('mobileNav').classList.add('navHidden');
    }

};

function getTotalOffsetLeft(element){
    return element.getBoundingClientRect().left + window.pageXOffset;
}

function updateMaxWidth(){
let elems = document.querySelectorAll('#wrap :not(br, style, #toggleSidebar, #mobileHeader, #mobileHeader *, #sidebar)');
        elems.forEach(function(elem){
            let offset = getTotalOffsetLeft(elem);
            if(offset >= document.documentElement.clientWidth){
                elem.parentElement.insertBefore(document.createElement('br'),elem);
                offset = getTotalOffsetLeft(elem);
            }
            elem.style['max-width']=`calc(100vw - 1.1em - ${offset}px)`;
        });
}

(function() {
    window.addEventListener('load',extender.setup);
    window.addEventListener('resize', updateMaxWidth);
})();