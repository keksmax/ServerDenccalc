const express = require('express');
const denc15Calculate = require('./calculate/dens15calc');
const denc20Calculation = require('./calculate/dens20Calc');
const getBetta = require('./calculate/getBetta');
const Get_K20_K15 = require('./tables/k_arr');
const getGamma = require('./calculate/getGamma');
const castDensityCalc = require('./calculate/dens15tP');
const cors = require('cors');
const app = new express();
const corsOption = {
    origin: null,
    optionsSuccessStatus: 200
};
const PORT = 3002
app.use(cors());
app.use(express.json());

async function addUpdateAnswer(res) {
    try {
        res.json('Ответ от сервера' + 'данные от калькулятора получены');
    } catch (e) {
        res.send(e);
    }
};

async function saveDataFromSourceData(data, responce) {
    try {
        let sourceData = [
            firstProbe = data.dataCalculate.sourceFirstProbe,
            secondProbe = data.dataCalculate.sourceSecondProbe,
            tempFirst = data.dataCalculate.temperatureFirst,
            tempSecond = data.dataCalculate.temperatureSecond,
            graduationOreom = data.dataCalculate.graduationOreom,
            graduationOreomSecond = data.dataCalculate.graduationOreomSecond,
            tempCast = data.dataCalculate.tempCast,
            pressCast = data.dataCalculate.pressCast,
            errRate = data.dataCalculate.errorRate
        ]
        module.exports = sourceData;

        const backLog = await Promise;
        console.log('Данные с сервера пришли');
        let dens15First = denc15Calculate(sourceData[0], sourceData[2], sourceData[4]);
        let dens15Second = denc15Calculate(sourceData[1], sourceData[3], sourceData[5]);
        let dens20First = String(denc20Calculation(dens15First));
        let dens20Second = String(denc20Calculation(dens15Second));
        let KofK20_K15First = String(Get_K20_K15(sourceData[2]));
        let KofK20_K15Second = String(Get_K20_K15(sourceData[3]));
        let bettaFirst = String(getBetta(dens15First));
        let bettaSecond = String(getBetta(dens15Second));
        let gammaFirst = String(getGamma(dens15First, sourceData[6]));
        let gammaSecond = String(getGamma(dens15Second, sourceData[6]));
        let denstpFirst = castDensityCalc(dens15First, bettaFirst, sourceData[6], gammaFirst, sourceData[7])
        let denstPSecond = castDensityCalc(dens15Second, bettaSecond, sourceData[6], gammaSecond, sourceData[7])
        let densityFinal = (((parseFloat(denstpFirst) + parseFloat(denstPSecond)) / 2) + parseFloat(sourceData[8])).toFixed(2);

        getBetta(dens15First);
        console.log(sourceData);

        let result = {
            'densityFinalCalc': densityFinal,
            'castDensitytPCalcFirst': denstpFirst,
            'castDensitytPCalcSecond': denstPSecond,
            'denc15First': dens15First,
            'denc15Second': dens15Second,
            'dens20First': dens20First,
            'dens20Second': dens20Second,
            'KofK20_K15First': KofK20_K15First,
            'KofK20_K15Second': KofK20_K15Second,
            'bettaFirst': bettaFirst,
            'bettaSecond': bettaSecond,
            'gammaFirst': gammaFirst,
            'gammaSecond': gammaSecond,
        }
        responce.json(result);
    } catch (e) {
        responce.send(e);

    }
}

app.get('/updateFromServer', cors(corsOption), (req, res) => {
    console.log('пришел запрос от ui')
    addUpdateAnswer(res)
});

app.post('/updateDataCalc', cors(corsOption), (request, response) => {
    saveDataFromSourceData(request.body, response);
});

app.listen(PORT, () => {
    console.log('Сервер работает');
});