const TOTAL_BUDGET = 8000000;
const FIXED_TOTAL = 6450000;
let budgetData = JSON.parse(localStorage.getItem('baliBudgetData') || '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]}');

function switchMainTab(tab) {
    document.querySelectorAll('main').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    if (tab === 'schedule') document.querySelectorAll('.nav-item')[0].classList.add('active');
    else if (tab === 'hotels') document.querySelectorAll('.nav-item')[1].classList.add('active');
    else { document.querySelectorAll('.nav-item')[2].classList.add('active'); updateStats(); }
}

function showDay(day) {
    document.querySelectorAll('.day-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.day-chip').forEach(h => h.classList.remove('active'));
    document.getElementById('day-' + day).style.display = 'block';
    document.querySelectorAll('.day-chip')[day - 1].classList.add('active');
    document.getElementById('day-selector-budget').value = day;
    renderBudgetRows();
}

function toggleAccordion(id) { document.getElementById(id).classList.toggle('open'); }
function toggleShopList(id) { document.getElementById(id).classList.toggle('show'); }
function toggleBudget() { document.getElementById('ba-section').classList.toggle('show'); }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('show'); }

function renderBudgetRows() {
    const d = document.getElementById('day-selector-budget').value;
    const container = document.getElementById('budget-rows-container');
    container.innerHTML = '';
    budgetData[d].forEach((item, i) => {
        const div = document.createElement('div'); div.className = 'budget-list-item';
        div.innerHTML = `
            <input type="text" class="budget-input" style="flex:1" value="${item.name}" placeholder="항목" oninput="editBudget(${d},${i},'name',this.value)">
            <input type="number" class="budget-num" value="${item.val}" placeholder="금액" oninput="editBudget(${d},${i},'val',this.value)">
            <button onclick="delBudget(${d},${i})" style="border:none; background:none; color:red; font-weight:bold">X</button>
        `;
        container.appendChild(div);
    });
    updateStats();
}

function addBudgetEntry() {
    const d = document.getElementById('day-selector-budget').value;
    budgetData[d].push({ name: '', val: 0 });
    renderBudgetRows();
}

function editBudget(d, i, field, value) {
    budgetData[d][i][field] = field === 'val' ? (parseInt(value) || 0) : value;
    updateStats();
    localStorage.setItem('baliBudgetData', JSON.stringify(budgetData));
}

function delBudget(d, i) {
    budgetData[d].splice(i, 1);
    renderBudgetRows();
}

function updateStats() {
    let localTotal = 0;
    // 각 일자별 합계 계산 및 표 업데이트
    for (let i = 1; i <= 6; i++) {
        let daySum = 0;
        budgetData[i].forEach(it => daySum += it.val);
        const dayEl = document.getElementById('sum-day-' + i);
        if (dayEl) dayEl.innerText = daySum.toLocaleString();
        localTotal += daySum;
    }
    
    const rem = (TOTAL_BUDGET - FIXED_TOTAL) - localTotal;
    document.getElementById('sum-local').innerText = localTotal.toLocaleString() + " 원";
    document.getElementById('local-total-summary').innerText = localTotal.toLocaleString() + " 원";
    document.getElementById('sum-final').innerText = rem.toLocaleString() + " 원";
    document.getElementById('top-remain').innerText = Math.floor(rem / 10000) + " 만원";
}

function doCalc() {
    const v = document.getElementById('calcIn').value;
    document.getElementById('calcOut').innerText = Math.round(v * 0.087).toLocaleString() + " 원";
}

window.onload = () => { renderBudgetRows(); updateStats(); };
