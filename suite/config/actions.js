import { t, Selector, ClientFunction } from 'testcafe';
const components = require("./components.js");
const userandpass = require("../../global/userandpass.json");

const login = async () => {
    await t
        .typeText(components.login.email.selector, userandpass.cymulate.username)
        .typeText(components.login.password.selector, userandpass.cymulate.password)
        .click(components.login.buttons.signIn.selector);
}

const scrollDownSideBar = async (number = 200) => {
    //didnt have time to config this one
    await t.scroll(`div.report-sidebar`, `bottomRight`);
}
const scrollDownCSV = async (number = 200) => {
    //didnt have time to config this one
    await t.scroll(`div.report-sidebar`, `div.summary-data button.report-pop-up + div.generate-report-dropdown-popup > div + div button.cymulate-btn`);
}
const getTime = async () => {
    const res = new Date().getHours().toString() + ":" + new Date().getMinutes();
    return res;
}
const getDay = async () => {
    const res = new Date().getDate().toString() + "/" + (new Date().getMonth() + 1).toString().padStart(2, '0') + "/" + new Date().getFullYear();
    return res;
}

const getFullTime = async () => {
    let time = await getTime();
    let day = await getDay();
    return day + " " + time;
}
const navbar = {
    clickOnTab: async (tab) => {
        await t.click(components.navbar[tab].selector);
    },
    downloadsManager: {
        click: async () => {
            await t.click(components.navbar.downloadsManager.selector)
        },
        date: {
            getText: async () => {
                const res = await Selector(components.navbar.downloadsManager.date.selector).innerText;
                return res;
            },
            compareTime: async () => {
                const time = await navbar.downloadsManager.date.getText();
                const now = await getFullTime();
                console.log(`downloaded time is ${time}`);
                console.log(`Time is now ${date}`);
                return time == now;
            }
        }
    }
}
const pages = {
    reports: {
        assestmentReports: {
            webApplicationFireWall: {
                click: async () => {
                    await t.click(components.pages.reports.assestmentReports.webApplicationFireWall.selector);
                },
                history: {
                    click: async () => {
                        await t.click(components.pages.reports.assestmentReports.webApplicationFireWall.history.selector);
                    },
                    reportsTable: {
                        click: async (rowNumber) => {
                            const res = await Selector(components.pages.reports.assestmentReports.webApplicationFireWall.history.reports.selector).nth(rowNumber);
                            await t.click(res);
                        }
                    }
                }
            }
        }
    },

}



const generateReport = {
    click: async () => {
        await t.click(components.generateReport.selector);
    },
    csv: {
        click: async () => {
            await t.click(components.generateReport.csv.selector);
        }
    }
}

const assestmentSummary = {
    getText: async (module) => {
        const res = await Selector(components.assestmentSummary[module].selector).innerText;
        return res;
    },
    click: async (module) => {
        const res = await Selector(components.assestmentSummary[module].selector);
        await t.click(res);
    },
}

module.exports = {
    login,
    navbar,
    pages,
    assestmentSummary,
    scrollDownSideBar,
    scrollDownCSV,
    getTime,
    generateReport
}