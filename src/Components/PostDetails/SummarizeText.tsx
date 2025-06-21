import React from 'react'
import Loading from '../Loading/Loading2'
import { Sparkles } from 'lucide-react'
import { useAiTextSummarizerMutation } from '@/services/apiSlice';
type SummarizeTextProps = {
  content: string;  
};
export const SummarizeText = ({ content } :SummarizeTextProps) => {
    const [summarize, { data, isLoading, isError }] =useAiTextSummarizerMutation()
const handleSummarize = () => {
    summarize({ content });
  };
  return (
    <div>
 <h1 className='text-base font-semibold mb-2'>Summarize Blog</h1>
 <p className='text-xs'>Get an AI-generated summary of this blog post to quickly understand the key points.</p>
    
    <button className="btn btn-primary my-3 text-base w-full"
     onClick={handleSummarize}
        disabled={isLoading}
    >
      <Sparkles />
    <span>{isLoading ? 'Summarizing...' : 'Generate Summary'}</span>
    </button>
    {data?.summary && (
        <div className='border rounded-md p-2 border-blue-400 bg-blue-100'>
          <h1 className='text-base font-semibold mb-2 text-blue-600'>AI Summary</h1>
          <p className='text-sm text-blue-800'>{data.summary}</p>
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-2">Something went wrong while summarizing.</p>
      )}
     </div>
  )
}
