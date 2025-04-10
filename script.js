//--------------------index.html


document.addEventListener("DOMContentLoaded", function () {
    const micButton = document.querySelector(".voice .img img");
    const inputField = document.querySelector(".voice textarea");
    let recognition;
    let isListening = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = "ja-JP";
        recognition.continuous = false;
        recognition.interimResults = false;

        micButton.addEventListener("click", function () {
            if (!isListening) {
                recognition.start();
                isListening = true;
                micButton.style.opacity = "0.5";
            } else {
                recognition.stop();
                isListening = false;
                micButton.style.opacity = "1";
            }
        });

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            inputField.value = transcript;
        };

        recognition.onend = function () {
            isListening = false;
            micButton.style.opacity = "1";
        };
    } else {
        alert("お使いのブラウザは音声認識に対応していません。");
    }
});


//ジャンル
function getSelectedGenres() {
    let checkboxes = document.querySelectorAll('input[name="genre"]:checked');
    let selectedGenres = Array.from(checkboxes).map(cb => cb.value);

    document.getElementById('result').textContent = "選択されたジャンル: " + selectedGenres.join(", ");
}

const input = document.getElementById("searchQuery");


//-----------------------search.html
function searchGoogle() {
    const query = input.value;
    if (!query) {
        alert("検索ワードを入力してください");
        return;
    }


    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history.unshift(query);
    history = history.slice(0, 3);

    localStorage.setItem("searchHistory", JSON.stringify(history));

    displayHistory();
}

function searchFromHistory(item) {
    input.value = item;
    searchGoogle();
}


function displayHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const historyList = document.getElementById("searchHistory");

    historyList.innerHTML = "";
    history.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        listItem.onclick = () => searchFromHistory(item);
        historyList.appendChild(listItem);
    });
}


function clearHistory() {
    localStorage.removeItem("searchHistory");
    displayHistory();
}

window.onload = displayHistory;



//タグで検索
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".search_input button");
    const searchInput = document.getElementById("searchQuery");
    const articles = document.querySelectorAll("article");

    const keywordMap = {
        "感動": "impressed",
        "幸せ": "happy",
        "悲しい": "cry",
        "癒し": "therapy",
        "面白い": "interesting",
        "怖い": "scary",
        "可愛い": "cute",
        "泣ける": "impressed",
        "しあわせ": "happy",
        "かなしい": "cry",
        "いやし": "therapy",
        "おもしろい": "interesting",
        "こわい": "scary",
        "かわいい": "cute"
    };

    searchButton.addEventListener("click", function () {
        let query = searchInput.value.trim();

        if (keywordMap[query]) {
            query = keywordMap[query];
        }

        articles.forEach(article => {
            const classes = article.className.split(" ");
            if (classes.includes(query) || query === "") {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    });
});


//ハートクリック
document.querySelectorAll(".accordion").forEach(item => {
    item.addEventListener("click", function () {
        const parentCard = this.parentNode;
        parentCard.classList.toggle("active");
    });
});

document.querySelectorAll(".fa-solid").forEach(icon => {
    icon.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});