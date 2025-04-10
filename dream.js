
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector("form");
    const searchInput = document.getElementById("search_query");
    const searchHistoryList = document.getElementById("search_history");
    const clearButton = document.getElementById("clear_button");

    function loadSearchHistory() {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        searchHistoryList.innerHTML = "";
        history.forEach((query, index) => {
            const li = document.createElement("li");
            li.textContent = query;
            li.addEventListener("click", () => {
                searchInput.value = query;
            });
            searchHistoryList.appendChild(li);
        });
    }


    searchForm.addEventListener("submit", function () {
        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        const query = searchInput.value.trim();
        if (query && !history.includes(query)) {
            history.unshift(query);
            if (history.length > 3) history.pop();
            localStorage.setItem("searchHistory", JSON.stringify(history));
        }
    });

    clearButton.addEventListener("click", function () {
        localStorage.removeItem("searchHistory");
        loadSearchHistory();
    });


    loadSearchHistory();
});