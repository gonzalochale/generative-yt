import { getSupabaseAuth, getSupabaseClient } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = getSupabaseAuth();
    const { error, data } = await supabase.exchangeCodeForSession(code);

    if (!error) {
      const existingUser = await getSupabaseClient()
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (existingUser.data) {
        await getSupabaseClient()
          .from("users")
          .update({
            token: data.session.provider_token,
            refresh_token: data.session.provider_refresh_token,
          })
          .eq("id", data.user.id);
      } else {
        await getSupabaseClient()
          .from("users")
          .insert([
            {
              id: data.user.id,
              token: data.session.provider_token,
              refresh_token: data.session.provider_refresh_token,
            },
          ]);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
