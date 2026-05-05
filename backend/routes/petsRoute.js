import { Router } from 'express';
import supabase from '../database/petDatabase.js';
import isAdmin from '../middleware/isAdmin.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

//Basic CRUD Operations from class
//get route needs no permissions like authentication and admin. Anyone is free to access store product listing data
router.get("/get", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Pet')
            .select()
            .order('PetName', { ascending: true })
            .limit(100);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Get single pet by ID
router.get("/get/:petID", async (req, res) => {
    const petIdentifier = req.params.petID;
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .eq("PetID", petIdentifier)
        .single();
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(200).json(data);
});
//post, put, and delete require userauthentication and admin privillages 
router.post("/addpetlisting", requireAuth, isAdmin, async (req, res) => {
    const { PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription } = req.body;

    const { error } = await supabase
        .from('Pet')
        .insert({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription });

    if (error) return res.status(500).json({ message: error.message });

    return res.status(201).json({ message: "Pet Added to Database" });
});

router.put("/editpetlisting/:petID", requireAuth, isAdmin, async (req, res) => {

    const petIdentifier = req.params.petID; //petId from given from the url

    const { data, error } = await supabase
        .from('Pet')
        .update(req.body) //updates based on json body sent in post request; other data are ignored if not a field in relation
        .eq("PetID", petIdentifier);

    if (error) {
        return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ message: "Pet Listing Updated" });
});

router.delete("/deletepetlisting/:petID", requireAuth, isAdmin, async (req, res) => {
    const petIdentifier = req.params.petID;

    const { error } = await supabase
        .from('Pet')
        .delete()
        .eq("PetID", petIdentifier);

    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json({ message: "Pet Listing Deleted" })

});

export default router;
