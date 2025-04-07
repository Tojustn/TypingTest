import Test from "../models/test.model.js";
import User from "../models/user.model.js";

export const submitTest = async (req, res) => {
    try {
        const { userId, text, time, wrongChar } = req.body;
        const mins = time / 60
        const numChars = text.length;
        const numWords = text.length;
        const rawWPM = numWords / mins;
        const accuracy = ((numChars - wrongChar) / numChars) * 100;
        const penalty = wrongChar / 5;
        let actualWPM = rawWPM - penalty;
        if (actualWPM < 0) actualWPM = 0;
        console.log(`Number of Words ${numWords} \nTime ${mins}`);
        console.log(`User Id ${userId}`)
        if (!userId) {
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
                { _id: userId },
                { $set: { topWPM: actualWPM } }
            );
        }
        const avgAdj = await Test.aggregate([
            { $match: { user: user._id } },
            {
                $group: {
                    _id: null,
                    avgAdjWPM: { $avg: "$adjWPM" }
                }
            }
        ]);

        // Update user's average WPM - extract the value from the aggregation result
        if (avgAdj.length > 0) {
            await User.updateOne(
                { _id: userId },
                { $set: { avgWPM: avgAdj[0].avgAdjWPM } }
            );
            // Update local user object for response
            user.avgWPM = avgAdj[0].avgAdjWPM;
        }
        // Update user's average WPM
        await User.updateOne(
            { _id: userId },
            { $set: { avgWPM: avgAdj[0].avgAdjWPM } }
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
