function getCastDensity(dens15, betta, tempCast, gamma, pressCast) {
    dens15 = parseFloat(dens15);
    betta = parseFloat(betta);
    tempCast = parseFloat(tempCast);
    gamma = parseFloat(gamma);
    pressCast = parseFloat(pressCast);
    console.log(dens15);
    console.log(betta);
    console.log(tempCast);
    console.log(gamma);
    console.log(pressCast);
    let castDensityCalc = (dens15 / ((1 + betta * (tempCast - 15) + 1.3 * Math.pow(betta, 2) * Math.pow((tempCast - 15), 2)) * (1 - (gamma * pressCast)))).toFixed(1);
if(isNaN(castDensityCalc)) return 0;
   return  castDensityCalc;

}

module.exports = getCastDensity;