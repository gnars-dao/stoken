#!/usr/bin/env node
"use strict";
/*
        Pioneer CLI
            -Highlander

    Exploring New Worlds!

 */
require("dotenv").config();
require("dotenv").config({path: "./../.env"});
require("dotenv").config({path: "../../.env"});
require("dotenv").config({path: "../../../.env"});
require("dotenv").config({path: "../../../.env"});
require("dotenv").config({path: "../../../../.env"});


const TAG = " | App | ";
//cli tools
const inquirer = require("inquirer");

//primary app
import {
    showWelcome
} from './modules/views'
import {
    onStart,
    onRun
} from './modules/app'



//platform
// let platform = require("@pioneer-platform/platform");

//pioneer api
// let server = require("@pioneer-platform/pioneer-rest-ts")
// server.start()

//Subcommand patch
const program = require( './modules/commander-patch' );
const log = require("loggerdog-client")();

// must be before .parse()
program.on('--help', () => {
    showWelcome()
});

/*
    Pioneer Server
        (docs)
 */
//TODO flag run on port
// const projectCommand = program
//     .command( 'server start' )
//     .description( 'Start The Pioneer Server' )
//     .action( () => {
//         server.start()
//     } );
//
// projectCommand
//     .command( 'start' )
//     .action( () => {
//         server.start()
//     } );

//TODO stop server
//TODO kill on exit

/*
    Platform Users
        List users
        ping user
        send request
        view requests
 */
const userCommand = program
    .command( 'user' )
    .description( 'Create a Pioneer Application' )
    .forwardSubcommands();

userCommand
    .command( 'list' )
    .action( () => {

    } );

userCommand
    .command( 'request' )
    .action( () => {

    } );

/*
    Platform APPs
        App ecosystem
        Create
        Publish
        Revoke
 */

// const appCommand = program
//     .command( 'app' )
//     .description( 'Create a Pioneer Application' )
//     .forwardSubcommands();
//
// appCommand
//     .command( 'create' )
//     .action( () => {
//         let tag = " | app | "
//
//         const questions = [
//             {
//                 type: "input",
//                 name: "appname",
//                 message: "select an application name",
//                 default: "sample app",
//             },
//             //wallets
//         ];
//
//         inquirer.prompt(questions).then(async function (answers: any) {
//             //check if name available
//             log.info(tag,"answers: ",answers)
//             //generate template to file
//             platform.create(answers.appname)
//             //create app remote
//
//         });
//     } );

// appCommand
//     .command( 'ls' )
//     .action( () => {
//         //list all apps
//     } );
//
// appCommand
//     .command( 'publish' )
//     .action( () => {
//         let tag = " | app | "
//         //push to app store
//     } );


/*
    onStart
        If no commands, assume --it
 */
log.info("args",process.argv)

const onInteractiveTerminal = async function(){
    let tag = TAG + " | onInteractiveTerminal | "
    try{
        log.info("Starting Interactive Terminal")
        //start it mode
        showWelcome()

        let successStart = await onStart()
        log.debug(tag,"successStart: ",successStart)
        //display dashboard

        //onRun
        onRun()

    }catch(e){
        log.error("Terminal Exit: ",e)
        process.exit(2)
    }
}

if(process.argv.length === 2){
    onInteractiveTerminal()
} else {
    program.parse( process.argv );
}


















