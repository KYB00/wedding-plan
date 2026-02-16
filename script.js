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
}

function toggleAccordion(id) { document.getElementById(id).classList.toggle('open'); }
function toggleShopList(id) { document.getElementById(id).classList.toggle('show'); }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('show'); }

// 지출 내역 렌더링 (세부 카테고리 포함)
function renderBudgetRows(day) {
    const container = document.getElementById(`budget-rows-${day}`);
    if (!container) return;
    container.innerHTML = '';
    
    budgetData[day].forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'budget-list-item';
        div.innerHTML = `
            <select class="budget-select" onchange="editBudget(${day},${i},'cat',this.value)">
                <option value="식비" ${item.cat === '식비' ? 'selected' : ''}>식비</option>
                <option value="쇼핑" ${item.cat === '쇼핑' ? 'selected' : ''}>쇼핑</option>
                <option value="투어" ${item.cat === '투어' ? 'selected' : ''}>투어</option>
                <option value="마사지" ${item.cat === '마사지' ? 'selected' : ''}>마사지</option>
                <option value="기타" ${item.cat === '기타' ? 'selected' : ''}>기타</option>
            </select>
            <input type="text" class="budget-input" style="flex:1" value="${item.name}" placeholder="내용" oninput="editBudget(${day},${i},'name',this.value)">
            <input type="number" class="budget-num" value="${item.val}" placeholder="금액" oninput="editBudget(${day},${i},'val',this.value)">
            <button onclick="delBudget(${day},${i})" style="border:none; background:none; color:#dc2626; font-weight:bold; width:30px;">X</button>
        `;
        container.appendChild(div);
    });
    updateStats();
}

function addBudgetEntry(day) {
    budgetData[day].push({ cat: '식비', name: '', val: 0 });
    renderBudgetRows(day);
}

function editBudget(day, i, field, value) {
    budgetData[day][i][field] = field === 'val' ? (parseInt(value) || 0) : value;
    localStorage.setItem('baliBudgetData', JSON.stringify(budgetData));
    updateStats();
}

function delBudget(day, i) {
    budgetData[day].splice(i, 1);
    renderBudgetRows(day);
}

function updateStats() {
    let localTotal = 0;
    for (let i = 1; i <= 6; i++) {
        let daySum = 0;
        budgetData[i].forEach(it => daySum += it.val);
        const dayEl = document.getElementById('sum-day-' + i);
        if (dayEl) dayEl.innerText = daySum.toLocaleString();
        
        const dayHeaderSum = document.getElementById('day-sum-' + i);
        if (dayHeaderSum) dayHeaderSum.innerText = daySum.toLocaleString() + " 원";
        
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

window.onload = () => { 
    for(let i=1; i<=6; i++) renderBudgetRows(i);
    updateStats(); 
};
