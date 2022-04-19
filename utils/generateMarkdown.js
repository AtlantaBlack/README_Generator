
function installationDetails(installation) {
    if (installation.confirm === "No") {
        return "This project does not require any additional installations in order to run.";
    } else {
        return installation.details;
    }
}

function contributingDetails(contributing) {
    if (contributing.confirm === "No") {
        return "This project is not allowing outside contributions at this time.";
    } else {
        return contributing.details;
    }
}


function renderLicenseBadge(license) {
    let badge; 
    let link; 

    switch (license) {
        case "GNU GPLv3":
            badge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
            link = "https://www.gnu.org/licenses/gpl-3.0";
            break;
        case "GNU LGPLv3":
            badge = "![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)";
            link = "https://www.gnu.org/licenses/lgpl-3.0";
            break;
        case "Mozilla Public License 2.0":
            badge = "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)";
            link = "https://opensource.org/licenses/MPL-2.0";
        case "Apache License 2.0":
            badge = "![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)";
            link = "https://opensource.org/licenses/Apache-2.0";
            break;
        case "MIT License":
            badge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
            link = "https://opensource.org/licenses/MIT";
            break;
        case "Boost Software License 1.0":
            badge = "![License: BSL 1.0](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)";
            link = "https://www.boost.org/LICENSE_1_0.txt";
            break;
        case "Unlicense":
            badge = "![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)";
            link = "http://unlicense.org/";
            break;
        default:
            return "";
    }

    return `[${badge}](${link})

This project is licensed under the [${license}](${link}).`
}

function askForCredits(devteam) {
    let team = parseInt(devteam);

    let members = [];
    for (let i = 0; i < team; i++) {
        members.push(i);
    }

    const creditQuestions = [];
    for (let j = 0; j < members.length; j++) {
        let member = j;
        creditQuestions.push(
            {
                type: "input",
                name: `collaborator.${member}.name`,
                message: `Name of Collaborator ${member + 1}:`
            },
            {
                type: "input",
                name: `collaborator.${member}.url`,
                message: `GitHub/Website URL of Collaborator ${member + 1}:`
            }
        ) 
    }
    return creditQuestions;
}


function renderCredits({collaborator}) {
    let team = [];
    let currentYear = new Date().getFullYear();

    for (let i = 0; i < collaborator.length; i++) {
        let name = collaborator[i].name;
        let url = collaborator[i].url;

        let person = `[${name}](${url})`
        team.push(person);
    }

    if (team.length === 1) {
        return `\u00A9 ${currentYear} ${team}.`;
    } else {
        return `\u00A9 ${currentYear} ${team.join(", ")}.`;
    }
}


// TODO: Create a function to generate markdown for README
function generateMarkdown({title, description, usage, tests, author, email, credits, installation, contribution,  badgelink}) {
  return `# ${title}

## Description
${description}

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Credits](#credits)
4. [License](#license)
5. [How To Contribute](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## Credits
${title} ${credits}

## License
${badgelink}

## How To Contribute
${contribution}

## Tests
${tests}

## Questions
If you have any questions about **${title}**, please contact ${author} [by email](mailto:${email}).

`;
}

module.exports = {
    installationDetails,
    contributingDetails,
    askForCredits,
    renderCredits,
    renderLicenseBadge,
    generateMarkdown,
};
