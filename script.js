const fetchArtistData = async () => {
  try {
    const baseUrl = "https://cdn.contentful.com/spaces/";
    const SPACE_ID = localStorage.getItem("space_id");
    const ACCESS_TOKEN = localStorage.getItem("access_token");

    if (!SPACE_ID || !ACCESS_TOKEN) {
      throw new Error("Missing API keys in localStorage.");
    }

    const apiUrl = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=artist`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed! HTTP Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Fetched data:", data);

    const contentContainer = document.getElementById("content");
    const filterContainer = document.getElementById("filters");

    contentContainer.innerHTML = "";
    filterContainer.innerHTML = "";

    const getReferencedField = (id, field) => {
      const reference = data.includes.Entry.find(
        (entry) => entry.sys.id === id
      );
      return reference ? reference.fields[field] : "Unknown";
    };

    const daySet = new Set();
    const genreSet = new Set();
    const stageSet = new Set();

    let contentHTML = "";

    data.items.forEach((artist) => {
      const name = artist.fields.name || "Unnamed Artist";
      const genre = artist.fields.genre
        ? getReferencedField(artist.fields.genre.sys.id, "name")
        : "Unknown Genre";
      const dayDescription = artist.fields.day
        ? getReferencedField(artist.fields.day.sys.id, "description")
        : "Unknown Day";
      const day = artist.fields.day
        ? `${dayDescription} (${getReferencedField(
            artist.fields.day.sys.id,
            "date"
          )})`
        : "Unknown Day";
      const stage = artist.fields.stage
        ? getReferencedField(artist.fields.stage.sys.id, "name")
        : "Unknown Stage";
      const description =
        artist.fields.description || "No description provided.";

      if (dayDescription !== "Unknown Day") daySet.add(dayDescription);
      if (genre !== "Unknown Genre") genreSet.add(genre);
      if (stage !== "Unknown Stage") stageSet.add(stage);

      contentHTML += `
          <div class="artist-card" data-day="${dayDescription}" data-genre="${genre}" data-stage="${stage}">
            <h3>${name}</h3>
            <p><strong>Genre:</strong> ${genre}</p>
            <p><strong>Day:</strong> ${day}</p>
            <p><strong>Stage:</strong> ${stage}</p>
            <p><strong>Description:</strong> ${description}</p>
          </div>
        `;
    });

    contentContainer.innerHTML = contentHTML;

    filterContainer.innerHTML = `
      <label for="filter-day">Day:</label>
      <select id="filter-day">
        <option value="">All</option>
        ${[...daySet]
          .map((day) => `<option value="${day}">${day}</option>`)
          .join("")}
      </select>
      
      <label for="filter-genre">Genre:</label>
      <select id="filter-genre">
        <option value="">All</option>
        ${[...genreSet]
          .map((genre) => `<option value="${genre}">${genre}</option>`)
          .join("")}
      </select>
      
      <label for="filter-stage">Stage:</label>
      <select id="filter-stage">
        <option value="">All</option>
        ${[...stageSet]
          .map((stage) => `<option value="${stage}">${stage}</option>`)
          .join("")}
      </select>
    `;

    document
      .getElementById("filter-day")
      .addEventListener("change", applyFilters);
    document
      .getElementById("filter-genre")
      .addEventListener("change", applyFilters);
    document
      .getElementById("filter-stage")
      .addEventListener("change", applyFilters);
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("content").textContent =
      "Failed to load data. Please try again later.";
  }
};

const applyFilters = () => {
  const selectedDay = document.getElementById("filter-day").value;
  const selectedGenre = document.getElementById("filter-genre").value;
  const selectedStage = document.getElementById("filter-stage").value;

  const artistCards = document.querySelectorAll(".artist-card");

  artistCards.forEach((card) => {
    const cardDay = card.getAttribute("data-day");
    const cardGenre = card.getAttribute("data-genre");
    const cardStage = card.getAttribute("data-stage");

    const isDayMatch = !selectedDay || cardDay === selectedDay;
    const isGenreMatch = !selectedGenre || cardGenre === selectedGenre;
    const isStageMatch = !selectedStage || cardStage === selectedStage;

    card.style.display =
      isDayMatch && isGenreMatch && isStageMatch ? "block" : "none";
  });
};

fetchArtistData();
