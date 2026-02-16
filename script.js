document.addEventListener('DOMContentLoaded', () => {
    // 1. 하단 메인 탭 전환
    const navItems = document.querySelectorAll('.nav-item');
    const mains = document.querySelectorAll('main');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-tab');
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            mains.forEach(m => {
                m.classList.remove('active');
                if (m.id === target) m.classList.add('active');
            });
        });
    });

    // 2. 환율 계산기 로직
    const idrInput = document.getElementById('idr-val');
    const krwInput = document.getElementById('krw-val');
    const RATE = 0.087; // 100루피아 = 8.7원 (즉 1루피아 = 0.087원)

    idrInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val) {
            const result = Math.floor(val * RATE);
            krwInput.value = result.toLocaleString() + " 원";
        } else {
            krwInput.value = "";
        }
    });
});
