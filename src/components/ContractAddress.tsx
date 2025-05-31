
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
    <div className="flex flex-col items-center space-y-4">
      <h4 className="text-black text-2xl font-black tracking-wide">
        CONTRACT ADDRESS
      </h4>
      <div className="flex items-center space-x-4 bg-white border-4 border-black rounded-2xl p-4 shadow-xl">
        <div className="font-mono text-sm text-black break-all max-w-xs">
          {contractAddress}
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white p-3 border-3 border-black rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
      {copied && (
        <div className="text-black font-bold text-lg animate-fade-in">
          COPIED!
        </div>
      )}
    </div>
  );
};

export default ContractAddress;
