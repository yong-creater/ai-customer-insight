import type {
  AIAnalysis,
  AudioRecord,
  AudioSourceType,
  CompetitorInsight,
  ConcernInsight,
  Customer,
  DashboardInsight,
  ImprovementTask,
  SalesPerformance,
  SpeechTemplate,
  StoreDiagnosis,
  TaskStatus,
  TaskType,
} from '../types';

export interface InsightFilters {
  regionId?: string;
  storeId?: string;
  intendedModel?: string;
  intentLevel?: 'high' | 'medium' | 'low';
  riskLevel?: 'high' | 'medium' | 'low';
  sourceType?: AudioSourceType;
  taskStatus?: TaskStatus;
  taskType?: TaskType;
}

const MODELS = ['L07', 'S07', 'S09', 'S05', 'G318'] as const;
const COMPETITORS = ['比亚迪宋PLUS', '问界M7', '零跑C10', '小鹏G6', '特斯拉Model Y'] as const;
const CONCERNS = ['优惠不够', '担心后续降价', '竞品更划算', '免息额度不够', '置换补贴低', '续航焦虑', '保值率担忧'] as const;
const STAGES = ['初步咨询', '有效沟通', '邀约到店', '已到店', '已试驾', '已报价', '强意向', '成交', '战败'] as const;
const SALES_SKILLS = ['需求挖掘', '产品讲解', '政策讲解', '竞品应对', '异议处理', '成交推进', '合规表达'] as const;

const REGIONS = [
  { id: 'r-east', name: '华东大区' },
  { id: 'r-south', name: '华南大区' },
  { id: 'r-north', name: '华北大区' },
  { id: 'r-west', name: '西南大区' },
];

const STORES = [
  { id: 's-sh-pd', name: '上海浦东店', regionId: 'r-east' },
  { id: 's-hz-bj', name: '杭州滨江店', regionId: 'r-east' },
  { id: 's-gz-th', name: '广州天河店', regionId: 'r-south' },
  { id: 's-sz-ns', name: '深圳南山店', regionId: 'r-south' },
  { id: 's-bj-cy', name: '北京朝阳店', regionId: 'r-north' },
  { id: 's-tj-hx', name: '天津河西店', regionId: 'r-north' },
  { id: 's-cd-gx', name: '成都高新店', regionId: 'r-west' },
  { id: 's-cq-yb', name: '重庆渝北店', regionId: 'r-west' },
];

const customers: Customer[] = Array.from({ length: 30 }, (_, i) => {
  const idx = i + 1;
  const store = STORES[i % STORES.length];
  const region = REGIONS.find((x) => x.id === store.regionId)!;
  return {
    id: `c-${idx.toString().padStart(3, '0')}`,
    name: `客户${idx}`,
    phoneMasked: `138****${(1000 + idx).toString().slice(-4)}`,
    gender: idx % 2 === 0 ? 'male' : 'female',
    ageRange: idx % 3 === 0 ? '36-45' : idx % 2 === 0 ? '26-35' : '46-55',
    city: store.name.slice(0, 2),
    occupation: idx % 4 === 0 ? '企业管理' : idx % 3 === 0 ? '个体经营' : '技术岗位',
    familyStructure: idx % 3 === 0 ? '三口之家' : '二人家庭',
    budgetRange: idx % 2 === 0 ? '18-22万' : '22-28万',
    purchaseType: idx % 4 === 0 ? 'replacement' : idx % 3 === 0 ? 'additional' : 'first_buy',
    intendedModel: MODELS[i % MODELS.length],
    competingModels: [COMPETITORS[i % COMPETITORS.length], COMPETITORS[(i + 2) % COMPETITORS.length]],
    purchaseTimeline: idx % 2 === 0 ? '1个月内' : '1-3个月',
    decisionMaker: idx % 3 === 0 ? '夫妻共同决策' : '本人决策',
    currentStage: STAGES[i % STAGES.length],
    intentLevel: idx % 5 === 0 ? 'low' : idx % 2 === 0 ? 'high' : 'medium',
    riskLevel: idx % 6 === 0 ? 'high' : idx % 4 === 0 ? 'medium' : 'low',
    mainConcerns: [CONCERNS[i % CONCERNS.length], CONCERNS[(i + 3) % CONCERNS.length]],
    ownerName: `顾问${(i % 12) + 1}`,
    storeId: store.id,
    regionId: region.id,
    lastContactAt: `2026-05-${((i % 12) + 1).toString().padStart(2, '0')}T10:30:00Z`,
    createdAt: `2026-04-${((i % 20) + 1).toString().padStart(2, '0')}T09:00:00Z`,
    updatedAt: `2026-05-${((i % 15) + 1).toString().padStart(2, '0')}T14:00:00Z`,
  };
});

