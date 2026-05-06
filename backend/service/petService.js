import supabase from '../database/petDatabase.js';

export const getAllPets = async () => {
    const { data, error } = await supabase
        .from('Pet')
        .select();

    if (error) throw {
        status: 500,
        message: error.message
    }
    return data
}

export const addPet = async ({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription}) => {
    const { error } = await supabase
        .from('Pet')
        .insert({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription })
    if (error) throw {
        status:500,
        message:error.message
    }
}

export const updatePet = async (body, id) => {
    const petIdentifier = id
    const { data, error } = await supabase
        .from('Pet')
        .update(body) 
        .eq("PetID", petIdentifier);
    if (error) throw {
        status: 500,
        message: error.message
    }
}

export const deletePet = async (id) => {
    const petIdentifier = id
    const { error } = await supabase
        .from('Pet')
        .delete()
        .eq("PetID", petIdentifier);
    if (error) throw {
        status: 500,
        message: error.message
    }
}