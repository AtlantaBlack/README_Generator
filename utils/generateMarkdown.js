// whether project needs installation steps
function installationDetails(installation) {
    if (installation.confirm === "No") {
        return installation = "This project does not require any additional installations in order to run.";
    } else {
        return installation = installation.details;
    }
}

// whether project will allow contributions from outside
function contributingDetails(contributing) {
    if (contributing.confirm === "No") {
        return contributing = "This project is not allowing outside contributions at this time.";
    } else {
        return contributing = contributing.details;
    }
}

// make the license badge
function renderLicenseBadge(license) {
    let badge; 
    switch (license) {
        case "GNU GPLv3":
            badge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
            break;
        case "GNU LGPLv3":
            badge = "![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)";
            break;
        case "Mozilla Public License 2.0":
            badge = "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)";
        case "Apache License 2.0":
            badge = "![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)";
            break;
        case "MIT License":
            badge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
            break;
        case "Boost Software License 1.0":
            badge = "![License: BSL 1.0](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)";
            break;
        case "Unlicense":
            badge = "![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)";
            break;
        default:
            return "";
    }
    return badge;
}

// make the link to license
function renderLicenseLink(license) {
    let link; 
    switch (license) {
        case "GNU GPLv3":
            link = "https://www.gnu.org/licenses/gpl-3.0";
            break;
        case "GNU LGPLv3":
            link = "https://www.gnu.org/licenses/lgpl-3.0";
            break;
        case "Mozilla Public License 2.0":
            link = "https://opensource.org/licenses/MPL-2.0";
        case "Apache License 2.0":
            link = "https://opensource.org/licenses/Apache-2.0";
            break;
        case "MIT License":
            link = "https://opensource.org/licenses/MIT";
            break;
        case "Boost Software License 1.0":
            link = "https://www.boost.org/LICENSE_1_0.txt";
            break;
        case "Unlicense":
            link = "http://unlicense.org/";
            break;
        default:
            return "";
    }
    return link;
}

// make the credits section
function renderCredits({developer}) {
    let team = [];
    let currentYear = new Date().getFullYear(); // get this year
    
    for (let i = 0; i < developer.length; i++) {
        let name = developer[i].name;
        let url = developer[i].url;
        let person = `[${name}](${url})` // make clickable link for the team member

        if (!url) { // if no url was entered, leave the link out of the final render
            person = `${name}`;
        }
        team.push(person); // add people to the team
    }
    // print differently depending on number of team members
    if (team.length === 1) {
        return `\u00A9 ${currentYear} ${team}.`;
    } else {
        return `\u00A9 ${currentYear} ${team.join(", ")}.`;
    }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown({title, description, usage, tests, author, email, installation, contributing, license, credits}) {
  return `# ${title}

[${renderLicenseBadge(license)}](${renderLicenseLink(license)})

## Description
${description}

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [How To Contribute](#how-to-contribute)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation
${installationDetails(installation)}

## Usage
${usage}

## License
${title} ${credits}

This project is licensed under the [${license}](${renderLicenseLink(license)}).

## How To Contribute
${contributingDetails(contributing)}

## Tests
${tests}

## Questions
If you have any questions about ${title}, please contact **${author}** [by sending them an email](mailto:${email}).

`;
}

module.exports = {
    renderCredits,
    generateMarkdown,
};
