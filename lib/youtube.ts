import { signOutAction } from "@/actions/user";
import { getSupabaseAuth, getSupabaseClient, getUser } from "@/lib/auth";
import { google } from "googleapis";
import { toast } from "sonner";

export const getProviderTokens = async () => {
  const session = (await getSupabaseAuth().getSession()).data.session;

  if (!session?.provider_token || !session?.provider_refresh_token) {
    const { errorMessage } = await signOutAction();
    if (errorMessage) {
      toast.error("Failed to sign out");
    }
    toast.success("You need no loggin again");
  }

  // const user = (await getSupabaseAuth().getUser()).data.user;

  // const userRefreshToken = await getSupabaseClient()
  //   .from("users")
  //   .select("refresh_token")
  //   .eq("id", user?.id)
  //   .single();

  // console.log("userRefreshToken", userRefreshToken);

  // const response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     client_id: process.env.GOOGLE_CLIENT_ID,
  //     client_secret: process.env.GOOGLE_CLIENT_SECRET,
  //     refresh_token: userRefreshToken?.data?.refresh_token,
  //     grant_type: "refresh_token",
  //   }),
  // });

  // const googleData = await response.json();

  // await getSupabaseClient()
  //   .from("users")
  //   .update({
  //     token: googleData.access_token,
  //   })
  //   .eq("id", user?.id);

  return {
    providerToken: session?.provider_token,
    refreshToken: session?.provider_refresh_token,
  };
};

export const getYouTubeAnalytics = async () => {
  const { providerToken, refreshToken } = await getProviderTokens();

  const auth = new google.auth.OAuth2();

  auth.setCredentials({
    access_token: providerToken,
    refresh_token: refreshToken,
  });

  const youtubeAnalytics = google.youtubeAnalytics({
    version: "v2",
    auth: auth,
  });

  return youtubeAnalytics;
};
