const betta = require('../tables/betta');

function getBetta(dens15) {
    try{
        while (dens15<750) return 0;
        let bettai = parseInt(Math.round((dens15-750), 0));
        console.log(bettai + 'bettai')
        if(bettai>betta.length) return 0;
        let bettares = (betta[bettai])/1000;
        return bettares.toFixed(6);
    } catch (e) {
        console.log(e)
    }
}

module.exports = getBetta;