import { Router } from 'express';
import supabase from '../database/petDatabase.js';

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ message: error.message });

    }

    res.status(201).json({ message: "Account Created: Check your email to confirm then come back and log in"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(401).json({ message: error.message });
    }

    res.status(200).json({
        message: "login Successful",
        token: data.session.access_token,
        user: data.user
    });
});

export default router;