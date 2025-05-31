
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ContractAddress = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "6MQpbiTC2YcogidTmKqMLK82qvE9z5QEm7EP3AEDpump";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wide mb-4 sm:mb-5 md:mb-6">
          CONTRACT ADDRESS
        </h4>
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="font-mono text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-black text-black break-all px-2 leading-relaxed">
            {contractAddress}
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white text-sm sm:text-base md:text-lg lg:text-xl font-black py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 border-2 sm:border-3 md:border-4 border-black rounded-xl sm:rounded-2xl hover:bg-blue-600 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm mx-auto"
          >
            {copied ? <Check size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Copy size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />}
            <span>{copied ? 'COPIED!' : 'COPY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractAddress;
