/*jshint esversion: 6 */
/*jslint devel: true */
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
var document; // Rectifying 'document not defined'
var window; // Rectifying 'window not defined'
var mainPara;
if (document !== "undefined") {
    // Code that relies on the document object
    document.cookie = 'CookieName=NULL; SameSite=Strict';
}

/**
 * LaTex formula conversion support
 */
window.MathJax = {
    tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
    svg: { fontCache: 'global' }
};

/**
 * Detection of mobile platform
 * Increase line height in Desktop
 * Change main container class on the fly (window Width > window Height)
 * This only changes style, not class, otherwise it would break class detection on image click re-formating
 * @returns Updated class configuration for the root <div> which contains main content
 */
function switchPlatform() {
    "use strict";
    if (window.innerWidth+16 <= window.innerHeight) { // Mobile / Vertical Layout
        // Set class for the main container div for Mobile only
        let rootDivs = document.querySelectorAll('div.container-desktop.rounded-9.border-main');
        for (let i=0; i<rootDivs.length; i++) {
            rootDivs[i].setAttribute("class", "container-mobile rounded-9 border-main");
        }
        // Decrease mobile font size
        document.body.style.fontSize = "0.8rem";
        // Decrease PPM table's font size for Mobile, because it's massive size
        if (document.getElementsByClassName("table-fit-container align-items-center text-smaller").length > 0) {
            document.getElementsByClassName("table-fit-container align-items-center text-smaller")[0].setAttribute("class", "table-fit-container align-items-center text-xs");
        }
        // Decrease preset parameter's font size for Mobile, because of it's massive size
        if (document.getElementsByClassName("table-fit-container text-smaller").length > 0) {
            document.getElementsByClassName("table-fit-container text-smaller")[0].setAttribute("class", "table-fit-container text-xs");
        }
    }
    else { // Desktop / Horizontal Layout
        document.body.style.fontSize = "1rem";
        // Set class for the main container div for Desktop only
        let rootDivs = document.querySelectorAll('div.container-mobile.rounded-9.border-main');
        for (let i=0; i<rootDivs.length; i++) {
            rootDivs[i].setAttribute("class", "container-desktop rounded-9 border-main");
        }
        // Increase line height for Desktop
        mainPara = document.querySelectorAll('p:not([class])');
        for (let i=0; i<mainPara.length; i++) {
            mainPara[i].style.lineHeight = "2.5rem";
        }
        // Increase PPM table's font size for Desktop, because it's massive size
        if (document.getElementsByClassName("table-fit-container align-items-center text-xs").length > 0) {
            document.getElementsByClassName("table-fit-container align-items-center text-xs")[0].setAttribute("class", "table-fit-container align-items-center text-smaller");
        }
        // Increase preset parameter's font size for Desktop, because of it's massive size
        if (document.getElementsByClassName("table-fit-container text-xs").length > 0) {
            document.getElementsByClassName("table-fit-container text-xs")[0].setAttribute("class", "table-fit-container text-smaller");
        }
    }
}
window.addEventListener('resize', switchPlatform);
switchPlatform(); // Call this function onload as well

/**
 * Click image to enlarge - up to 3 digits
 * 1. Updates class configuration for the root <div> which contains main content
 * 2. Get the alt attribute and paste as title attribute
 */
const imgs = document.querySelectorAll('img');
for (let i=0; i<imgs.length; i++) {
    let LR_UD_ID = 0;
    imgs[i].addEventListener('click', ()=>{ 
        switch(imgs[i].getAttribute('class')) {
            case 'img-medium':
                imgs[i].setAttribute("class", "");
                break;
            case '':
                imgs[i].setAttribute("class", "img-small");
                break;
            case 'img-small':
                imgs[i].setAttribute("class", "img-medium");
                break;
            // Images under row column grid system
            case 'img-medium img-right col-4': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2': // Rotation 3 - Smal to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;
            // Edge case - Images under row column grid system and auto margin bottom
            case 'img-medium img-right col-4 mb-auto': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mb-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mb-auto': // Rotation 3 - Smal to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;
            // Edge case - iamges with margin top
            case 'img-medium img-right col-4 mt-3': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mt-3': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mt-3': // Rotation 3 - Small to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;   
            // Edge case - iamges with margin top and auto margin bottom
            case 'img-medium img-right col-4 mt-3 mb-auto': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mt-3 mb-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mt-3 mb-auto': // Rotation 3 - Small to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;    
            default:
                console.log("Click image event switch failed: calculated id "+LR_UD_ID);
                break;
        }
    }, false);
    imgs[i].setAttribute('title', imgs[i].getAttribute('alt')); // Set title attribute with alt attribute
}

/**
 * Change all anchor behavior to open external page
 */
anchors = document.querySelectorAll('a');
for (let i=0; i<anchors.length; i++) { anchors[i].setAttribute("target", "_blank"); }

/* Accordion collapse support */
var collapseBtns = document.getElementsByClassName('collapsible');
/* Register collapse event to all buttons */
for (let i = 0; i < collapseBtns.length; i++) {
    collapseBtns[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var collContent = this.nextElementSibling;
        if (collContent.style.display === "block") { collContent.style.display = "none"; }
        else { collContent.style.display = "block"; }
    });
}

/**
 * Un-collapse all collapsed contents
 */
function uncollpaseAll() {
    "use strict";
    for (let i = 0; i < collapseBtns.length; i++) {
        if (collapseBtns[i].classList.toggle("active")) {
            collapseBtns[i].click();
        }
    }
}
