import mongoose from 'mongoose';


const WhatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    received: Boolean,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    }
}, {
    timestamps: true
});

export default mongoose.model('messagecontents', WhatsappSchema); 