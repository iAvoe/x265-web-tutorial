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
 * The internal variable "rootDiv" is reserved for multiple content div (container-mobile/desktop rounded-9 border-main) layout, but unused so far
 * @param {number} widthOffset The width offset for window width <= height check, decides whether change to mobile (taller) or desktop (wider) styling
 * @returns New class configuration for the content div which contains main content
 */
let widthOffset = 18;
function switchPlatform(widthOffset) {
    "use strict";
    if (isNaN(widthOffset)) {
        console.error("function switchPlatform(): width offset parameter is not a number")
    }
    if (window.innerWidth+widthOffset <= window.innerHeight) { // Mobile / Vertical Layout
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
window.addEventListener('resize', ()=>{switchPlatform(widthOffset)}, false);
window.
switchPlatform(widthOffset); // Call this function during load as well

/**
 * Click image to enlarge && copy 'alt' attribute to 'title' so I don't have to manual write everything painstakingly
 * The 'Click image to enlarge' has many edge cases as left-right to top-down layout changes with edge cases are considered because all image should support it
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
    // Set title attribute with alt attribute
    imgs[i].setAttribute('title', imgs[i].getAttribute('alt'));
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
        this.classList.toggle("active"); // Change button text from "-" to "+"
        var collContent = this.nextElementSibling;
        if (collContent.style.display === "block") { collContent.style.display = "none"; }
        else { collContent.style.display = "block"; }
    });
}

/**
 * Printing support 1-2 - Collapse & Un-collapse all collapsed contents
 * @returns All collapsed content are expanded
 */
function toggleCollapseAll() {
    "use strict";
    for (let i=0; i < collapseBtns.length; i++) {
        if (collapseBtns[i].classList.contains("collapsible")) {
            collapseBtns[i].click();
            // Syncronize all collapsing/expanding content, in case some collapsed content are expanded and some are not
            if (collapseBtns[0].classList.length != collapseBtns[i].classList.length) {
                collapseBtns[i].click();
            }
        }
    }
}

let printT = document.querySelector('div.container-title');
let printC = document.querySelector('div.container-desktop.rounded-9.border-main') || document.querySelector('div.container-mobile.rounded-9.border-main');
/**
 * Printing support 3 - Remove main div class and background
 * @param {object} title The title div which was captured earlier
 * @param {object} content The content div which was captured earlier
 * @returns New class configuration for the title & content div which contains main content
 */
function printMode(title, content) {
    if (title.tagName != 'DIV' || content.tagName != 'DIV') { 
        console.error("function printMode(): parameter must be title and container divs")
    }
    title.setAttribute("class", "");
    content.setAttribute("class", "");
}

/**
 * Printing support 4 - Restore original page
 * Deactivate printing mode by restoring class atttributes of title and main div
 * @param {object} title The title div which was captured earlier
 * @param {object} content The content div which was captured earlier
 * @param {number} widthOffset The width offset for window width <= height check, decides whether change to mobile (taller) or desktop (wider) styling
 * @returns New class configuration for the title & content div which contains main content
 */
function printModeOff(title, content, widthOffset) {
    if (title.tagName != 'DIV' || content.tagName != 'DIV') { 
        console.error("function printMode(): parameter must be title and container divs")
    }
    title.setAttribute("class", "container-title");
    if (window.innerWidth+widthOffset <= window.innerHeight) { // Mobile / Vertical Layout
        content.setAttribute("class", "container-mobile rounded-9 border-main");
    }
    else {
        content.setAttribute("class", "container-desktop rounded-9 border-main");
    }
}

// printMode(printT, printC);
// printModeOff(printT, printC, widthOffset); // Call this function
