import * as petService from '../services/petService.js';


export const getAllPets = async (req, res) => {
    try{
        const pets = await petService.getAllPets()
        return res.status(200).json(pets)
    } 
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const getPetById = async (req, res) => {
    try {
        const pet = await petService.getPetById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        return res.status(200).json(pet);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const addPet = async (req, res) => {
    try {
        const newPet = await petService.addPet(req.body)
        res.status(201).json(newPet);
    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const updatePet = async (req, res) => {
    try{
        const updatedPet = await petService.updatePet(req.body, req.params.id)
        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        return res.status(200).json(updatedPet);

    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}


export const deletePet = async (req, res) => {
    try{
        await petService.deletePet(req.params.id)
        return res.status(204).send();
    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}
