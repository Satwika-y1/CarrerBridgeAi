const supabaseUrl = "https://wjzgehjmhvsemjvfngab.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqemdlaGptaHZzZW1qdmZuZ2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjQ2MDUsImV4cCI6MjA5ODg0MDYwNX0.9TAqAl0Pe3MQ9oz5wu4wLmX8B2Pf_HPO6fUeTX2i_0s";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function findMatches() {
    const userSearch = document.getElementById("skill").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!userSearch) {
        resultsDiv.innerHTML = "Please enter a skill.";
        return;
    }

    resultsDiv.innerHTML = "Searching...";

    try {
        const { data, error } = await supabaseClient
            .from("opportunities")
            .select("*")
            .ilike("internship", `%${userSearch}%`);

        if (error) throw error;

        resultsDiv.innerHTML = "";

        if (data.length === 0) {
            resultsDiv.innerHTML = "<p>No matches found.</p>";
            return;
        }

        data.forEach(item => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <h3>${item.internship}</h3>
                    <p><strong>Company:</strong> ${item.company}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Duration:</strong> ${item.duration}</p>
                    <p><strong>Stipend:</strong> ${item.stipend}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = `<p>${err.message}</p>`;
    }
}