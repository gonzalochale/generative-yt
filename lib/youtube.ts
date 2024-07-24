import { getSupabaseAuth } from "@/lib/auth";
import { google } from "googleapis";

export const getProviderToken = async () => {
  const token = (await getSupabaseAuth().getSession()).data.session
    ?.provider_token;

  return token;
};

export const getYouTubeAnalytics = async () => {
  const providerToken = await getProviderToken();

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: providerToken });

  const youtubeAnalytics = google.youtubeAnalytics({
    version: "v2",
    auth: auth,
  });

  return youtubeAnalytics;
};

// TODO: refresh token using the refresh token, and store the new token in the database
