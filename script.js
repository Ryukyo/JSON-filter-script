import jsondata from './messages.json'
import fs from 'fs';

/*
 run file with node --experimental-json-modules test.js
 */

function dataMatchesText(text, data) {
    if (typeof data === "string") return data.includes(text);
    if (typeof data === "number") return data.toString().includes(text);
    if (data) {
        return Object.values(data).some(val => dataMatchesText(text, val));
    }
}

let filtered = jsondata.conversations.filter((data) => dataMatchesText('searchedString1', data) || dataMatchesText("searchedString2", data));
filtered = filtered[0].MessageList.filter((call) => dataMatchesText('searchedString1', call) || dataMatchesText("searchedString2", call))

// console.log(filtered.length)
let stringified = JSON.stringify(filtered)
fs.writeFile('filtered.json', stringified, (err) => 
    {
        if (err) throw err;
        console.info("JSON data is saved")
    }
)
