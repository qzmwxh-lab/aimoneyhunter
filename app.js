const projects = [
  { category: "content", type: "内容", title: "AI 内容代运营", desc: "为小商家交付选题、文案和短视频脚本，用月度服务费获得持续收入。", cost: "¥0–200", cycle: "7–14 天", tags: "文案 短视频 商家 运营" },
  { category: "design", type: "设计", title: "电商产品图服务", desc: "帮网店制作主图、场景图和广告素材，按套图收费并沉淀模板。", cost: "¥100–500", cycle: "3–7 天", tags: "电商 设计 图片 广告 商品" },
  { category: "tech", type: "技术", title: "垂直 AI 小工具", desc: "为一个具体岗位解决重复任务，先做人工加自动化服务，再产品化。", cost: "¥200–1,000", cycle: "2–4 周", tags: "开发 自动化 SaaS 工具 程序" },
  { category: "sales", type: "销售", title: "AI 工具实施顾问", desc: "为团队梳理工作流、选择工具并完成培训，按项目或培训场次收费。", cost: "¥0–300", cycle: "7–21 天", tags: "咨询 培训 企业 工作流" },
  { category: "content", type: "内容", title: "知识产品编辑", desc: "把专家的直播、录音或文章整理成手册、课程和社媒内容。", cost: "¥0–200", cycle: "7–14 天", tags: "课程 编辑 知识付费 整理" },
  { category: "design", type: "设计", title: "品牌视觉快包", desc: "面向新店提供 Logo 方向、配色、海报模板和社媒封面的一站式交付。", cost: "¥100–500", cycle: "5–10 天", tags: "品牌 logo 海报 新店 视觉" }
];

const recommendations = {
  content: { icon: "✦", title: "AI 内容代运营", description: "为本地商家或小团队提供选题、文案和短视频脚本服务。先卖服务，最快验证付费需求。", score: 92, tags: ["低成本", "回款较快", "适合个人"] },
  design: { icon: "◫", title: "电商产品图服务", description: "选择一个电商品类制作样品，用前后对比展示价值，再按套图或月度素材包收费。", score: 89, tags: ["作品可展示", "按套收费", "容易标准化"] },
  tech: { icon: "⌁", title: "垂直 AI 小工具", description: "先替一个具体岗位人工完成任务，确认需求后再自动化，避免做出无人付费的产品。", score: 86, tags: ["可订阅", "可规模化", "需要验证"] },
  sales: { icon: "↗", title: "AI 工具实施顾问", description: "帮助小团队盘点流程、选择工具并培训员工。你的沟通和执行能力比写代码更重要。", score: 90, tags: ["客单价较高", "企业客户", "轻资产"] }
};

let activeFilter = "all";
const selections = { time: "medium", skill: "content", speed: "fast" };
const grid = document.querySelector("#project-grid");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty-state");

function renderProjects() {
  const query = search.value.trim().toLowerCase();
  const filtered = projects.filter((item) => (activeFilter === "all" || item.category === activeFilter) && `${item.title} ${item.desc} ${item.tags}`.toLowerCase().includes(query));
  grid.innerHTML = filtered.map((item) => `
    <article class="project-card">
      <div class="card-meta"><span>${item.type}</span><span>启动 ${item.cost}</span></div>
      <h3>${item.title}</h3><p>${item.desc}</p>
      <footer><span>验证周期</span><span>${item.cycle}</span></footer>
    </article>`).join("");
  empty.hidden = filtered.length > 0;
}

function updateRecommendation() {
  const result = recommendations[selections.skill];
  const bonus = selections.time === "high" ? 2 : selections.time === "low" ? -4 : 0;
  const speedBonus = selections.speed === "fast" && ["content", "design", "sales"].includes(selections.skill) ? 2 : 0;
  const score = Math.max(72, Math.min(96, result.score + bonus + speedBonus));
  document.querySelector("#result-icon").textContent = result.icon;
  document.querySelector("#result-title").textContent = result.title;
  document.querySelector("#result-description").textContent = result.description;
  document.querySelector("#result-score").textContent = `${score}%`;
  document.querySelector("#result-bar").style.width = `${score}%`;
  document.querySelector("#result-tags").innerHTML = result.tags.map((tag) => `<li>${tag}</li>`).join("");
}

document.querySelectorAll(".option-row").forEach((row) => {
  row.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    row.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    selections[row.dataset.question] = button.dataset.value;
    updateRecommendation();
  });
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProjects();
  });
});

search.addEventListener("input", renderProjects);
renderProjects();
