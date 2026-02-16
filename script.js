const TOTAL_BUDGET = 8000000;
const FIXED_TOTAL = 6454352;
let budgetData = JSON.parse(localStorage.getItem('baliBudgetDataFinal') || '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]}');

function switchMainTab(tab) {
    document.querySelectorAll('main').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    const items = document.querySelectorAll('.nav-item');
    if (tab === 'schedule') items[0].classList.add('active');
    else if (tab === 'hotels') items[1].classList.add('active');
    else { items[2].classList.add('active'); updateStats(); }
}

function showDay(day) {
    document.querySelectorAll('.day-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.day-chip').forEach(h => h.classList.remove('active'));
    document.getElementById('day-' + day).style.display = 'block';
    document.querySelectorAll('.day-chip')[day - 1].classList.add('active');
}

// 환율 계산기
const idrIn = document.getElementById('idr-input');
const krwOut = document.getElementById('krw-output');
if(idrIn) {
    idrIn.addEventListener('input', () => {
        const val = idrIn.value;
        krwOut.value = val ? Math.floor(val * 0.087).toLocaleString() + " 원" : "";
    });
}

function toggleAccordion(id) { document.getElementById(id).classList.toggle('open'); }
function toggleBudget(day) { document.getElementById('ba-' + day).classList.toggle('show'); }
function toggleShopList(id) { document.getElementById(id).classList.toggle('show'); }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('show'); }

window.onload = () => { /* 예산 렌더링 함수들 추가 가능 */ };
