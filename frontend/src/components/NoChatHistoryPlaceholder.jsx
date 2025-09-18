// step615: so here we have this UI which says to start a conversation with the sleected user whose name we passed as a prop here is being used too to display whom to start a conversation with thus here below.

// step616: see the next steps in step617.txt file now there.

// Import chat bubble icon from lucide-react
import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 ">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse-slower"></div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center max-w-md">
        {/* Icon with enhanced styling */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircleIcon className="size-10 text-white" />
          </div>
        </div>

        {/* Heading with improved typography */}
        <h3 className="text-2xl font-semibold text-white mb-4 whitespace-nowrap">
          Start a conversation with <span className="text-cyan-400">{name}</span>
        </h3>

        {/* Instructional text with better spacing */}
        <p className="text-slate-300 text-base mb-6 leading-relaxed">
          This is the beginning of your conversation with {name}. Send a message to break the ice and start chatting!
        </p>

        {/* Decorative divider with enhanced styling */}
        <div className="relative w-48 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mb-8">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full"></div>
        </div>

        {/* Quick-start buttons with improved styling */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2">
            <span>👋</span> Say Hello
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full hover:from-indigo-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2">
            <span>🤝</span> How are you?
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/20 flex items-center gap-2">
            <span>📅</span> Meet up soon?
          </button>
        </div>

        {/* Additional tip */}
        <p className="text-slate-400 text-xs mt-6">
          Pro tip: Ask open-ended questions to keep the conversation flowing!
        </p>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;