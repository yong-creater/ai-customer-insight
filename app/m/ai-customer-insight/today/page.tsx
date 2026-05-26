import { getCustomers } from '@/src/features/ai-customer-insight/mock/service';
export default async function Page(){const risks=(await getCustomers({riskLevel:'high'})).slice(0,5); return <main style={{padding:12}}><h1>今日待办</h1>{risks.map(c=><div key={c.id} style={{background:'#fff',padding:10,marginBottom:8,borderRadius:8}}>{c.name}｜{c.intendedModel}｜建议：优先处理{c.mainConcerns[0]}</div>)}</main>}
