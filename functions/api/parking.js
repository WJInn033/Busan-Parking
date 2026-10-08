
export async function onRequestGet({ env }) {

    // 1. Cloudflare 환경변수에서 인증키 가져오기
    const apiKey = env.DATA_API_KEY;

    if (!apiKey) {
        return Response.json(
            { error: "API 인증키가 등록되지 않았습니다." },
            { status: 500 }
        );
    }

    // 2. 부산 공영주차장 API 주소
    const url = new URL(
        "https://apis.data.go.kr/6260000/BusanPblcPrkngInfoService/getPblcPrkngInfo"
    );

    // 3. API 요청 파라미터 설정
    url.searchParams.set("serviceKey", apiKey);
    url.searchParams.set("numOfRows", "10");
    url.searchParams.set("pageNo", "1");
    url.searchParams.set("resultType", "json");

    try {

        // 4. 공공데이터 API 호출
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        // 5. 응답 데이터를 JSON으로 변환
        const data = await response.json();

        // 6. 공공데이터 API 결과 코드 확인
        if (data?.response?.header?.resultCode !== "00") {
            return Response.json(
                { error: "공공데이터 API 응답 오류" },
                { status: 502 }
            );
        }

        // 7. JSON 결과 반환
        return Response.json(data);

    } catch (error) {

        return Response.json(
            {
                error: "주차장 데이터를 가져오지 못했습니다."
            },
            { status: 502 }
        );
    }
}
