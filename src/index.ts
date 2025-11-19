#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Define the available tools
const TOOLS: Tool[] = [
  {
    name: "ask_proofessor",
    description: "Ask Proofessor (an AI expert in code explanation and technical concepts) a question about code, architecture, debugging, or technical concepts. Proofessor will provide clear, comprehensive explanations.",
    inputSchema: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "The question to ask Proofessor. Can be about code understanding, technical concepts, debugging strategies, architecture decisions, or any programming-related topic.",
        },
        context: {
          type: "string",
          description: "Optional additional context like code snippets, error messages, or project details that will help Proofessor provide a better answer.",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "explain_code",
    description: "Request Proofessor to explain how specific code works, including its purpose, logic flow, patterns used, and design decisions.",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The code snippet to explain.",
        },
        language: {
          type: "string",
          description: "Programming language of the code (e.g., 'javascript', 'python', 'typescript').",
        },
        focus: {
          type: "string",
          description: "Optional: Specific aspect to focus on (e.g., 'performance', 'security', 'design patterns', 'best practices').",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "analyze_architecture",
    description: "Ask Proofessor to analyze system architecture, design patterns, or project structure and provide insights and recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        description: {
          type: "string",
          description: "Description of the architecture, system design, or project structure to analyze.",
        },
        concerns: {
          type: "string",
          description: "Optional: Specific concerns or questions about the architecture (e.g., 'scalability', 'maintainability', 'security').",
        },
      },
      required: ["description"],
    },
  },
  {
    name: "debug_help",
    description: "Get Proofessor's help with debugging issues, understanding error messages, or troubleshooting problems.",
    inputSchema: {
      type: "object",
      properties: {
        error_message: {
          type: "string",
          description: "The error message or description of the problem.",
        },
        code_context: {
          type: "string",
          description: "Optional: Relevant code that's causing or related to the error.",
        },
        attempted_solutions: {
          type: "string",
          description: "Optional: Solutions you've already tried.",
        },
      },
      required: ["error_message"],
    },
  },
  {
    name: "best_practices",
    description: "Ask Proofessor about best practices for a specific technology, pattern, or development approach.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "The technology, pattern, or approach to get best practices for (e.g., 'React hooks', 'API design', 'error handling in Node.js').",
        },
        context: {
          type: "string",
          description: "Optional: Specific context or use case for the best practices.",
        },
      },
      required: ["topic"],
    },
  },
];

// Create server instance
const server = new Server(
  {
    name: "mcp-roo",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "ask_proofessor": {
        const { question, context } = args as { question: string; context?: string };
        
        let response = `Question for Proofessor: ${question}`;
        if (context) {
          response += `\n\nContext: ${context}`;
        }
        
        response += `\n\n---\n\nProofessor's Response:\n\nThis is a simulated response. In a real implementation, this would connect to Proofessor's AI system to provide comprehensive explanations about code, technical concepts, and development practices.\n\nFor your question: "${question}"\n\nProofessor would analyze the question and any provided context to give you a clear, detailed explanation that helps you understand the topic thoroughly.`;

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      case "explain_code": {
        const { code, language, focus } = args as { code: string; language?: string; focus?: string };
        
        let response = `Code Explanation Request:\n\n`;
        if (language) {
          response += `Language: ${language}\n`;
        }
        if (focus) {
          response += `Focus: ${focus}\n`;
        }
        response += `\nCode:\n\`\`\`${language || ''}\n${code}\n\`\`\`\n\n---\n\nProofessor's Analysis:\n\nThis is a simulated response. Proofessor would analyze this code and explain:\n\n1. What the code does (purpose and functionality)\n2. How it works (logic flow and implementation details)\n3. Design patterns or techniques used\n4. Potential improvements or considerations`;
        if (focus) {
          response += `\n5. Specific insights about ${focus}`;
        }

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      case "analyze_architecture": {
        const { description, concerns } = args as { description: string; concerns?: string };
        
        let response = `Architecture Analysis Request:\n\n${description}`;
        if (concerns) {
          response += `\n\nSpecific Concerns: ${concerns}`;
        }
        
        response += `\n\n---\n\nProofessor's Architectural Analysis:\n\nThis is a simulated response. Proofessor would provide:\n\n1. Overview of the architectural approach\n2. Strengths and potential weaknesses\n3. Scalability considerations\n4. Maintainability assessment\n5. Security implications\n6. Recommendations for improvements`;
        if (concerns) {
          response += `\n7. Specific guidance on: ${concerns}`;
        }

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      case "debug_help": {
        const { error_message, code_context, attempted_solutions } = args as {
          error_message: string;
          code_context?: string;
          attempted_solutions?: string;
        };
        
        let response = `Debugging Assistance Request:\n\nError: ${error_message}`;
        if (code_context) {
          response += `\n\nCode Context:\n\`\`\`\n${code_context}\n\`\`\``;
        }
        if (attempted_solutions) {
          response += `\n\nAttempted Solutions: ${attempted_solutions}`;
        }
        
        response += `\n\n---\n\nProofessor's Debugging Guidance:\n\nThis is a simulated response. Proofessor would help you by:\n\n1. Analyzing the error message and its likely causes\n2. Examining the code context for potential issues\n3. Explaining why the error occurs\n4. Providing step-by-step debugging strategies\n5. Suggesting specific fixes\n6. Recommending preventive measures`;

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      case "best_practices": {
        const { topic, context } = args as { topic: string; context?: string };
        
        let response = `Best Practices Request:\n\nTopic: ${topic}`;
        if (context) {
          response += `\nContext: ${context}`;
        }
        
        response += `\n\n---\n\nProofessor's Best Practices Guide:\n\nThis is a simulated response. Proofessor would provide:\n\n1. Industry-standard best practices for ${topic}\n2. Common pitfalls to avoid\n3. Recommended patterns and approaches\n4. Code examples demonstrating best practices\n5. Trade-offs and considerations\n6. Resources for further learning`;

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Roo server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});