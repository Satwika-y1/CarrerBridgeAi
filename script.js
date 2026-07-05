// Ensure Supabase is initialized correctly
// Replace 'YOUR_ANON_KEY' with your actual key
const supabaseUrl = 'https://wjzgehjmhvsemjvfngab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqemdlaGptaHZzZW1qdmZuZ2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjQ2MDUsImV4cCI6MjA5ODg0MDYwNX0.9TAqAl0Pe3MQ9oz5wu4wLmX8B2Pf_HPO6fUeTX2i_0s';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function findMatches() {
    const searchInput = document.getElementById("skill");
    const resultsDiv = document.getElementById("results");
    
    if (!searchInput) return; // Guard clause
    
    const userSearch = searchInput.value.trim();
    resultsDiv.innerHTML = "Searching...";

    try {
        // Fetch data from your 'opportunities' table
        const { data, error } = await supabase
            .from('opportunities')
            .select('*')
            .ilike('internship', `%${userSearch}%`); 

        if (error) throw error;

        resultsDiv.innerHTML = ""; 

        if (data && data.length > 0) {
            data.forEach(item => {
                resultsDiv.innerHTML += `
                    <div class="card">
                        <h3>${item.internship || 'No Title'}</h3>
                        <p><strong>Company:</strong> ${item.company || 'N/A'}</p>
                        <p><strong>Location:</strong> ${item.location || 'N/A'}</p>
                        <p><strong>Duration:</strong> ${item.duration || 'N/A'}</p>
                        <p><strong>Stipend:</strong> ${item.stipend || 'N/A'}</p>
                    </div>`;
            });
        } else {
            resultsDiv.innerHTML = "<p>No matches found.</p>";
        }
    } catch (err) {
        console.error("Error:", err);
        resultsDiv.innerHTML = `<p style="color:red;">Error loading data. Check console.</p>`;
    }
}