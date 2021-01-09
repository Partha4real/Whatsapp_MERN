// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './Messages.js';
import morgan from 'morgan';
import Pusher from 'pusher';

// app config
const app = express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1135383",
    key: "cfbecf8435342e494078",
    secret: "76531c3081ca18089b8f",
    cluster: "ap2",
    useTLS: true
  });


// middleware
app.use(express.json());
// morgan
app.use(morgan('dev'));

//DB config
const DB_URL = 'mongodb+srv://partha123:partha123@cluster0.jbzvn.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB Connected');
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
            });
        } else {
            console.log("Error triggering pusher");
        }
    })
})

// ???

// API routes
app.get('/', (req, res) => res.status(200).send('hello world'));  // 200 -> OK 

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    });
});

app.get('/messages/sync', (req, res) => {

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(PORT, () => console.log(`Lispening on PORT ${PORT}`));


