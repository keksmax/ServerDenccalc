const dens15 = require('../tables/dens15');
const Get_K20_K15 = require('../tables/k_arr');


function denc15Calculate(dens,temp,gradOreom) {
    try{
        while(dens<750) return 0;
        dens1 = parseFloat(dens);
        let densround = dens1.toFixed(0);
        let reminder = 0;
        reminder = densround%2;
        if(reminder>0) densround++;
        let stb = parseInt(densround/2-375);
        let deltadens = densround-dens;
        if(stb>105) return 0;
        if((temp<-14) || (temp>45)) return 0;
        temp=parseFloat(temp)
        let temp10round = parseInt(((temp+14)*10).toFixed(0));
        reminder=0;
        reminder = temp10round%2;
        if(reminder>0) temp10round++;
        let str = parseInt(temp10round/2);
        if (str>295) return 0;
        let dens15Res = dens15[str][stb];
        deltadens = deltadens.toFixed(1)
        dens15Res = dens15Res-deltadens;
        if (gradOreom==15) {
          let k_arr=Get_K20_K15(temp);
          dens15Res = dens15Res*k_arr;
        }
        return dens15Res.toFixed(1);
    }catch (e) {
        console.log(e);
    }



}

module.exports = denc15Calculate;