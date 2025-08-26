import { generateStreamToken, upsertStreamUser } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        // console.log("User data for Stream:", {
        //     id: req.user.id,
        //     name: req.user.fullName,
        //     image: req.user.profilePics,
        // });
        // console.log("Full req.user object:", req.user);
        await upsertStreamUser({
            id: req.user.id,
            name: req.user.fullName,
            image: req.user.profilePics,
        });
        const token = generateStreamToken(req.user.id);
        res.status(200).json({ token });
    } catch (error) {
        console.log("Error in getStreamToken controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}