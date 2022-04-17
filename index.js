// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const markdown = require("./utils/generateMarkdown");
const generateMarkdown = require("./utils/generateMarkdown");

/* 
title of project Y
description Y
Table of Contents
Installation Y
Usage Y
License Y
Contributing Y
Tests 
Questions
*/

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter the title of the project:",
        validate: (answer) => {
            if (!answer) {
                return "Please enter the project name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "description",
        message: "Enter a short description about the project:",
        validate(answer) {
            if (!answer) {
                return "Please write a short description about the project.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "installation.confirm",
        message: "Confirm if project requires extra installation steps to run:",
        choices: ["Yes", "No"]
    },
    {
        type: "editor",
        name: "installation.details",
        message: "Enter the installation requirements of this project:",
        when(answer) {
            return answer.installation.confirm === "Yes"
        }
    },
    {
        type: "input",
        name: "usage",
        message: "Enter the usage instructions for this project:"
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a license for this project:",
        choices: ["GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "Unlicense"]
    },
    {
        type: "input",
        name: "contributing",
        message: "What are the guidelines for project contribution from other developers:"
    },
    {
        type: "input",
        name: "tests",
        message: "Enter test instructions for this project:"
    },
    {
        type: "input",
        name: "author",
        message: "Enter project author's GitHub username:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter project author's email address:"
    }
];

inquirer
    .prompt(questions)
    .then((readmeData) => {
        console.log(JSON.stringify(readmeData, null, 4));

        let markdown = generateMarkdown(readmeData);

        fs.writeFile("userREADME.md", markdown, (err) => {
            err ? console.log(err) : console.log("Success");
        });
    })
    





// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
// init();
