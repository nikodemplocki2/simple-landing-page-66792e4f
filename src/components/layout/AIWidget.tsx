import { useState } from 'react';
import { Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-b border-[#262626]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[14px] font-medium text-white">✨ AI Insight</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                {isMinimized ? (
                  <ChevronUp className="w-4 h-4 text-[#a1a1aa]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[#a1a1aa]" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-5">
            <div className="mb-4">
              <p className="text-[14px] text-white leading-relaxed mb-1">
                You're studying most effectively on weekdays before noon.
              </p>
              <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
                Consider scheduling your Algorithm Analysis review for tomorrow morning at 9 AM for optimal retention.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                className="h-9 text-[13px] bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg shadow-indigo-500/20"
              >
                Schedule Study Block
              </Button>
              <button className="text-[12px] text-[#71717a] hover:text-white transition-colors">
                Why this?
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-[#262626]">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
