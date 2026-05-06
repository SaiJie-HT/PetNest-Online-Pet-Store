import * as profileService from '../services/profileService.js';


export const getUser = async (req, res) => {
    try{
        const profile = await profileService.getUser(req.user.id)
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile)
    }
    catch(error){
        res.status(error.status || 500).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try{
        const updatedProfile = await profileService.updateUser(req.user.id, req.body)
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found to update" });
        }
        res.status(200).json(updatedProfile)
    }
    catch (error){
        res.status(error.status || 500).json({message: error.message})
    }
}
