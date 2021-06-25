const  express = require('express');
const cors = require('cors');
const app =new express();
const corsOption= {
    origin: null,
    optionsSuccessStatus: 200
};
const PORT=3002
app.use(cors());
app.use(express.json());

async function addUpdateAnswer(res) {
    try{
        res.json('Ответ от сервера'+ 'данные от калькулятора получены');
    }
    catch (e) {
        res.send(e);
    }
};

app.get('/updateFromServer', cors(corsOption), (req,res)=>{
    console.log('пришел запрос от ui')
    addUpdateAnswer(res)

});
// app.post('/update', cors(corsOption), (request,response) =>{
//     addUpdateAnswer(res);
// });

app.listen(PORT, ()=> {
    console.log('Сервер работает');
});