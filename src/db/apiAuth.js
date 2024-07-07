import Error from "@/components/Error";
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();
    if (!session.session) return null;
    if (error) throw new Error(error.message);
    return session.session?.user;
}

export async function signup({ name, email, password, profile_pic }) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

    try {
        // Upload profile picture to Supabase storage
        const { error: storageError } = await supabase.storage
            .from("profile_pic")
            .upload(fileName, profile_pic);

        if (storageError) throw new Error(storageError.message);

        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
                },
            },
        });

        if (error) {
            if (error.message.includes("rate limit")) {
                console.error("Rate limit exceeded. Please try again later.");
            }
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error("Error during signup:", error.message);
        throw error;
    }
}


export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}