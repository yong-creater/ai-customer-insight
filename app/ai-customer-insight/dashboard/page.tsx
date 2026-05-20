import { AIInsightLayout } from '@/components/ai-customer-insight/AIInsightLayout';
import {
  getAudioRecords,
  getCompetitorInsights,
  getConcernInsights,
  getCustomers,
  getDashboardInsights,
  getImprovementTasks,
  getStoreDiagnosis,
} from '@/src/features/ai-customer-insight/mock/service';

function riskReason(concern?: string): string {
  if (!concern) return '沟通信息不足，建议补全需求确认。';
  return `客户当前对“${concern}”敏感，报价阶段存在流失风险。`;
}

export default async function DashboardPage() {
  const [dashboard] = await getDashboardInsights();
  const concerns = (await getConcernInsights()).slice(0, 5);
  const competitors = (await getCompetitorInsights()).slice(0, 5);
  const highRiskCustomers = (await getCustomers({ riskLevel: 'high' })).slice(0, 5);
  const storeAlerts = (await getStoreDiagnosis()).filter((item) => item.executionScore < 76).slice(0, 5);
  const tasks = await getImprovementTasks();
  const audios = await getAudioRecords();

  const doneCount = tasks.filter((task) => task.status === 'done' || task.status === 'verified').length;
  const doneRate = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <AIInsightLayout title="洞察首页" description="总部 / 区域 / 门店经营驾驶舱（Mock 数据）">
      <div className="ai-kpi-grid">
        {[
          ['有效录音数', String(audios.length)],
          ['有效沟通客户数', String(dashboard.totalCustomers)],
          ['高意向客户数', String(dashboard.highIntentCustomers)],
          ['高风险客户数', String(dashboard.highRiskCustomers)],
          ['客户顾虑数', String(concerns.length)],
          ['竞品提及次数', String(competitors.reduce((sum, item) => sum + item.mentionCount, 0))],
          ['报价后流失客户', String(highRiskCustomers.length)],
          ['改善任务完成率', `${doneRate}%`],
        ].map(([label, value]) => (
          <div key={label} className="ai-kpi-card">
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <section className="ai-section-card">
        <h3>AI 今日洞察摘要</h3>
        <p>
          本周期 L07 / S07 / S09 的成交阻力主要集中在“优惠不够、担心后续降价、置换补贴低”；竞品以
          {competitors[0]?.competitorModel ?? '问界M7'} 冲击最明显。建议总部同步价格权益口径，区域加强报价后
          24 小时复访，门店优先跟进高风险客户并补强竞品攻防话术。
        </p>
      </section>

      <div className="ai-two-col">
        <section className="ai-section-card">
          <h3>客户顾虑 Top 5</h3>
          <ul>
            {concerns.map((item) => (
              <li key={item.id}>
                <strong>{item.concernLabel}</strong>（{item.count}次）｜影响车型：{item.relatedModels.join(' / ')}｜影响环节：
                {item.concernType}｜战败关联度：{Math.round(item.ratio * 100)}%｜建议：报价后补充价值对比清单。
              </li>
            ))}
          </ul>
        </section>

        <section className="ai-section-card">
          <h3>竞品冲击 Top 5</h3>
          <ul>
            {competitors.map((item) => (
              <li key={item.id}>
                <strong>{item.competitorModel}</strong>（{item.mentionCount}次）｜主要对比点：
                {item.keyComparisonPoints.join('、')}｜影响车型：L07 / S07｜建议：围绕金融与置换政策强化对比解释。
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="ai-section-card">
        <h3>高风险客户列表</h3>
        <ul>
          {highRiskCustomers.map((item) => (
            <li key={item.id}>
              {item.name}｜意向车型：{item.intendedModel}｜风险原因：{riskReason(item.mainConcerns[0])}｜最近沟通：
              {item.lastContactAt.slice(0, 16).replace('T', ' ')}｜建议：48 小时内二次触达并锁定试驾时间。
            </li>
          ))}
        </ul>
      </section>

      <section className="ai-section-card">
        <h3>异常门店提醒</h3>
        <ul>
          {storeAlerts.map((item) => (
            <li key={item.id}>
              {item.storeName}｜异常指标：AI质检均分 {item.executionScore}｜可能原因：{item.weaknesses[0]}｜建议：
              {item.suggestedActions[0]}。
            </li>
          ))}
        </ul>
      </section>

      <section className="ai-section-card">
        <h3>改善任务进度</h3>
        <p>
          待处理：{tasks.filter((t) => t.status === 'pending').length} ｜处理中：
          {tasks.filter((t) => t.status === 'in_progress').length} ｜已完成：
          {tasks.filter((t) => t.status === 'done').length} ｜已验证：
          {tasks.filter((t) => t.status === 'verified').length}
        </p>
      </section>
    </AIInsightLayout>
  );
}
