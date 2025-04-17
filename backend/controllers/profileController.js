const Profile = require("../models/profileModel");

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await Profile.getById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, password } = req.body;
        await Profile.update(req.user.id, { first_name, last_name, password });

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        
        if (error.message === "No updates provided") {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({ message: "Error updating profile" });
    }
};
