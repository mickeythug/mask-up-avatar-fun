
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
    <div className="w-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 py-12 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-black text-3xl font-black tracking-wide mb-6">
          CONTRACT ADDRESS
        </h4>
        <div className="flex flex-col items-center space-y-4">
          <div className="font-mono text-2xl md:text-3xl font-black text-black break-all">
            {contractAddress}
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white text-xl font-black py-4 px-8 border-4 border-black rounded-2xl hover:bg-blue-600 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
          >
            {copied ? <Check size={24} /> : <Copy size={24} />}
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractAddress;
