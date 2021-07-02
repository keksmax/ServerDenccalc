const gammaKof = require('../tables/kofCompGamma');

function getGamma(dens15, tempPriv) {
    try{
        while(dens15<750) return 0;
        let stb = parseInt((dens15-750)/2);
        if(stb>104) return 0;
        tempPriv = parseInt(tempPriv);
        let str = parseInt((tempPriv+15)/2);
        if(str>29) return 0;
        let gammaRes = gammaKof[stb][str]/1000;
        if(isNaN(gammaRes))return 0;
        return gammaRes.toFixed(6);
    } catch (e) {
        console.log(e);

    }
}

module.exports = getGamma;