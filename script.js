const TOTAL_BUDGET = 8000000;
const FIXED_TOTAL = 6454352;
let budgetData = JSON.parse(localStorage.getItem('baliBudgetVFinal') || '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]}');

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

function addBudgetRow(day) {
    budgetData[day].push({ cat: '식비', desc: '', cost: 0 });
    renderBudget(day);
}

function updateBudgetRow(day, index, field, value) {
    budgetData[day][index][field] = value;
    if (field === 'cost') updateStats();
    localStorage.setItem('baliBudgetVFinal', JSON.stringify(budgetData));
}

function renderBudget(day) {
    const container = document.getElementById(`budget-list-${day}`);
    if (!container) return;
    container.innerHTML = '';
    budgetData[day].forEach((item, i) => {
        const div = document.createElement('div'); div.className = 'budget-list-item';
        div.innerHTML = `
            <select class="budget-select" onchange="updateBudgetRow(${day}, ${i}, 'cat', this.value)">
                <option value="식비" ${item.cat==='식비'?'selected':''}>식비</option>
                <option value="쇼핑" ${item.cat==='쇼핑'?'selected':''}>쇼핑</option>
                <option value="투어" ${item.cat==='투어'?'selected':''}>투어</option>
                <option value="마사지" ${item.cat==='마사지'?'selected':''}>마사지</option>
            </select>
            <input type="text" class="budget-input" value="${item.desc}" placeholder="내용" oninput="updateBudgetRow(${day}, ${i}, 'desc', this.value)">
            <input type="number" class="budget-num" value="${item.cost}" placeholder="금액" oninput="updateBudgetRow(${day}, ${i}, 'cost', this.value)">
        `;
        container.appendChild(div);
    });
}

function updateStats() {
    let localTotal = 0;
    for (let i = 1; i <= 6; i++) {
        let daySum = budgetData[i].reduce((sum, it) => sum + (parseInt(it.cost) || 0), 0);
        const dayEl = document.getElementById('sum-day-' + i);
        if (dayEl) dayEl.innerText = daySum.toLocaleString();
        const headerSum = document.getElementById('total-' + i);
        if (headerSum) headerSum.innerText = daySum.toLocaleString() + " 원";
        localTotal += daySum;
    }
    const rem = (TOTAL_BUDGET - FIXED_TOTAL) - localTotal;
    document.getElementById('local-total-display').innerText = localTotal.toLocaleString() + " 원";
    document.getElementById('remaining-budget-display').innerText = rem.toLocaleString() + " 원";
    document.getElementById('top-remain-display').innerText = Math.floor(rem / 10000) + " 만원";
}

function toggleAccordion(id) { document.getElementById(id).classList.toggle('open'); }
function toggleBudget(day) { document.getElementById('ba-' + day).classList.toggle('show'); }
function toggleShopList(id) { document.getElementById(id).classList.toggle('show'); }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('show'); }
function calculateSimple() {
    const v = document.getElementById('calcInput').value;
    document.getElementById('calcResult').innerText = Math.round(v * 0.087).toLocaleString() + " 원";
}

window.onload = () => { for (let i = 1; i <= 6; i++) renderBudget(i); updateStats(); };
