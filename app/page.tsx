import Link from 'next/link';

const pcPages = [
  { href: '/ai-customer-insight', label: 'AI客户洞察入口' },
  { href: '/ai-customer-insight/dashboard', label: '经营总览 Dashboard' },
  { href: '/ai-customer-insight/customers', label: '客户画像列表' },
  { href: '/ai-customer-insight/audio-records', label: '录音分析列表' },
  { href: '/ai-customer-insight/concerns', label: '客户问题洞察' },
  { href: '/ai-customer-insight/competitors', label: '竞品洞察' },
  { href: '/ai-customer-insight/stores', label: '门店诊断' },
  { href: '/ai-customer-insight/sales', label: '销售能力洞察' },
  { href: '/ai-customer-insight/tasks', label: '改善任务中心' },
  { href: '/ai-customer-insight/speech-templates', label: '话术知识库' },
];

const mobilePages = [
  { href: '/m/ai-customer-insight/today', label: '移动端今日待办' },
  { href: '/m/ai-customer-insight/customers/c-001', label: '移动端客户详情示例' },
  { href: '/m/ai-customer-insight/audio-records/a-001', label: '移动端录音摘要示例' },
];

export default function HomePage() {
  return (
    <main style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>AI客户洞察导航首页</h1>
      <p style={{ marginBottom: 20, color: '#475569' }}>
        已将 PC 与移动端页面统一汇总。进入首页后可直接访问各业务页面。
      </p>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>PC 端页面</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
          {pcPages.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>移动端页面</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
          {mobilePages.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
