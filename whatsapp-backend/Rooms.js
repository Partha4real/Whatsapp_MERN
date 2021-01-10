import mongoose from 'mongoose';


const RoomSchema = mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

export default mongoose.model('rooms', RoomSchema); 