const audioRecords: AudioRecord[] = Array.from({ length: 20 }, (_, i) => {
  const customer = customers[i];
  const store = STORES.find((x) => x.id === customer.storeId)!;
  const region = REGIONS.find((x) => x.id === store.regionId)!;
  const sourceTypes: AudioSourceType[] = ['DCC外呼', '门店接待', '试乘试驾', '报价谈判', '战败回访', '交付回访'];
  return {
    id: `a-${(i + 1).toString().padStart(3, '0')}`,
    customerId: customer.id,
    customerName: customer.name,
    storeId: store.id,
    storeName: store.name,
    regionId: region.id,
    regionName: region.name,
    salesId: `sales-${(i % 12) + 1}`,
    salesName: `顾问${(i % 12) + 1}`,
    sourceType: sourceTypes[i % sourceTypes.length],
    intendedModel: customer.intendedModel,
    audioUrl: `https://mock-audio.example.com/${i + 1}.mp3`,
    duration: 180 + i * 27,
    callTime: `2026-05-${((i % 12) + 1).toString().padStart(2, '0')}T0${i % 9}:20:00Z`,
    transcriptStatus: i % 9 === 0 ? 'processing' : 'done',
    analysisStatus: i % 7 === 0 ? 'processing' : 'done',
    intentLevel: customer.intentLevel,
    riskLevel: customer.riskLevel,
    createdAt: `2026-05-${((i % 10) + 1).toString().padStart(2, '0')}T10:00:00Z`,
    updatedAt: `2026-05-${((i % 10) + 1).toString().padStart(2, '0')}T11:00:00Z`,
  };
});

const concernInsights: ConcernInsight[] = Array.from({ length: 10 }, (_, i) => ({
  id: `concern-${i + 1}`,
  concernType: i < 4 ? '价格政策' : i < 7 ? '竞品比较' : '用车价值',
  concernLabel: CONCERNS[i % CONCERNS.length],
  count: 18 + i * 3,
  ratio: Number((0.08 + i * 0.015).toFixed(3)),
  trend: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'flat' : 'down',
  relatedModels: [MODELS[i % MODELS.length], MODELS[(i + 1) % MODELS.length]],
  relatedRegions: [REGIONS[i % REGIONS.length].id],
  updatedAt: '2026-05-12T10:00:00Z',
}));

const competitorInsights: CompetitorInsight[] = Array.from({ length: 8 }, (_, i) => ({
  id: `comp-${i + 1}`,
  competitorBrand: COMPETITORS[i % COMPETITORS.length].split(/(?<=.{2})/)[0],
  competitorModel: COMPETITORS[i % COMPETITORS.length],
  mentionCount: 20 + i * 4,
  winRateAgainst: Number((0.32 + i * 0.03).toFixed(2)),
  lossRateAgainst: Number((0.44 - i * 0.02).toFixed(2)),
  keyComparisonPoints: ['价格政策', '辅助驾驶', '续航表现', '品牌口碑'].slice(0, (i % 3) + 2),
  regionId: REGIONS[i % REGIONS.length].id,
  storeId: STORES[i % STORES.length].id,
  updatedAt: '2026-05-12T11:00:00Z',
}));

const storeDiagnoses: StoreDiagnosis[] = STORES.map((store, i) => ({
  id: `sd-${i + 1}`,
  storeId: store.id,
  storeName: store.name,
  regionId: store.regionId,
  executionScore: 64 + i * 3,
  issueTags: ['邀约到店率偏低', '报价后跟进不及时', '竞品应对话术不足'].slice(0, (i % 3) + 1),
  strengths: ['接待响应快', '试驾安排效率高', '客户标签记录完整'].slice(0, (i % 3) + 1),
  weaknesses: ['政策讲解深度不足', '异议处理缺少闭环', '二次回访执行弱'].slice(0, (i % 3) + 1),
  suggestedActions: ['增加报价后24小时回访机制', '强化竞品攻防专项训练', '店长周复盘录音质检'].slice(0, (i % 3) + 1),
  updatedAt: '2026-05-12T12:00:00Z',
}));

const salesPerformances: SalesPerformance[] = Array.from({ length: 12 }, (_, i) => ({
  id: `sp-${i + 1}`,
  salesId: `sales-${i + 1}`,
  salesName: `顾问${i + 1}`,
  storeId: STORES[i % STORES.length].id,
  regionId: STORES[i % STORES.length].regionId,
  communicationScore: 68 + i,
  conversionScore: 62 + (i % 6) * 4,
  objectionHandlingScore: 60 + (i % 5) * 5,
  scriptComplianceScore: 70 + (i % 4) * 4,
  coachingSuggestions: SALES_SKILLS.filter((_, idx) => idx % 2 === i % 2),
  updatedAt: '2026-05-12T13:00:00Z',
}));

