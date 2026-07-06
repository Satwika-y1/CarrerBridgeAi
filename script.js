const supabaseUrl = "https://wjzgehjmhvsemjvfngab.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqemdlaGptaHZzZW1qdmZuZ2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjQ2MDUsImV4cCI6MjA5ODg0MDYwNX0.9TAqAl0Pe3MQ9oz5wu4wLmX8B2Pf_HPO6fUeTX2i_0s";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("skill").addEventListener("keypress", (e) => { 
    if(e.key === "Enter") findMatches(); 
});

function getVibrantColor() {
    // A palette of high-contrast, modern colors
    const colors = ['#ff7675', '#fdcb6e', '#00b894', '#0984e3', '#6c5ce7', '#d63031'];
    return colors[Math.floor(Math.random() * colors.length)];
}

async function findMatches() {
    const userSearch = document.getElementById("skill").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!userSearch) { resultsDiv.innerHTML = "<h3>Please enter a skill.</h3>"; return; }

    resultsDiv.innerHTML = "Searching...";

    try {
        const { data, error } = await supabaseClient
            .from("opportunities")
            .select("*")
            .ilike("internship", `%${userSearch}%`);

        if (error) throw error;
        resultsDiv.innerHTML = "";

        if (data.length === 0) { resultsDiv.innerHTML = "<h3>No matches found.</h3>"; return; }

        data.forEach(item => {
            const color = getVibrantColor();
            resultsDiv.innerHTML += `
                <div class="card" style="border-left-color: ${color}">
                    <h3 style="color: ${color}">${item.internship}</h3>
                    <p><strong>🏢 Company:</strong> ${item.company}</p>
                    <p><strong>📍 Location:</strong> ${item.location}</p>
                    <p><strong>⏱️ Duration:</strong> ${item.duration}</p>
                    <p><strong>💰 Stipend:</strong> ${item.stipend}</p>
                </div>
            `;
        });
    } catch (err) {
        resultsDiv.innerHTML = `<h3>Error: ${err.message}</h3>`;
    }
}