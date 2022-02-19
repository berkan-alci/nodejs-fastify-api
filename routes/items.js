const { getItems, getItem, postItem, delItem, putItem } = require('../controllers/itemcontroller');

// Item schema

const Item = {
    type:'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    }
};

// Options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type:'array',
                items: { 
                    Item
                }
            }
        }
    },
    handler: getItems
};

const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
};

const postItemOpts = {
    schema: {
        body: {
            type:'object',
            required: ['name'],
            properties: {
                name:{type: 'string'}
            }
        },
        response: {
            201: Item
        }
    },
    handler: postItem
};

const delItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    },
    handler: delItem
};

const updItemOpts = {
    schema: {
        body: {
            type:'object',
            required: ['name'],
            properties: {
                name:{type: 'string'}
            }
        },
        response: {
            200: Item
        }
    },
    handler: putItem
};

function itemRoutes (fastify, options, done) {

    // Get all items
    fastify.get('/items', getItemsOpts);
    
    // Get single items
    fastify.get('/items/:id', getItemOpts);

    //Add item
    fastify.post('/items', postItemOpts);

    //Delete item
    fastify.delete('/items/:id', delItemOpts);

    //Update item
    fastify.put('/items/:id', updItemOpts);
    

    done();
};

module.exports = itemRoutes;