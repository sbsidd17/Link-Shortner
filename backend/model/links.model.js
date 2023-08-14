import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required:true
    },
    clickCounts:[
        {
            clickedOn: Date
        }
    ],
    totalClicks:Number
},
{
    timestamps: true
}
)

const Links = mongoose.model("links", linkSchema);

export default Links;