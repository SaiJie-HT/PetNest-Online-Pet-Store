import supabase from '../database/petDatabase.js';

export const getAllPets = async () => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .order('PetName', { ascending: true })
        .limit(100);

    if (error) throw {
        status: 500,
        message: error.message
    }
    return data
}

export const getPetById = async (id) => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .eq("PetID", id)
        .single();
        
    if (error) throw {
        status: 500,
        message: error.message
    };
    return data;
};

export const addPet = async ({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription}) => {
    const { data, error } = await supabase
        .from('Pet')
        .insert({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription })
        .select()
        .single();
    if (error) throw {
        status:500,
        message:error.message
    }
    return data;
}

export const updatePet = async (body, id) => {
    const { data, error } = await supabase
        .from('Pet')
        .update(body) 
        .eq("PetID", id)
        .select()
        .single();
    if (error) throw {
        status: 500,
        message: error.message
    }
    return data;
}

export const deletePet = async (id) => {
    const { data, error } = await supabase
        .from('Pet')
        .delete()
        .eq("PetID", id)
        .select()
        .single();
    if (error) throw {
        status: 500,
        message: error.message
    }
    return data;
}