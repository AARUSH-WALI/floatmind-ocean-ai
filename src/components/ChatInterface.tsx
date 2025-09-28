import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Download, MapPin, TrendingUp, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  data?: any;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI ocean intelligence assistant. Ask me about oceanographic data, climate patterns, or marine ecosystems. For example, try "Show me temperature trends in the North Atlantic" or "What\'s the current status of ARGO floats near Japan?"',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I've analyzed your query about "${input}". Based on the latest oceanographic data, here are the key insights:

• Temperature anomalies detected in the specified region
• Salinity levels are within normal parameters
• Current velocity shows seasonal variation patterns
• Recommended monitoring of chlorophyll concentrations

Would you like me to generate a detailed visualization or export this data?`,
        timestamp: new Date(),
        data: {
          confidence: 0.94,
          sources: ['ARGO Floats', 'Satellite Data', 'Glider Network'],
          metrics: {
            temperature: '15.2°C',
            salinity: '35.1 psu',
            depth: '200m'
          }
        }
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const quickActions = [
    { icon: MapPin, label: "Show Ocean Map", query: "Show me an interactive ocean map with current data" },
    { icon: TrendingUp, label: "Temperature Trends", query: "Analyze temperature trends in the Pacific Ocean" },
    { icon: AlertCircle, label: "Anomaly Detection", query: "Detect any unusual patterns in recent ocean data" },
  ];

  return (
    <section id="chat" className="py-20 bg-depth-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-wave-gradient bg-clip-text text-transparent">
                AI Ocean Chat
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Ask questions in natural language and get intelligent insights from oceanographic data
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-ocean-gradient text-primary-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted/50'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      {message.data && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Confidence: {(message.data.confidence * 100).toFixed(1)}%</span>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Download className="w-3 h-3 mr-1" />
                              Export
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {Object.entries(message.data.metrics).map(([key, value]) => (
                              <div key={key} className="text-center p-2 bg-background/20 rounded">
                                <div className="font-medium">{value as string}</div>
                                <div className="text-muted-foreground capitalize">{key}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-ocean-gradient flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-border/50">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs hover:bg-accent/10 hover:text-accent"
                    onClick={() => setInput(action.query)}
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 pt-0">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about ocean data, climate patterns, marine ecosystems..."
                  className="flex-1 bg-background/50 border-border/50 focus:border-accent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()}
                  className="bg-ocean-gradient hover:shadow-ocean transition-wave"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;