/*
   Redis queue toolkit

   index queues

   document setting configurations and best practices

 */

import path from "path";

const Datastore = require('nedb-promises')
const mkdirp = require("mkdirp");

let DATABASES:any = {}

import {
    pioneerPath,
} from "@pioneer-platform/pioneer-config";

// dbPaths
export const dbs = path.join(pioneerPath, "dbs");

module.exports = {
    init:async function () {
        //verify dir exists
        let isCreated = await mkdirp(dbs)

        DATABASES['txs'] = Datastore.create(dbs+'/txs.db')
        DATABASES['pubkeys'] = Datastore.create(dbs+'/pubkeys.db')



        return DATABASES
    },
    db:function () {
        return DATABASES
    }
 }

