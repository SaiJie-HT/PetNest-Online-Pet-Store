import * as profileService from '../services/profileService.js';


export const getUser = async (req, res) => {
    try{
        const result = await profileService.getUser(req.user.id)
        return res.status(200).json(result)
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try{
        const updatedUser = await profileService.updateUser(req.user.id, req.body)
        return res.status(200).json(updatedUser)
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}