const improvementTasks: ImprovementTask[] = Array.from({ length: 15 }, (_, i) => ({
  id: `task-${i + 1}`,
  title: `${['邀约到店转化提升', '报价异议收口优化', '竞品流失预警回访', '高风险客户二次沟通'][i % 4]}-${i + 1}`,
  description: `围绕${CONCERNS[i % CONCERNS.length]}开展专项改善，要求48小时内完成首轮跟进并提交复盘。`,
  type: ['客户挽回', '销售辅导', '门店改善', '区域专项', '总部反馈', '话术训练', '竞品攻防'][i % 7] as TaskType,
  status: ['pending', 'in_progress', 'done', 'verified', 'cancelled'][i % 5] as TaskStatus,
  priority: (['P0', 'P1', 'P2', 'P3'] as const)[i % 4],
  ownerId: `owner-${(i % 8) + 1}`,
  ownerName: `负责人${(i % 8) + 1}`,
  regionId: REGIONS[i % REGIONS.length].id,
  storeId: STORES[i % STORES.length].id,
  relatedCustomerId: customers[i % customers.length].id,
  relatedAudioRecordId: audioRecords[i % audioRecords.length].id,
  dueDate: `2026-05-${(15 + (i % 10)).toString().padStart(2, '0')}T18:00:00Z`,
  createdAt: `2026-05-${(5 + (i % 10)).toString().padStart(2, '0')}T09:30:00Z`,
  updatedAt: `2026-05-${(7 + (i % 10)).toString().padStart(2, '0')}T16:40:00Z`,
}));

const speechTemplates: SpeechTemplate[] = Array.from({ length: 20 }, (_, i) => ({
  id: `st-${i + 1}`,
  name: `${['首触达开场', '竞品应对', '价格异议化解', '试驾邀约', '成交推进'][i % 5]}模板${i + 1}`,
  scenario: ['DCC外呼', '门店接待', '试乘试驾', '报价谈判', '战败回访', '交付回访'][i % 6] as AudioSourceType,
  targetStage: STAGES[i % STAGES.length],
  content: `针对${MODELS[i % MODELS.length]}客户，在${CONCERNS[i % CONCERNS.length]}场景下采用“共情-澄清-价值重构-行动确认”四步沟通。`,
  highlights: ['开场建立信任', '量化政策价值', '竞品差异锚定', '明确下一步行动'].slice(0, (i % 3) + 2),
  version: `v1.${i}`,
  enabled: i % 6 !== 0,
  updatedAt: '2026-05-12T15:00:00Z',
}));

const analyses: AIAnalysis[] = audioRecords.map((record, i) => ({
  id: `analysis-${i + 1}`,
  audioRecordId: record.id,
  summary: `客户围绕${record.intendedModel}重点关注${CONCERNS[i % CONCERNS.length]}，对${COMPETITORS[i % COMPETITORS.length]}存在明显比较。`,
  customerIntent: record.intentLevel === 'high' ? '短期内有较高成交可能' : '需持续培育和多轮跟进',
  customerNeeds: ['空间与舒适性', '金融政策透明', '置换方案可比性'],
  customerConcerns: [CONCERNS[i % CONCERNS.length], CONCERNS[(i + 2) % CONCERNS.length]],
  competitorMentions: [COMPETITORS[i % COMPETITORS.length]],
  policySensitivity: ['免息期限', '置换补贴门槛'],
  emotionTrend: [
    { time: 0, value: 0.2 },
    { time: 60, value: 0.1 },
    { time: 120, value: 0.35 },
    { time: 180, value: 0.28 },
  ],
  dealProbability: Number((0.35 + (i % 6) * 0.08).toFixed(2)),
  riskLevel: record.riskLevel,
  lossReasonPrediction: record.riskLevel === 'high' ? '价格敏感且竞品金融方案更激进' : '需提升异议处理力度',
  salesPerformance: '需求确认较完整，但成交推进节点偏晚',
  nextActions: ['24小时内发送对比清单', '48小时内安排二次沟通', '邀约到店试驾并锁定政策有效期'],
  recommendedScript: ['先共情预算顾虑', '再量化总拥有成本优势', '最后确认下一步动作'],
  evidenceQuotes: [
    { speaker: 'customer', quote: '现在主要担心后面会不会继续降价。', timestamp: 74 },
    { speaker: 'sales', quote: '我可以把本月政策和下月变化范围给您讲清楚。', timestamp: 99 },
  ],
  createdAt: '2026-05-12T16:00:00Z',
}));

