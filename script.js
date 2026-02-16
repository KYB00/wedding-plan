const TOTAL_BUDGET = 8000000;
const FIXED_TOTAL = 6454352;
let budgetData = JSON.parse(localStorage.getItem('baliBudgetVFinal') || '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]}');

function init() { renderAllBudgets(); calculateTotals(); }

function switchMainTab(tabName) {
    document.querySelectorAll('main').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const daySelector = document.getElementById('day-selector');
    if (tabName === 'schedule') {
        document.getElementById('tab-schedule').classList.add('active');
        daySelector.style.display = 'flex';
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (tabName === 'hotels') {
        document.getElementById('tab-hotels').classList.add('active');
        daySelector.style.display = 'none';
        document.querySelectorAll('.nav-item')[1].classList.add('active');
    } else if (tabName === 'info') {
        document.getElementById('tab-info').classList.add('active');
        daySelector.style.display = 'none';
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        calculateTotals();
    }
}

function showDay(dayNum) {
    document.querySelectorAll('.day-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.day-chip').forEach(el => el.classList.remove('active'));
    document.getElementById('day-' + dayNum).style.display = 'block';
    document.querySelectorAll('.day-chip')[dayNum - 1].classList.add('active');
}

function addBudgetRow(day) {
    budgetData[day].push({ cat: '식비', desc: '', cost: 0 });
    saveData(); renderBudget(day); calculateTotals();
}

function removeBudgetRow(day, index) {
    budgetData[day].splice(index, 1);
    saveData(); renderBudget(day); calculateTotals();
}

function updateBudgetRow(day, index, field, value) {
    budgetData[day][index][field] = value;
    saveData();
    if (field === 'cost') { renderBudget(day); calculateTotals(); }
}

function renderBudget(day) {
    const container = document.getElementById(`budget-list-${day}`);
    if (!container) return;
    container.innerHTML = '';
    let daySum = 0;
    budgetData[day].forEach((item, index) => {
        const cost = parseInt(item.cost) || 0; daySum += cost;
        const div = document.createElement('div'); div.className = 'budget-list-item';
        div.innerHTML = `
            <select class="budget-select" onchange="updateBudgetRow(${day}, ${index}, 'cat', this.value)">
                <option value="식비" ${item.cat==='식비'?'selected':''}>식비</option>
                <option value="쇼핑" ${item.cat==='쇼핑'?'selected':''}>쇼핑</option>
                <option value="이동" ${item.cat==='이동'?'selected':''}>이동</option>
                <option value="기타" ${item.cat==='기타'?'selected':''}>기타</option>
            </select>
            <input type="text" class="budget-input" value="${item.desc}" oninput="updateBudgetRow(${day}, ${index}, 'desc', this.value)">
            <input type="number" class="budget-num" value="${cost===0?'':cost}" onchange="updateBudgetRow(${day}, ${index}, 'cost', this.value)">
            <button class="del-btn" style="background:#ef4444; color:white; border:none; border-radius:6px; width:30px;" onclick="removeBudgetRow(${day}, ${index})">X</button>
        `;
        container.appendChild(div);
    });
    document.getElementById(`total-${day}`).innerText = daySum.toLocaleString() + " 원";
}

function renderAllBudgets() { for(let i=1; i<=6; i++) renderBudget(i); }

function calculateTotals() {
    let localTotal = 0;
    for (let i = 1; i <= 6; i++) {
        let daySum = budgetData[i].reduce((sum, item) => sum + (parseInt(item.cost) || 0), 0);
        document.getElementById(`sum-day-${i}`).innerText = daySum.toLocaleString();
        localTotal += daySum;
    }
    document.getElementById('local-total-display').innerText = localTotal.toLocaleString() + " 원";
    let remain = (TOTAL_BUDGET - FIXED_TOTAL) - localTotal;
    document.getElementById('remaining-budget-display').innerText = remain.toLocaleString() + " 원";
    document.getElementById('top-remain-display').innerText = Math.floor(remain / 10000) + " 만원";
}

function saveData() { localStorage.setItem('baliBudgetVFinal', JSON.stringify(budgetData)); }
function toggleAccordion(id) { document.getElementById(id).classList.toggle('open'); }
function toggleBudget(day) { document.getElementById('ba-' + day).classList.toggle('show'); }
function toggleShopList(id) { document.getElementById(id).classList.toggle('show'); }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('show'); }
function calculateSimple() {
    const val = document.getElementById('calcInput').value;
    document.getElementById('calcResult').innerText = Math.round(val * 0.087).toLocaleString() + " 원";
}

init();
