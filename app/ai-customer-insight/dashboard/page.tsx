import { AIInsightLayout } from '@/components/ai-customer-insight/AIInsightLayout';
import { getDashboardInsights, getConcernInsights, getCompetitorInsights, getCustomers, getStoreDiagnosis, getImprovementTasks, getAudioRecords } from '@/src/features/ai-customer-insight/mock/service';

export default async function Page() {
  const [db] = await getDashboardInsights(); const concerns = (await getConcernInsights()).slice(0,5); const comps=(await getCompetitorInsights()).slice(0,5); const risks=(await getCustomers({riskLevel:'high'})).slice(0,5); const stores=(await getStoreDiagnosis()).slice(0,5); const tasks=await getImprovementTasks(); const audios=await getAudioRecords();
  const doneRate=Math.round((tasks.filter(t=>t.status==='done'||t.status==='verified').length/tasks.length)*100);
  return <AIInsightLayout title="洞察首页" description="总部/区域/门店经营驾驶舱"> <div className='grid'>{[['有效录音数',audios.length],['有效沟通客户数',db.totalCustomers],['高意向客户数',db.highIntentCustomers],['高风险客户数',db.highRiskCustomers],['客户顾虑数',concerns.length],['竞品提及次数',comps.reduce((s,c)=>s+c.mentionCount,0)],['报价后流失客户',risks.length],['改善任务完成率',`${doneRate}%`]].map(([k,v])=><div key={String(k)}><b>{k}</b><div>{v}</div></div>)}</div><h3>AI 今日洞察摘要</h3><p>本周期{['L07','S07','S09'].join('、')}客户对价格与置换政策敏感，{comps[0]?.competitorModel}提及最高，部分门店在报价后跟进偏慢。建议优先处理高风险客户、强化竞品攻防话术，并对异常门店执行24小时回访机制。</p></AIInsightLayout>;
}
