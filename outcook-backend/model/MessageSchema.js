import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true // Automatically generate an ObjectId
    },
    from: {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    to: {
        email: {
            type: String,
            required: true,
        }
    },
    subject: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    attachments: [{
        type: [String], // Assuming attachments are URLs
    }],
    isFavorite: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const Message = mongoose.model('Message', messageSchema);
export default Message