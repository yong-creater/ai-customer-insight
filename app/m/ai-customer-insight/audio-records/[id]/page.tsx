import { getAudioAnalysis } from '@/src/features/ai-customer-insight/mock/service';
export default async function Page({params}:{params:{id:string}}){const a=await getAudioAnalysis(params.id); if(!a) return <main>无数据</main>; return <main style={{padding:12}}><h1>录音摘要</h1><p>{a.summary}</p><p>顾虑：{a.customerConcerns.join('、')}</p><p>推荐话术：{a.recommendedScript[0]}</p></main>}
