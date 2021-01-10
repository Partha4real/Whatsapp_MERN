import mongoose from 'mongoose';


const RoomSchema = mongoose.Schema({
    name: String,
});

export default mongoose.model('rooms', RoomSchema); 