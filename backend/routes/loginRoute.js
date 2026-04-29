import { Router } from 'express';
import supabase from '../database/petDatabase.js';

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    if (data.user) {
        const { error: profileError } = await supabase
            .from('Profiles')
            .insert({ ID: data.user.id });

        if (profileError) {
            return res.status(500).json({ message: "Account created, but profile creation failed.", error: profileError.message });
        }
    }

    return res.status(201).json({ message: "Account Created: Check your email to confirm then come back and log in"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let data, error;

    if (password) {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
        ({ data, error } = await supabase.auth.signInWithOtp({ email }));
    }

    if (error) {
        return res.status(401).json({ message: error.message });
    }

    if (password) {
        return res.status(200).json({
            message: "login Successful",
            token: data.session.access_token,
            user: data.user
        });

    } else {
        res.status(200).json({ message: "OTP sent successfully" });
    }
});

router.post("/verifyOtp", async (req, res) => {
    const { email, otpCode } = req.body;
    const { data, error } = await supabase.auth.verifyOtp({ email, type: "email", token: otpCode });

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({
        message: "login Successful",
        token: data.session.access_token,
        user: data.user
    });
});

export default router;
