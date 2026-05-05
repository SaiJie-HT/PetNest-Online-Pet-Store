import { Router } from 'express';
import supabase from '../database/petDatabase.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.get("/getUserProfile", async (req, res) => {
    const user = req.user.id;
    const { data, error } = await supabase
        .from('Profiles')
        .select('ID, FirstName, LastName, ShippingAddress') // no need to reveal auth role
        .eq('ID', user)
        .single();

    if (error) {
        return res.status(500).json({ message: error.message });
    }

    return res.status(200).json(data);
});

//no need for post, as account creation already initiates the record but does not fully fill entire profile record

//put router to update profile
//before any purchase is made, user profile record should be filled completely.
router.put("/updateUserProfile", async (req, res) => {
    const user = req.user.id;

    const { data, error } = await supabase
        .from('Profiles')
        .update(req.body)
        .eq('ID', user);

    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json({ message: "User Profile Updated" });
});

export default router;
