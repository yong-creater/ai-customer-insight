export type IntentLevel = 'high' | 'medium' | 'low';

export type RiskLevel = 'high' | 'medium' | 'low';

export type CustomerStage =
  | '初步咨询'
  | '有效沟通'
  | '邀约到店'
  | '已到店'
  | '已试驾'
  | '已报价'
  | '强意向'
  | '成交'
  | '战败';

export type AudioSourceType =
  | 'DCC外呼'
  | '门店接待'
  | '试乘试驾'
  | '报价谈判'
  | '战败回访'
  | '交付回访';

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'verified' | 'cancelled';

export type TaskType =
  | '客户挽回'
  | '销售辅导'
  | '门店改善'
  | '区域专项'
  | '总部反馈'
  | '话术训练'
  | '竞品攻防';

export interface Customer {
  id: string;
  name: string;
  phoneMasked: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  ageRange: string;
  city: string;
  occupation: string;
  familyStructure: string;
  budgetRange: string;
  purchaseType: 'first_buy' | 'replacement' | 'additional' | 'enterprise';
  intendedModel: string;
  competingModels: string[];
  purchaseTimeline: string;
  decisionMaker: string;
  currentStage: CustomerStage;
  intentLevel: IntentLevel;
  riskLevel: RiskLevel;
  mainConcerns: string[];
  ownerName: string;
  storeId: string;
  regionId: string;
  lastContactAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AudioRecord {
  id: string;
  customerId: string;
  customerName: string;
  storeId: string;
  storeName: string;
  regionId: string;
  regionName: string;
  salesId: string;
  salesName: string;
  sourceType: AudioSourceType;
  intendedModel: string;
  audioUrl: string;
  duration: number;
  callTime: string;
  transcriptStatus: 'pending' | 'processing' | 'done' | 'failed';
  analysisStatus: 'pending' | 'processing' | 'done' | 'failed';
  intentLevel: IntentLevel;
  riskLevel: RiskLevel;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptSegment {
  id: string;
  audioRecordId: string;
  speaker: 'customer' | 'sales' | 'other';
  startTime: number;
  endTime: number;
  content: string;
}

export interface AIAnalysis {
  id: string;
  audioRecordId: string;
  summary: string;
  customerIntent: string;
  customerNeeds: string[];
  customerConcerns: string[];
  competitorMentions: string[];
  policySensitivity: string[];
  emotionTrend: Array<{ time: number; value: number }>;
  dealProbability: number;
  riskLevel: RiskLevel;
  lossReasonPrediction: string;
  salesPerformance: string;
  nextActions: string[];
  recommendedScript: string[];
  evidenceQuotes: Array<{ speaker: string; quote: string; timestamp: number }>;
  createdAt: string;
}

export interface ConcernInsight {
  id: string;
  concernType: string;
  concernLabel: string;
  count: number;
  ratio: number;
  trend: 'up' | 'down' | 'flat';
  relatedModels: string[];
  relatedRegions: string[];
  updatedAt: string;
}

export interface CompetitorInsight {
  id: string;
  competitorBrand: string;
  competitorModel: string;
  mentionCount: number;
  winRateAgainst: number;
  lossRateAgainst: number;
  keyComparisonPoints: string[];
  regionId: string;
  storeId?: string;
  updatedAt: string;
}

export interface StoreDiagnosis {
  id: string;
  storeId: string;
  storeName: string;
  regionId: string;
  executionScore: number;
  issueTags: string[];
  strengths: string[];
  weaknesses: string[];
  suggestedActions: string[];
  updatedAt: string;
}

export interface SalesPerformance {
  id: string;
  salesId: string;
  salesName: string;
  storeId: string;
  regionId: string;
  communicationScore: number;
  conversionScore: number;
  objectionHandlingScore: number;
  scriptComplianceScore: number;
  coachingSuggestions: string[];
  updatedAt: string;
}

export interface ImprovementTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  ownerId: string;
  ownerName: string;
  regionId?: string;
  storeId?: string;
  relatedCustomerId?: string;
  relatedAudioRecordId?: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpeechTemplate {
  id: string;
  name: string;
  scenario: AudioSourceType;
  targetStage: CustomerStage;
  content: string;
  highlights: string[];
  version: string;
  enabled: boolean;
  updatedAt: string;
}

export interface DashboardInsight {
  id: string;
  date: string;
  regionId?: string;
  storeId?: string;
  totalCustomers: number;
  totalAudioRecords: number;
  highIntentCustomers: number;
  highRiskCustomers: number;
  topConcerns: Array<{ name: string; count: number }>;
  topCompetitors: Array<{ name: string; count: number }>;
  storeExecutionAlerts: number;
  pendingTasks: number;
}
