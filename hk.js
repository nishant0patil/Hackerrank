const puppeteer =  require('puppeteer');
const loginLink = 'https://www.hackerrank.com/auth/login'
const emai = 'nishantpatil044@gmail.com'
const password = '123456'
const codeObj= require('./codes') 
// initialize puppeteer
let browserOpen = puppeteer.launch({
    headless : false, // showing visibility of browser
    Args:['--start-maximazed'],
    defaultviewport : null
})
let page
browserOpen.then(function(browserobj){
    let browserOpenPromise = browserobj.newPage()
    return browserOpenPromise;

})

//for targetting/scraping buttons
.then(function(newTab){ // open hackerrank loginpage on new link
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
})
.then(function(){
    let emailIsEntered = page.type("input[id='input-1']",email,{delay:50})
    return emailIsEntered

})
.then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay:50})
    return passwordIsEntered

})
.then(function(){
    let loginBUttonClicked = page.click("button[data-analytics='LoginPassword']",{delay:50})
    return loginBUttonClicked
})
.then(function(){
    let clickOnAlogoPromise = waitAndClick(".topic-card a[data-attr1 = 'algorithms']",page)
    return clickOnAlogoPromise
})
.then(function(){
    let getTOWarmUP = waitAndClick("body [id = 'hr_v2']",page)
    return getTOWarmUP
})
.then(function(){
    let waitFOR3Seconds = page.waitFor(3000)  //3000 == 3 seconds
    return waitFOR3Seconds
})
.then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled', {delay:50})
    return allChallengesPromise
})
.then(function(questionArr){
    console.log("number of question",questionArr.length); // for checking all question is coming or not
    let questionWillBeSolved = questionSolver(page,questionArr[0],coddeObj.answer[0])
    return questionWillBeSolved

})

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModalePromise = cPage.waitForSelector(selector)
        waitForModalePromise.then(function(){
            let clickmodal = cPage.click(selector)
            return clickmodal
        })
        .then(function(){
            resolve()
        })
        .catch(function(err){
            reject()
        })
    })
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let editorInFocusTime = waitAndClick('.hr-monaco-editor-parent')
            return editorInFocusTime

            .then(function(){
                return waitAndClik('checkbox-input',page)
            })
            .then(function(){
                return page.waitForSelector('textarea.custominput',page)
            })
            .then(function(){
                return page.type('textarea.custominput',answer,{delay:10})
            })
            .then(function(){
                let ctrlIsPressed = page.keyboard.down('control') // for pressing control 
                return ctrlIsPressed
            })
            .then(function(){
                let AisPressed = page.keyboard.press('A',{delay:100}) // for pressing A to select all code
                return AisPressed
            })
            .then(function(){
                let XisPressed = page.keyboard.press('X',{delay:100}) //press x to cut code part
                return XisPressed
            })
            .then(function(){
                let controlIsUnpressed = page.keyboard.up('control')
                return controlIsUnpressed
            })
            .then(function(){
                let AisPressed = page.keyboard.press('A',{delay:100})
                return AisPressed
            })
            .then(function(){
                let VisPressed = page.keyboard.press('v',{delay:100})
            })
            .then(function(){
                let controlIsPressed = page.keyboard.up('control')
                return controlIsPressed
            })
            .then(function(){
                return page.click('.hr-monaco__run-code ', {delay:50})

            })
            .then(function(){
                resolve()
            })
            .catch(function(err){
                reject();
            })
        })
    })
}
