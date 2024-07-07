import supabase from "./supabase";


export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlIds);

    console.log("Clicks", data)
    if (error) {
        console.error("Error fetching clicks:", error);
        return null;
    }

    return data;
}