
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

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
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
            badge = "![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)";
            link = "https://opensource.org/licenses/Apache-2.0";
            break;
        case "MIT License":
            badge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
            link = "https://opensource.org/licenses/MIT";
            break;
        case "Boost Software License 1.0":
            badge = "![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)";
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

This project is licensed under [${license}](${link}).`
}

function renderCredits(collaborators) {
    return collaborators;
}



// TODO: Create a function to generate markdown for README
function generateMarkdown({title, description, usage, tests, author, email, creditsection, installdeets, contributedeets,  badgelink}) {
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
${installdeets}

## Usage
${usage}

## Credits
${creditsection}

## License
${badgelink}

## How To Contribute
${contributedeets}

## Tests
${tests}

## Questions
If you have any questions about this project, please contact **${author}** at [${email}](${email}).

`;
}

module.exports = {
    installationDetails,
    contributingDetails,
    renderCredits,
    renderLicenseBadge,
    generateMarkdown,
};
