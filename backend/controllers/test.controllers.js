import Test from "../models/test.model.js";
import User from "../models/user.model.js";

export const submitTest = async (req, res) => {
    try {
        const {userId, text, time, wrongChar } = req.body;
        const mins = time/60
        const numChars = text.length;
        const numWords = text.length;
        const rawWPM = numWords / mins;
        const accuracy = ((numChars - wrongChar) / numChars) * 100;
        const penalty = wrongChar / 5;
        let actualWPM = rawWPM - penalty;
        if (actualWPM < 0) actualWPM = 0;
        console.log(`Number of Words ${numWords} \nTime ${mins}`);
        console.log(userId)
        if (!userId) {
            console.log("No User")
            return res.status(200).json({
                accuracy,
                rawWPM: rawWPM,
                adjWPM: actualWPM,
                text,
                totalTime: time,
            });
        }

        // Find the user in the database
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Create and save the new test
        const newTest = new Test({
            accuracy,
            rawWPM: rawWPM,
            user: user._id,
            adjWPM: actualWPM,
            text,
            totalTime: time,
        });

        await newTest.save();

        // Update user's test history
        await User.findByIdAndUpdate(
            user._id,
            { $push: { tests: newTest._id } },
            { new: true }
        );  

        // Update topWPM if necessary
        if (user.topWPM < actualWPM) {
            await User.updateOne(
                { _id: userId},
                { $set: { topWPM: actualWPM } }
            );
        }

        // Aggregate the sum of all the adjWPMs in the tests
        const totalAdj = await Test.aggregate([
            { $match: { user: userId} },
            {
                $group: {
                    _id: null,
                    totalAdjWPM: { $sum: "$adjWPM" }
                }
            }
        ]);

        const numTests = user.tests.length + 1; // Include the new test
        let newAvg = 0;
        if (totalAdj.length > 0 && totalAdj[0].totalAdjWPM !== null) {
            newAvg = totalAdj.totalAdjWPM[0] / numTests;
        }

        // Update user's average WPM
        await User.updateOne(
            { _id: userId },
            { $set: { avgWPM: newAvg } }
        );

        // Optionally, save the user if any other changes were made
        await user.save();

        res.status(200).json({
            accuracy,
            rawWPM: rawWPM,
            user,
            adjWPM: actualWPM,
            text,
            totalTime: time,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Submitting Test" });
    }
};