const dashboardInsights: DashboardInsight[] = [
  {
    id: 'db-1',
    date: '2026-05-12',
    totalCustomers: customers.length,
    totalAudioRecords: audioRecords.length,
    highIntentCustomers: customers.filter((c) => c.intentLevel === 'high').length,
    highRiskCustomers: customers.filter((c) => c.riskLevel === 'high').length,
    topConcerns: concernInsights.slice(0, 5).map((c) => ({ name: c.concernLabel, count: c.count })),
    topCompetitors: competitorInsights.slice(0, 5).map((c) => ({ name: c.competitorModel, count: c.mentionCount })),
    storeExecutionAlerts: storeDiagnoses.filter((s) => s.executionScore < 72).length,
    pendingTasks: improvementTasks.filter((t) => t.status === 'pending' || t.status === 'in_progress').length,
  },
];

function applyFilters<T extends { regionId?: string; storeId?: string; intendedModel?: string; intentLevel?: string; riskLevel?: string }>(
  items: T[],
  filters?: InsightFilters,
): T[] {
  if (!filters) return items;
  return items.filter((item) => {
    if (filters.regionId && item.regionId !== filters.regionId) return false;
    if (filters.storeId && item.storeId !== filters.storeId) return false;
    if (filters.intendedModel && item.intendedModel !== filters.intendedModel) return false;
    if (filters.intentLevel && item.intentLevel !== filters.intentLevel) return false;
    if (filters.riskLevel && item.riskLevel !== filters.riskLevel) return false;
    return true;
  });
}

export async function getDashboardInsights(filters?: InsightFilters): Promise<DashboardInsight[]> {
  if (!filters) return dashboardInsights;
  const scopedCustomers = applyFilters(customers, filters);
  const scopedAudio = applyFilters(audioRecords, filters);
  return [
    {
      ...dashboardInsights[0],
      id: 'db-filtered',
      totalCustomers: scopedCustomers.length,
      totalAudioRecords: scopedAudio.length,
      highIntentCustomers: scopedCustomers.filter((c) => c.intentLevel === 'high').length,
      highRiskCustomers: scopedCustomers.filter((c) => c.riskLevel === 'high').length,
    },
  ];
}

export async function getCustomers(filters?: InsightFilters): Promise<Customer[]> {
  return applyFilters(customers, filters);
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  return customers.find((item) => item.id === id);
}

export async function getAudioRecords(filters?: InsightFilters): Promise<AudioRecord[]> {
  const filtered = applyFilters(audioRecords, filters);
  if (!filters?.sourceType) return filtered;
  return filtered.filter((item) => item.sourceType === filters.sourceType);
}

export async function getAudioRecordById(id: string): Promise<AudioRecord | undefined> {
  return audioRecords.find((item) => item.id === id);
}

export async function getAudioAnalysis(audioRecordId: string): Promise<AIAnalysis | undefined> {
  return analyses.find((item) => item.audioRecordId === audioRecordId);
}

export async function getConcernInsights(filters?: InsightFilters): Promise<ConcernInsight[]> {
  if (!filters?.regionId) return concernInsights;
  return concernInsights.filter((item) => item.relatedRegions.includes(filters.regionId!));
}

export async function getCompetitorInsights(filters?: InsightFilters): Promise<CompetitorInsight[]> {
  return competitorInsights.filter((item) => {
    if (filters?.regionId && item.regionId !== filters.regionId) return false;
    if (filters?.storeId && item.storeId !== filters.storeId) return false;
    return true;
  });
}

export async function getStoreDiagnosis(filters?: InsightFilters): Promise<StoreDiagnosis[]> {
  return storeDiagnoses.filter((item) => {
    if (filters?.regionId && item.regionId !== filters.regionId) return false;
    if (filters?.storeId && item.storeId !== filters.storeId) return false;
    return true;
  });
}

export async function getSalesPerformances(filters?: InsightFilters): Promise<SalesPerformance[]> {
  return salesPerformances.filter((item) => {
    if (filters?.regionId && item.regionId !== filters.regionId) return false;
    if (filters?.storeId && item.storeId !== filters.storeId) return false;
    return true;
  });
}

export async function getImprovementTasks(filters?: InsightFilters): Promise<ImprovementTask[]> {
  return improvementTasks.filter((item) => {
    if (filters?.regionId && item.regionId !== filters.regionId) return false;
    if (filters?.storeId && item.storeId !== filters.storeId) return false;
    if (filters?.taskStatus && item.status !== filters.taskStatus) return false;
    if (filters?.taskType && item.type !== filters.taskType) return false;
    return true;
  });
}

export async function getSpeechTemplates(filters?: InsightFilters): Promise<SpeechTemplate[]> {
  return speechTemplates.filter((item) => {
    if (filters?.sourceType && item.scenario !== filters.sourceType) return false;
    return true;
  });
}
