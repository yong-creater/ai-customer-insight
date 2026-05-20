import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/ai-customer-insight/dashboard', label: '洞察首页' },
  { href: '/ai-customer-insight/customers', label: '客户画像' },
  { href: '/ai-customer-insight/audio-records', label: '录音分析' },
  { href: '/ai-customer-insight/concerns', label: '客户问题' },
  { href: '/ai-customer-insight/competitors', label: '竞品洞察' },
  { href: '/ai-customer-insight/stores', label: '门店诊断' },
  { href: '/ai-customer-insight/sales', label: '销售能力' },
  { href: '/ai-customer-insight/tasks', label: '改善任务' },
  { href: '/ai-customer-insight/speech-templates', label: '话术库' },
];

export function AIInsightLayout({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <div className="ai-layout">
      <aside className="ai-sidebar">
        <h2>AI客户洞察</h2>
        <nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="ai-nav-item">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="ai-main">
        <header className="ai-header">
          <div className="ai-filters">
            <span>时间</span><span>区域</span><span>门店</span><span>车型</span>
          </div>
        </header>
        <section className="ai-card">
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </section>
      </main>
    </div>
  );
}
