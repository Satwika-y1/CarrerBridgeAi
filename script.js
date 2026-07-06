const supabaseUrl = "https://wjzgehjmhvsemjvfngab.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqemdlaGptaHZzZW1qdmZuZ2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjQ2MDUsImV4cCI6MjA5ODg0MDYwNX0.9TAqAl0Pe3MQ9oz5wu4wLmX8B2Pf_HPO6fUeTX2i_0s";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Triggers search when Enter is pressed
document.getElementById("skill").addEventListener("keypress", function(event) {
    if (event.key === "Enter") findMatches();
});

function getRandomColor() {
    const colors = ['#e17055', '#fdcb6e', '#00b894', '#0984e3', '#6c5ce7', '#d63031'];
    return colors[Math.floor(Math.random() * colors.length)];
}

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
            const color = getRandomColor();
            resultsDiv.innerHTML += `
                <div class="card" style="border-left-color: ${color}">
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
        resultsDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    }
}