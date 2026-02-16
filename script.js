const TOTAL_BUDGET = 8000000;
const FIXED_TOTAL = 6454352;
let budgetData = JSON.parse(localStorage.getItem('baliBudgetDataV4') || '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]}');

function switchMainTab(tab) {
    document.querySelectorAll('main').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    
    const navs = document.querySelectorAll('.nav-item');
    if (tab === 'schedule') navs[0].classList.add('active');
    else if (tab === 'hotels') navs[1].classList.add('active');
    else { navs[2].classList.add('active'); updateStats(); }
}

function showDay(day) {
    document.querySelectorAll('.day-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.day-chip').forEach(h => h.classList.remove('active'));
    document.getElementById('day-' + day).style.display = 'block';
    document.querySelectorAll('.day-chip')[day - 1].classList.add('active');
}

function toggleAccordion(id) {
    document.getElementById(id).classList.toggle('open');
}

function toggleBudget(day) {
    const el = document.getElementById('ba-' + day);
    el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function toggleShopList(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('show');
}

function addBudgetEntry(day) {
    budgetData[day].push({ cat: '식비', name: '', val: 0 });
    renderBudgetRows(day);
}

function renderBudgetRows(day) {
    const container = document.getElementById(`budget-rows-${day}`);
    if (!container) return;
    container.innerHTML = '';
    budgetData[day].forEach((item, i) => {
        const div = document.createElement('div');
        div.style.display = 'flex'; div.style.gap = '5px'; div.style.marginBottom = '8px';
        div.innerHTML = `
            <input type="text" style="flex:1; padding:5px; font-size:12px;" value="${item.name}" placeholder="내용" oninput="editBudget(${day},${i},'name',this.value)">
            <input type="number" style="width:80px; padding:5px; font-size:12px;" value="${item.val}" placeholder="금액" oninput="editBudget(${day},${i},'val',this.value)">
        `;
        container.appendChild(div);
    });
    updateStats();
}

function editBudget(day, i, field, value) {
    budgetData[day][i][field] = field === 'val' ? (parseInt(value) || 0) : value;
    localStorage.setItem('baliBudgetDataV4', JSON.stringify(budgetData));
    updateStats();
}

function updateStats() {
    let localTotal = 0;
    for (let i = 1; i <= 6; i++) {
        let daySum = budgetData[i].reduce((sum, it) => sum + it.val, 0);
        if (document.getElementById('day-sum-' + i)) document.getElementById('day-sum-' + i).innerText = daySum.toLocaleString() + " 원";
        if (document.getElementById('sum-day-' + i)) document.getElementById('sum-day-' + i).innerText = daySum.toLocaleString();
        localTotal += daySum;
    }
    const rem = (TOTAL_BUDGET - FIXED_TOTAL) - localTotal;
    if(document.getElementById('sum-local')) document.getElementById('sum-local').innerText = localTotal.toLocaleString() + " 원";
    if(document.getElementById('sum-final')) document.getElementById('sum-final').innerText = rem.toLocaleString() + " 원";
    if(document.getElementById('top-remain-display')) document.getElementById('top-remain-display').innerText = Math.floor(rem / 10000) + " 만원";
}

window.onload = () => {
    for (let i = 1; i <= 6; i++) renderBudgetRows(i);
    updateStats();
};
