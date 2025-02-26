
import Test from "../models/test.model.js"
import User from "../models/user.model.js"
import Text from "../models/text.model.js"

export const submitTest = async(req,res) => {
    try{
        const {textId, time, wrongChar} = req.body;
        const user = await User.findById(req.user._id).select("-password")
        const text = await Text.findById(textId)
        let numWords = 0;
        const numChars = text.text.length;
        let index = 0;
        while (text.text[index]){
            if(text.text[index] === " "){
                numWords += 1;
            }

            index++;
        }
        numWords += 1;

        const rawWPM = numWords/time;
        const accuracy = (numChars - wrongChar)/numChars;
        const penalty = wrongChar/5;
        let actualWPM = rawWPM - penalty;
        actualWPM < 0? actualWPM = 0 :actualWPM; 
        const newTest = new Test({
            accuracy: accuracy,
            rawWPM: rawWPM,
            user: user,
            adjWPM: actualWPM,
            text: text,
            totalTime: time,

        })
        // If no user don't save the test just return needed stuff
        if(!user){
            res.status(200).json({
                accuracy:accuracy,
                rawWpm: rawWPM,
                adjWPM: actualWPM,
                text: text,
                totalTime: time,
            })
            return
        }
        else if (newTest){
            await newTest.save();
            await user.updateOne({
               $push:{tests: newTest} 
	    })

        
            if(user.topWPM < actualWPM){
                await User.updateOne({
                    _id: req.user._id
                }, {$set: {topWPM: actualWPM}}) }
                    
              // Aggregate the sum of all the adjWPMs in the tests
		const totalAdj = await Test.aggregate([
			{$match: {user: user._id}},
			{$group:{ 
				_id: null,
				totalAdjWPM: {$sum: "$adjWPM"} 
			}}
		]);
		let numTests = user.tests.length;
		// Calculate the new average
		let newAvg = 0;
		if (totalAdj.length > 0 && totalAdj[0].totalAdjWPM !== null) {
			newAvg = numTests === 0 ? 0 : totalAdj[0].totalAdjWPM / numTests;
		}
		console.log(newAvg);

            await User.updateOne({
                _id: user._id
            }, {$set: {avgWPM: newAvg}}
        )
            await user.save();
            res.status(200).json({
                accuracy: accuracy,
                rawWPM: rawWPM,
                user: user,
                adjWPM: actualWPM,
                text: text,
                totalTime: time,
            })
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Error Submitting Test"});
    }
}

