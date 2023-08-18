const { Schema, model } = require("mongoose");
const eventSchema = new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true,
    },

    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: {

            type: [Number],
            required: true
        }
    }

},
    {
        timestamps: true
    });


eventSchema.index({ location: '2dsphere' })
const Event = model("Event", eventSchema);

module.exports = Event
