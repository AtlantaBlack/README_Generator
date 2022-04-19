// whether project needs installation steps
function installationDetails(installation) {
    if (installation.confirm === "No") {
        return "This project does not require any additional installations in order to run.";
    } else {
        return installation.details;
    }
}

// whether project will allow contributions from outside
function contributingDetails(contributing) {
    if (contributing.confirm === "No") {
        return "This project is not allowing outside contributions at this time.";
    } else {
        return contributing.details;
    }
}

// make the license section including badge and link to license
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

// make the credits section
function renderCredits({collaborator}) {
    let team = [];
    let currentYear = new Date().getFullYear();

    for (let i = 0; i < collaborator.length; i++) {
        let name = collaborator[i].name;
        let url = collaborator[i].url;

        // make a clickable link for the team member
        let person = `[${name}](${url})`

        // if no url was entered, leave the link out of the final render
        if (!url) {
            person = `${name}`;
        }
        team.push(person);
    }

    if (team.length === 1) {
        return `\u00A9 ${currentYear} ${team}.`;
    } else {
        return `\u00A9 ${currentYear} ${team.join(", ")}.`;
    }
}


// TODO: Create a function to generate markdown for README
function generateMarkdown({title, description, usage, tests, author, email, installation, contributing, badgelink, credits}) {
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
${contributing}

## Tests
${tests}

## Questions
If you have any questions about **${title}**, please contact ${author} [by sending them an email](mailto:${email}).

`;
}


module.exports = {
    installationDetails,
    contributingDetails,
    renderCredits,
    renderLicenseBadge,
    generateMarkdown,
};
