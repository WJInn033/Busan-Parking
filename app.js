
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const keyword = searchInput.value.trim();

    if (keyword === "") {
        result.textContent = "주차장 이름을 입력해주세요.";
        return;
    }

    result.textContent =
        `"${keyword}" 검색어를 확인했습니다. 아직 API 연결 전입니다.`;

});
