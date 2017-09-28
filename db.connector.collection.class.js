'use strict';

const
    DbConnector = require('./db.connector.class');


/**
 * Base MongoDB connector class for a single collection
 * @class DbConnectorCollection
 * @author Gregory Jackson
 */
class DbConnectorCollection extends DbConnector {
    constructor(collectionName) {
        super();

        if (!collectionName && typeof collectionName !== 'string') {
            throw 'Error: collection name required';
        }

        this.collectionName = collectionName;

        this.collectionNamesAsArray.then(names => names.map(cObj => cObj.name)).then(names => !names.includes(collectionName) && console.log(`collection "${collectionName}" does not currently exist`));
    }

    get collection() {
        return super.collection(this.collectionName);
    }

    get removeCollection() {
        return super.removeCollection(this.collectionName);
    }
}


module.exports = DbConnectorCollection;
