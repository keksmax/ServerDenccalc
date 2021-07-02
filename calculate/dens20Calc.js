const dens20 = require('../tables/dens20');

function denc20Calculation(dens15) {
    try {
        while (dens15<750) return 0;
        let col = ((dens15 - 750) * 10).toFixed(0);
        if (col > dens20.length) {
            return 0;
        }
        let dans20calc = parseFloat(dens20[col]);
        return dans20calc;
    } catch (e) {
        console.log(e);
    }

}

module.exports = denc20Calculation;