document.addEventListener('DOMContentLoaded', () => {
    // 1. 하단 메인 탭 전환 로직
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.tab;
            
            // 버튼 활성화 클래스 처리
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 콘텐츠 활성화 클래스 처리
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) content.classList.add('active');
            });
        });
    });

    // 2. Day 버튼 전환 (심플)
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 여기에 날짜별 데이터 렌더링 로직을 추가할 수 있습니다.
        });
    });

    // 3. 환율 계산기 로직
    const idrInput = document.getElementById('idr-input');
    const krwOutput = document.getElementById('krw-output');
    const EXCHANGE_RATE = 0.087; // 1 IDR = 0.087 KRW (예시 환율)

    idrInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val) {
            const converted = Math.floor(val * EXCHANGE_RATE);
            krwOutput.value = converted.toLocaleString() + " 원";
        } else {
            krwOutput.value = "";
        }
    });
});
