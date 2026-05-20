import type { AIAnalysis } from '../types';
import { getAudioAnalysis } from '../mock/service';

export type AnalysisStatus = 'pending' | 'processing' | 'success' | 'failed';
export interface RawAIAnalysisResult { summary: string; customer_profile: string; customer_intent: string; intended_model: string; customer_needs: string[]; customer_concerns: string[]; competitor_mentions: string[]; policy_sensitivity: string[]; emotion_trend: Array<{ time: number; value: number }>; deal_probability: number; risk_level: 'high'|'medium'|'low'; loss_reason_prediction: string; sales_performance: string; next_actions: Array<{ owner_role: 'sales'|'store_manager'|'region_manager'|'headquarters'; action: string }>; recommended_script: string[]; evidence_quotes: Array<{ speaker: string; quote: string; timestamp: number; tag?: string }>; }
const store = new Map<string, { status: AnalysisStatus; result?: AIAnalysis }>();
export function validateAIAnalysisResult(result: unknown): result is RawAIAnalysisResult { if (!result || typeof result !== 'object') return false; const x = result as Record<string, unknown>; return typeof x.summary === 'string' && Array.isArray(x.customer_needs) && Array.isArray(x.evidence_quotes); }
export async function analyzeAudioRecord(audioRecordId: string): Promise<{ status: AnalysisStatus; result?: AIAnalysis }> { store.set(audioRecordId,{status:'processing'}); const mock=await getAudioAnalysis(audioRecordId); if(!mock){store.set(audioRecordId,{status:'failed'}); return {status:'failed'};} store.set(audioRecordId,{status:'success',result:mock}); return {status:'success',result:mock}; }
export async function saveAIAnalysisResult(audioRecordId: string, result: AIAnalysis): Promise<void> { store.set(audioRecordId,{status:'success',result}); }
