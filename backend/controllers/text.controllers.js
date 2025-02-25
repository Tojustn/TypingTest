import Text from "../models/text.model.js";

export const getText = async (req, res) => {
    try {
        const { source} = req.body;

        if (!source) {
            return res.status(400).json({ error: "Source not found" });
        }

        const numDocuments = await Text.countDocuments({ source });
        if (numDocuments === 0) {
            return res.status(404).json({ error: "No documents found for this source" });
        }

        const randIndex = Math.floor(Math.random() * numDocuments); // Fix the random calculation
        const textDocument = await Text.findOne({ source }).skip(randIndex); // Changed variable name to avoid collision

        if (!textDocument) {
            return res.status(404).json({ error: "No text document found" });
        }

        res.status(200).json({ Text: textDocument}); // Return the new Text
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Issue getting text" });
    }
};


export const postText = async(req,res) => {
    try{
        const {text, source} = req.body;
        const newText = new Text({
            text: text,
            source: source
        })
        const previousText =await Text.findOne({text})
        if(previousText){
            res.status(400).json({error: "Text has already been submitted"})
            return
        }
        
        await newText.save();
        res.status(200).json({
            text: text,
            source: source
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Error posting text"})
    }
}
