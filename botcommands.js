export default {
    ship: {
        helptext: `A search on the official Star Citizen wiki, for the ship in the Query. 
        _Example: !ship vulcan_`,
        add: function(arg, userID, shipmgr, logger){
            if(shipExists(arg))
                return 0;
            return -1;
        }
    }
};