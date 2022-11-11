import { createClient } from "@supabase/supabase-js"

const PROJECT_URL="https://pqgvvhazvgkwthjccyoy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZ3Z2aGF6dmdrd3RoamNjeW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTA1MTUsImV4cCI6MTk4Mzc2NjUxNX0.FYhZT7Od_0lNrE0FmawjkjaBJGIkccXP2xNRNxNsw6E"
const supabase = createClient(PROJECT_URL,PUBLIC_KEY);


export function videoService(){
    return{
        getAllVideos(){
            return supabase.from("video")
                    .select("*")
        }
    }
}