// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './Messages.js';
import Rooms from './Rooms.js';
import morgan from 'morgan';
import Pusher from 'pusher';
import cors from 'cors';

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
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

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
    const roomCollection = db.collection("rooms");
    const changeRoomStream = roomCollection.watch();
        changeRoomStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const roomDetails = change.fullDocument;
            pusher.trigger('rooms', 'created',
            {
                name: roomDetails.name,
                id: roomDetails._id
            });
        } else {
            console.log("Error triggering pusher");
        }

    });

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
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log("Error triggering pusher");
        }
    });
});

// ???

// API routes
app.get('/', (req, res) => res.status(200).send('hello world'));  // 200 -> OK 

// Rooms
app.post('/rooms/create', (req, res) => {
    const dbRoom = req.body;

    Rooms.create(dbRoom, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    });
});

app.get('/rooms/fetch', (req, res) => {

    Rooms.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})


// messages
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
