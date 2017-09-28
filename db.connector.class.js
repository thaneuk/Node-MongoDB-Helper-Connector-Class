/*
 * requires
 * 1. MongoClient for NodeJS
 * 2. A "db.config.json" file to be created with the configuration required to access MongoDB.
 *
 * e.g.
 * {
 *     "host": "127.0.0.1",
 *     "port": 27017,
 *     "path": "/mockdb"
 * }
 *
 */
'use strict';

/**
 * Base MongoDB connector class
 * @class DbConnector
 * @author Gregory Jackson
 */
class DbConnector {
    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.dbConfig = require('./db.config');
        this.ObjectID = require('mongodb').ObjectID;
    }

    get url() {
        return `mongodb://${this.dbConfig.host}:${this.dbConfig.port}${this.dbConfig.path}`;
    }

    get connect() {
        return this.MongoClient.connect(this.url).catch(console.error);
    }

    collection(name) {
        return this.connect.then(function (db) {
            let dbConstruct = {
                close: () => {
                    db.close();

                    /* as it is closed we will null it out */
                    dbConstruct = dbConstruct.collection = dbConstruct.close = db = null;
                },
                collection: db.collection(name)
            };

            return dbConstruct;
        });
    }

    get collectionNamesAsArray() {
        return this.connect.then(db => db.listCollections().toArray().then(records => {
                db.close();

                return records;
            })
        );
    }

    async asyncCollectionNamesAsArray() {
        return this.connect.then(db => db.listCollections().toArray().then(records => {
                db.close();

                return records;
            }).catch(console.error)
        );
    }

    removeCollection(name) {
        return this.connect.then(db => {
            let dropResult = db.collection(name).drop();

            db.close();

            return dropResult;
        });
    }

    generateId(id) {
        return new this.ObjectID(id);
    }
}


module.exports = DbConnector;
