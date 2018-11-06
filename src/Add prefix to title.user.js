// ==UserScript==
// @name           Add prefix to title
// @namespace      http://tampermonkey-scripts.theGleep.com
// @version        0.2
// @description    ES6 code to change titlebar
// @run-at         document-end
// @author         tamermonkey-scripts@theGleep.com
// @require        https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          chrome:*//*/*
// @grant          chrome-extension:*//*/*
// @match          http://*/*
// @match          https://*/*
// ==/UserScript==

// github repository:

(() => {

// Your code here...
function getPrefix() {
    return GM_config.get("Persona Name")
}

function getSeparator() {
    return " - "
}

function getCheckIntervalSeconds() {
    return Number("1")
}

function getCheckTime() {
    return new Date().getSeconds()
}

function init() {
  return new Promise((resolve, reject) => {
    GM_config.init({
      'id': 'Persona In Titlebar',
      'fields':  {
        'Persona Name': // This is the id of the field
        {
          'label': 'Persona',
          'type': 'text',
          'default': null
        },
        "Separator": {
          'label': 'Separator',
          'type': 'text',
          'default': " - "
        },
        "Check Interval": {
          'label': 'Check Interval',
          'type': 'number',
          'default': 1
        }
      },
      "events": {
          "open": function() {
              GM_config.frame.style.backgroundColor = "white"
          },
        "save": function() {
          resolve(getPrefix())
          GM_config.close()
        },
        "close": function() {
          reject()
        }
      }
    })
    var prefix = getPrefix()
    if (prefix !== null) {
      resolve(prefix)
    }
    else {
      GM_config.open()
    }
  })
}

function runner(prefix) {
  let title = document.title || "",
      idx = title.indexOf(prefix),
      separator = getSeparator() || " - "

  console.log("title: ", title, "index:", idx, "separator:", separator)

  if (idx !== 0) {
    document.title = `${prefix}${separator}${title}`
  }
}

console.log("running")

init()
.then(prefix => window.setInterval(runner, getCheckIntervalSeconds() * 1000, prefix))

})()