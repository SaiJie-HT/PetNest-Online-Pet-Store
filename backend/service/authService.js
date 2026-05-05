import supabase from '../database/petDatabase.js';

export const register = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw { status: 400, message: error.message };

    if (data.user) {
        const { error: profileError } = await supabase
            .from('Profiles')
            .insert({ ID: data.user.id });

        if (profileError) throw { 
            status: 500, 
            message: "Account created, but profile creation failed." 
        };
    }
};

export const login = async ({ email, password }) => {
    let data, error;

    if (password) {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
        ({ data, error } = await supabase.auth.signInWithOtp({ email }));
    }

    if (error) throw { status: 401, message: error.message };

    if (password) {
        return {
            message: "Login Successful",
            token: data.session.access_token,
            user: data.user
        };
    }

    return { message: "OTP sent successfully" };
};

export const verifyOtp = async ({ email, otpCode }) => {
    const { data, error } = await supabase.auth.verifyOtp({ 
        email, 
        type: "email", 
        token: otpCode 
    });

    if (error) throw { status: 400, message: error.message };

    return {
        message: "Login Successful",
        token: data.session.access_token,
        user: data.user
    };
};