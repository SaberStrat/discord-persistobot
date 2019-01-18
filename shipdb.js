var fs = require('fs');

DB_NAME = './shipdb.json';

function createDB(){
    fs.writeFileSync(DB_NAME);
}

function createFleet(fleetname){
    return 0;
}

function addShipToFleet(shipname, fleetID){
    return 0;
}