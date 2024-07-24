"use server";

import { getSupabaseAuth } from "@/lib/auth";
import { Provider } from "@supabase/supabase-js";

export const loginAction = async (provider: Provider) => {
  try {
    const { data, error } = await getSupabaseAuth().signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        scopes:
          "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly",
      },
    });

    if (error) throw error;

    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: "There was an error logging in", url: null };
  }
};

export const signOutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "There was an error signing out", url: null };
  }
};
